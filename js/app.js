/**
 * Crepes & Waffles · Catálogo Digital Mobile
 * Enfoque: Visualización clara de platos (Título, Fotografía, Descripción y Precio)
 * Selección de platos "Para ordenar al mesero" cuando se acerque a la mesa
 */

import { MENU_DATA, SALAD_BAR_CONFIG, DIETARY_TAGS, ALLERGEN_NOTICE } from '../data/menu-data.js';

// Estado global de la aplicación
const AppState = {
  activeCategory: MENU_DATA[0].id,
  activeFilter: 'todos',
  searchQuery: '',
  tableNumber: '',
  comandaView: 'list', // 'list' | 'dictate' (/distill)
  currentEditingNoteIndex: null,
  selectedItems: [], // Platos marcados para dictar al mesero
  selectedSalad: {
    ingredients: new Set(),
    dressings: new Set(),
    complements: new Set()
  }
};

// Formateador de moneda colombiana (COP)
const formatCOP = (val) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(val).replace('COP', '').trim();
};

// Retroalimentación háptica táctil para dispositivos móviles (/polish)
const triggerHaptic = (pattern = 12) => {
  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    try {
      navigator.vibrate(pattern);
    } catch (e) {}
  }
};

// Utilidad para mostrar notificaciones tipo Toast accesibles
const showToast = (message) => {
  const toast = document.getElementById('app-toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
};

// Sanitización y prevención de inyección XSS (/harden)
const escapeHTML = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Cargar platos seleccionados y número de mesa con validación estricta y tolerancia a corrupción (/harden)
const loadSelectedFromStorage = () => {
  try {
    const saved = localStorage.getItem('cw_selected_dishes');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        AppState.selectedItems = parsed
          .filter(item => item && typeof item === 'object' && item.id && typeof item.price === 'number')
          .map(item => ({
            id: String(item.id),
            name: escapeHTML(String(item.name || '')),
            price: Math.max(0, Number(item.price) || 0),
            description: escapeHTML(String(item.description || '')),
            image: typeof item.image === 'string' && item.image.startsWith('http') ? item.image : (item.image || null),
            qty: Math.min(99, Math.max(1, parseInt(item.qty, 10) || 1)),
            customNotes: escapeHTML(String(item.customNotes || '')).slice(0, 100)
          }));
      }
    }
  } catch (e) {
    console.warn('Almacenamiento corrupto o inaccesible; iniciando en memoria.', e);
    AppState.selectedItems = [];
  }

  try {
    const savedTable = localStorage.getItem('cw_table_number');
    if (savedTable) {
      AppState.tableNumber = escapeHTML(String(savedTable).trim()).slice(0, 25);
      const tableInput = document.getElementById('input-table-number');
      if (tableInput) tableInput.value = AppState.tableNumber;
    }
  } catch (e) {
    AppState.tableNumber = '';
  }
};

// Guardar platos seleccionados y número de mesa con manejo de cuota/Safari incógnito (/harden)
const saveSelectedToStorage = () => {
  try {
    localStorage.setItem('cw_selected_dishes', JSON.stringify(AppState.selectedItems));
    if (AppState.tableNumber) {
      localStorage.setItem('cw_table_number', AppState.tableNumber);
    } else {
      localStorage.removeItem('cw_table_number');
    }
  } catch (e) {
    console.warn('LocalStorage bloqueado o lleno; manteniendo selección en memoria.', e);
  }
};

// Encontrar item por ID en la base de datos
const findItemById = (itemId) => {
  for (const cat of MENU_DATA) {
    for (const sec of cat.sections) {
      if (sec.items) {
        const item = sec.items.find(i => i.id === itemId);
        if (item) return { item, category: cat, section: sec };
      }
    }
  }
  return null;
};

// ==========================================================================
// RENDERIZADO DEL CATÁLOGO Y CATEGORÍAS
// ==========================================================================
// ICONOGRAFÍA GASTRONÓMICA POR CATEGORÍA (/BOLDER)
// ==========================================================================
const CATEGORY_ICONS = {
  'desayunos': '🥞',
  'entradas-sopas': '🍲',
  'crepes-sal': '🌯',
  'pitas-panne-cook': '🥖',
  'ensaladas': '🥗',
  'bebidas': '🍹',
  'dulces-waffles-helados': '🍨',
  'crepes-en-casa': '🏠'
};

// Saludo dinámico según horario (/bolder)
const initHeroGreeting = () => {
  const greetingEl = document.getElementById('hero-time-greeting');
  if (!greetingEl) return;

  const now = new Date();
  const hour = now.getHours();

  let icon = '✨';
  let text = 'Bienvenidos a Crepes & Waffles';

  if (hour >= 6 && hour < 12) {
    icon = '☀️';
    text = 'Buenos Días · Desayunos & Brunch';
  } else if (hour >= 12 && hour < 17) {
    icon = '🍽️';
    text = 'Hora de Almuerzo · Recetas de Autor';
  } else {
    icon = '🌙';
    text = 'Buenas Tardes · Dulces, Crepes & Cena';
  }

  greetingEl.innerHTML = `
    <span class="greeting-icon" aria-hidden="true">${icon}</span>
    <span class="greeting-text">${text}</span>
  `;
};

const renderCategoryTabs = () => {
  const navList = document.getElementById('category-nav-list');
  if (!navList) return;

  navList.innerHTML = MENU_DATA.map((cat, index) => {
    const icon = CATEGORY_ICONS[cat.id] || '✨';
    return `
      <li class="category-nav-item" role="presentation">
        <button 
          type="button" 
          role="tab" 
          id="tab-${cat.id}"
          aria-selected="${index === 0 ? 'true' : 'false'}"
          aria-controls="cat-${cat.id}"
          class="category-tab-btn ${index === 0 ? 'active' : ''}"
          data-cat-id="${cat.id}"
        >
          <span class="cat-tab-icon" aria-hidden="true">${icon}</span>
          <span>${cat.title}</span>
        </button>
      </li>
    `;
  }).join('');

  // Eventos de click en tabs
  navList.querySelectorAll('.category-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const catId = btn.dataset.catId;
      triggerHaptic(8);
      scrollToCategory(catId);
    });
  });
};

const scrollToCategory = (catId) => {
  const target = document.getElementById(`cat-${catId}`);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
    updateActiveTab(catId);
  }
};

const updateActiveTab = (catId) => {
  AppState.activeCategory = catId;
  const tabs = document.querySelectorAll('.category-tab-btn');
  tabs.forEach(tab => {
    const isActive = tab.dataset.catId === catId;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    if (isActive) {
      tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  });
};

const renderDietaryBadges = (tags = []) => {
  if (!tags || tags.length === 0) return '';
  return tags.map(tag => {
    const config = DIETARY_TAGS[tag];
    if (!config) return '';
    return `<span class="diet-tag ${tag}">${config.icon} ${config.label}</span>`;
  }).join('');
};

const renderMenuSections = () => {
  const container = document.getElementById('menu-sections-container');
  if (!container) return;

  container.innerHTML = MENU_DATA.map((cat) => {
    return `
    <section 
      id="cat-${cat.id}" 
      class="category-block" 
      role="tabpanel" 
      aria-labelledby="tab-${cat.id}"
      data-category="${cat.id}"
    >
      <div class="category-hero">
        <img 
          src="${cat.bannerImage}" 
          alt="${cat.title}" 
          class="category-hero-img" 
          loading="lazy" 
          decoding="async"
        />
        <div class="category-hero-overlay">
          <h2 class="category-hero-title">${cat.title}</h2>
          ${cat.subtitle ? `<p class="category-hero-subtitle">${cat.subtitle}</p>` : ''}
        </div>
      </div>

      ${cat.description ? `
        <div class="category-intro-desc">
          <p>${cat.description}</p>
        </div>
      ` : ''}

      ${cat.sections.map(sec => `
        <div class="section-block" id="sec-${sec.id}">
          <header class="section-header">
            <h3 class="section-title">${sec.name}</h3>
            ${sec.notice ? `<p class="section-notice">${sec.notice}</p>` : ''}
          </header>

          ${sec.isFlavorCatalog ? renderFlavorCatalog(sec) : `
            <div class="items-grid">
              ${sec.items.map(item => renderItemCard(item, cat.id)).join('')}
            </div>
          `}
        </div>
      `).join('')}

      ${cat.callToAction ? `
        <div class="category-cta-card">
          <h4 class="cta-title">${cat.callToAction.title}</h4>
          <p class="cta-text">${cat.callToAction.text}</p>
          <div class="cta-actions">
            <a href="tel:${cat.callToAction.phone.replace(/\s+/g, '')}" class="cta-btn cta-btn-phone">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              Llamar: ${cat.callToAction.phone}
            </a>
            <a href="${cat.callToAction.onlineStoreUrl}" target="_blank" rel="noopener noreferrer" class="cta-btn cta-btn-web">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              ${cat.callToAction.onlineStoreText}
            </a>
          </div>
        </div>
      ` : ''}
    </section>
  `;
  }).join('');

  attachItemEvents();
};

/**
 * Renderizado de cada tarjeta del catálogo (/distill):
 * Muestra Título, Fotografía, Descripción y Precio.
 * Clic en la foto o título abre detalles. Botón único directo: '＋ Pedir' / '✓ En lista'.
 */
const renderItemCard = (item, catId) => {
  const isCustomSalad = item.isCustomSalad;
  const isSelected = AppState.selectedItems.some(i => i.id === item.id);
  const isSig = item.isSignature || item.featured;

  return `
    <article 
      class="menu-card ${isSelected ? 'is-selected' : ''} ${isSig ? 'is-signature' : ''}" 
      id="card-${item.id}"
      data-tags="${(item.tags || []).join(' ')}"
      data-id="${item.id}"
      data-name="${item.name.toLowerCase()}"
      data-desc="${(item.description || '').toLowerCase()}"
    >
      ${item.image ? `
        <div class="menu-card-media-wrapper" role="button" tabindex="0" aria-label="Ver detalles de ${item.name}">
          ${isSig ? `<span class="badge-signature-dish">Especialidad de la Casa</span>` : ''}
          <img 
            src="${item.image}" 
            alt="${item.name}" 
            class="menu-card-media" 
            loading="lazy" 
            decoding="async"
            onerror="this.parentElement.style.display='none'"
          />
        </div>
      ` : ''}

      <div class="menu-card-body">
        ${(!item.image && isSig) ? `<span class="badge-signature-inline">Especialidad</span>` : ''}
        <div class="menu-card-header menu-card-clickable" role="button" tabindex="0" aria-label="Ver detalles de ${item.name}">
          <h4 class="item-name">${item.name}</h4>
          <span class="item-price">${formatCOP(item.price)}</span>
        </div>

        <p class="item-desc menu-card-clickable" role="button" tabindex="0">${item.description || ''}</p>

        ${item.options ? `
          <div class="item-options-list">
            <span class="item-options-title">Opciones disponibles:</span>
            ${item.options.map(opt => `
              <div class="item-option-row">
                <span>${opt.name}</span>
                <span class="item-option-price">${formatCOP(opt.price)}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${item.tags && item.tags.length > 0 ? `
          <div class="item-tags" aria-label="Información dietética">
            ${renderDietaryBadges(item.tags)}
          </div>
        ` : ''}

        <div class="menu-card-actions">
          ${isCustomSalad ? `
            <button 
              type="button" 
              class="btn-select-toggle btn-open-salad" 
              aria-haspopup="dialog"
              data-id="${item.id}"
            >
              🥗 Armar Ensalada
            </button>
          ` : `
            <button 
              type="button" 
              class="btn-select-toggle ${isSelected ? 'selected' : ''}" 
              data-id="${item.id}"
              aria-pressed="${isSelected ? 'true' : 'false'}"
              aria-label="${isSelected ? 'Quitar ' + item.name + ' de la lista' : 'Agregar ' + item.name + ' para pedir al mesero'}"
            >
              <span class="toggle-icon">${isSelected ? '✓' : '＋'}</span>
              <span class="toggle-label">${isSelected ? 'En lista' : 'Pedir'}</span>
            </button>
          `}
        </div>
      </div>
    </article>
  `;
};

const renderFlavorCatalog = (sec) => {
  return `
    <div class="flavor-catalog-box">
      <p class="flavor-catalog-desc">${sec.description}</p>
      <div class="flavor-pills-grid">
        ${sec.flavors.map(fl => `
          <div class="flavor-pill">
            <span class="flavor-name">${fl.name}</span>
            ${fl.tags && fl.tags.length ? `
              <span class="flavor-tag-small">${fl.tags.map(t => DIETARY_TAGS[t] ? DIETARY_TAGS[t].label : t).join(', ')}</span>
            ` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `;
};

// ==========================================================================
// SCROLL SPY CON INTERSECTION OBSERVER
// ==========================================================================
const initScrollSpy = () => {
  const sections = document.querySelectorAll('.category-block');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const catId = entry.target.dataset.category;
        updateActiveTab(catId);
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
};

// ==========================================================================
// FILTROS DIETÉTICOS
// ==========================================================================
const initDietaryFilters = () => {
  const filterBtns = document.querySelectorAll('.filter-chip');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      const filter = btn.dataset.filter;
      AppState.activeFilter = filter;
      applyFilters();
    });
  });
};

const applyFilters = () => {
  const filter = AppState.activeFilter;
  const cards = document.querySelectorAll('.menu-card');

  cards.forEach(card => {
    const tags = (card.dataset.tags || '').split(' ');
    let visible = true;

    if (filter !== 'todos') {
      visible = tags.includes(filter);
    }

    card.style.display = visible ? 'flex' : 'none';
  });

  // Ocultar subsecciones vacías
  document.querySelectorAll('.section-block').forEach(sec => {
    const visibleCards = sec.querySelectorAll('.menu-card[style*="display: flex"]');
    const isCatalog = sec.querySelector('.flavor-catalog-box');
    if (!isCatalog) {
      sec.style.display = visibleCards.length > 0 ? 'block' : 'none';
    }
  });

  showToast(`Filtro aplicado: ${filter === 'todos' ? 'Todos los platos' : filter}`);
};

// ==========================================================================
// SELECCIÓN DE PLATOS PARA EL MESERO (CATÁLOGO & COMANDA)
// ==========================================================================
const toggleSelectItem = (item) => {
  const index = AppState.selectedItems.findIndex(i => i.id === item.id);
  if (index >= 0) {
    // Desmarcar plato
    AppState.selectedItems.splice(index, 1);
    triggerHaptic(10);
    showToast(`"${item.name}" desmarcado.`);
  } else {
    // Marcar plato
    AppState.selectedItems.push({
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description || '',
      image: item.image || null,
      qty: 1,
      customNotes: item.customNotes || ''
    });
    triggerHaptic(15);
    showToast(`"${item.name}" listo para dictar al mesero 📋`);
  }

  saveSelectedToStorage();
  syncItemCardsSelection(item.id);
  updateSelectedUI();
};

const updateItemQty = (index, delta) => {
  if (!AppState.selectedItems[index]) return;
  const item = AppState.selectedItems[index];
  const newQty = (item.qty || 1) + delta;
  if (newQty <= 0) {
    const row = document.querySelector(`.cart-item-row[data-index="${index}"]`);
    if (row) {
      row.classList.add('item-removing');
      triggerHaptic(10);
      setTimeout(() => {
        removeSelectedItem(index);
      }, 220);
      return;
    }
    removeSelectedItem(index);
    return;
  }
  if (newQty > 99) {
    showToast('Máximo 99 unidades por plato.');
    return;
  }
  item.qty = newQty;
  triggerHaptic(10);
  saveSelectedToStorage();
  updateSelectedUI();
  showToast(`${item.name}: ${newQty} ${newQty === 1 ? 'unidad' : 'unidades'}`);
};

const openItemNoteDialog = (index) => {
  if (!AppState.selectedItems[index]) return;
  AppState.currentEditingNoteIndex = index;
  const item = AppState.selectedItems[index];

  const dishNameEl = document.getElementById('note-dialog-dish-name');
  const inputEl = document.getElementById('custom-note-input');
  if (dishNameEl) dishNameEl.textContent = `${(item.qty || 1) > 1 ? item.qty + 'x ' : ''}${item.name}`;
  if (inputEl) {
    inputEl.value = item.customNotes || '';
  }

  // Marcar chip si coincide exactamente
  document.querySelectorAll('.btn-quick-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.note === (item.customNotes || ''));
  });

  openDialog('item-note-dialog');
  setTimeout(() => {
    if (inputEl) inputEl.focus();
  }, 100);
};

const saveItemNoteFromDialog = () => {
  const index = AppState.currentEditingNoteIndex;
  if (index === null || !AppState.selectedItems[index]) return;
  const inputEl = document.getElementById('custom-note-input');
  const note = inputEl ? escapeHTML(inputEl.value.trim()).slice(0, 100) : '';

  AppState.selectedItems[index].customNotes = note;
  triggerHaptic(15);
  saveSelectedToStorage();
  updateSelectedUI();
  closeDialog('item-note-dialog');
  showToast(note ? 'Indicación guardada para el mesero ✍️' : 'Indicación eliminada.');
};

const clearItemNote = (index) => {
  if (!AppState.selectedItems[index]) return;
  AppState.selectedItems[index].customNotes = '';
  triggerHaptic(10);
  saveSelectedToStorage();
  updateSelectedUI();
  showToast('Indicación eliminada.');
};

const removeSelectedItem = (index) => {
  if (!AppState.selectedItems[index]) return;
  const removed = AppState.selectedItems[index];
  AppState.selectedItems.splice(index, 1);
  triggerHaptic(10);
  saveSelectedToStorage();
  syncItemCardsSelection(removed.id);
  updateSelectedUI();
  showToast(`"${removed.name}" eliminado de la lista.`);
};

const syncItemCardsSelection = (itemId) => {
  const isSelected = AppState.selectedItems.some(i => i.id === itemId);
  const cards = document.querySelectorAll(`.menu-card[data-id="${itemId}"]`);
  cards.forEach(card => {
    card.classList.toggle('is-selected', isSelected);
    if (isSelected) {
      card.classList.remove('card-select-pop');
      void card.offsetWidth;
      card.classList.add('card-select-pop');
    }
    const toggleBtn = card.querySelector('.btn-select-toggle');
    if (toggleBtn && !toggleBtn.classList.contains('btn-open-salad')) {
      toggleBtn.classList.toggle('selected', isSelected);
      toggleBtn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
      toggleBtn.classList.remove('btn-morph-pop');
      void toggleBtn.offsetWidth;
      toggleBtn.classList.add('btn-morph-pop');
      const icon = toggleBtn.querySelector('.toggle-icon');
      const label = toggleBtn.querySelector('.toggle-label');
      if (icon) icon.textContent = isSelected ? '✓' : '＋';
      if (label) label.textContent = isSelected ? 'En lista' : 'Pedir';
    }
  });
};

const clearAllSelected = () => {
  if (AppState.selectedItems.length === 0) return;
  if (confirm('¿Deseas desmarcar todos los platos de tu lista para el mesero?')) {
    const oldIds = AppState.selectedItems.map(i => i.id);
    AppState.selectedItems = [];
    triggerHaptic([20, 50, 20]);
    saveSelectedToStorage();
    oldIds.forEach(id => syncItemCardsSelection(id));
    updateSelectedUI();
    showToast('Lista de platos desmarcada.');
  }
};

// ==========================================================================
// CELEBRACIÓN DE PEDIDO CON CONFETI (/DELIGHT)
// ==========================================================================
const triggerConfetti = () => {
  const container = document.getElementById('confetti-container');
  if (!container) return;
  const colors = ['#C08A3E', '#A1371D', '#E6CA85', '#2E6B34', '#FAF6F0', '#D49B45'];
  const count = 32;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'confetti-particle';
    const color = colors[Math.floor(Math.random() * colors.length)];
    const startX = window.innerWidth / 2 + (Math.random() - 0.5) * 140;
    const startY = window.innerHeight * 0.55 + (Math.random() - 0.5) * 60;
    const angle = Math.random() * Math.PI * 2;
    const distance = 90 + Math.random() * 200;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance - 50;
    const rot = (Math.random() - 0.5) * 720;
    const size = 6 + Math.random() * 6;

    particle.style.backgroundColor = color;
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size * 0.85}px`;
    particle.style.setProperty('--dx', `${dx}px`);
    particle.style.setProperty('--dy', `${dy}px`);
    particle.style.setProperty('--rot', `${rot}deg`);

    container.appendChild(particle);
    setTimeout(() => {
      particle.remove();
    }, 1250);
  }
};

const markOrderAsCompleted = () => {
  if (AppState.selectedItems.length === 0) return;
  if (confirm('¿Confirmas que el mesero ya tomó tu orden? Se limpiará tu selección actual.')) {
    const oldIds = AppState.selectedItems.map(i => i.id);
    AppState.selectedItems = [];
    triggerHaptic([25, 40, 25]);
    triggerConfetti();
    saveSelectedToStorage();
    oldIds.forEach(id => syncItemCardsSelection(id));
    updateSelectedUI();
    closeDialog('cart-modal');
    showToast('¡Excelente! Tu pedido está en preparación en cocina 🥞✨');
  }
};

const switchComandaView = (viewName) => {
  AppState.comandaView = viewName;
  const tabList = document.getElementById('tab-view-list');
  const tabDictate = document.getElementById('tab-view-dictate');
  const panelList = document.getElementById('cart-view-list');
  const panelDictate = document.getElementById('cart-view-dictate');
  const btnSalon = document.getElementById('btn-toggle-salon-mode');

  triggerHaptic(8);

  const isDictate = viewName === 'dictate';

  if (tabList) {
    tabList.classList.toggle('active', !isDictate);
    tabList.setAttribute('aria-selected', !isDictate ? 'true' : 'false');
  }
  if (tabDictate) {
    tabDictate.classList.toggle('active', isDictate);
    tabDictate.setAttribute('aria-selected', isDictate ? 'true' : 'false');
  }

  if (panelList) {
    panelList.classList.toggle('active', !isDictate);
    panelList.hidden = isDictate;
  }
  if (panelDictate) {
    panelDictate.classList.toggle('active', isDictate);
    panelDictate.hidden = !isDictate;
  }

  if (btnSalon) {
    btnSalon.hidden = !isDictate;
  }

  if (isDictate) {
    renderWaiterReadMode();
  } else {
    renderSelectedModalItems();
  }
};

const updateSelectedUI = () => {
  const totalItemsCount = AppState.selectedItems.reduce((sum, i) => sum + (i.qty || 1), 0);
  const totalAmount = AppState.selectedItems.reduce((sum, i) => sum + (i.price * (i.qty || 1)), 0);

  // Badge en el header con micro-animación pop
  const badge = document.getElementById('cart-badge');
  if (badge) {
    badge.textContent = totalItemsCount;
    badge.classList.remove('badge-pop');
    void badge.offsetWidth;
    badge.classList.add('badge-pop');
  }

  // Barra flotante inferior (/distill)
  const floatBar = document.getElementById('floating-cart-bar');
  const floatCount = document.getElementById('float-cart-count');
  const floatTotal = document.getElementById('float-cart-total');

  if (floatBar) {
    if (totalItemsCount > 0) {
      floatBar.classList.add('visible');
      document.body.classList.add('has-floating-bar');
      if (floatCount) {
        floatCount.textContent = `${totalItemsCount}`;
        floatCount.classList.remove('badge-pop');
        void floatCount.offsetWidth;
        floatCount.classList.add('badge-pop');
      }
      if (floatTotal) floatTotal.textContent = formatCOP(totalAmount);
    } else {
      floatBar.classList.remove('visible');
      document.body.classList.remove('has-floating-bar');
    }
  }

  // Actualizar la vista activa de la comanda
  if (AppState.comandaView === 'dictate') {
    renderWaiterReadMode();
  } else {
    renderSelectedModalItems();
  }
};

const renderSelectedModalItems = () => {
  const container = document.getElementById('cart-items-container');
  if (!container) return;

  if (AppState.selectedItems.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-state">
        <div class="cart-empty-icon" aria-hidden="true">🥞</div>
        <h3 class="cart-empty-title">Tu lista para el mesero está vacía</h3>
        <p class="cart-empty-desc">
          Explora nuestras categorías y toca <strong>"＋ Marcar para pedir"</strong> en los platos que desees ordenar cuando el mesero llegue a tu mesa.
        </p>
        <button type="button" id="btn-empty-explore" class="btn-primary-action cart-empty-btn">
          Explorar el Menú
        </button>
      </div>
    `;
    const exploreBtn = document.getElementById('btn-empty-explore');
    if (exploreBtn) {
      exploreBtn.addEventListener('click', () => {
        triggerHaptic(10);
        closeDialog('cart-modal');
      });
    }
    const totalEl = document.getElementById('calc-total');
    if (totalEl) totalEl.textContent = formatCOP(0);
    return;
  }

  container.innerHTML = AppState.selectedItems.map((item, index) => {
    const qty = item.qty || 1;
    const subtotal = item.price * qty;

    return `
      <div class="cart-item-row" data-index="${index}">
        ${item.image ? `
          <img src="${item.image}" alt="${item.name}" class="cart-item-thumb" onerror="this.style.display='none'" />
        ` : ''}
        <div class="cart-item-meta">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">
            ${formatCOP(subtotal)} ${qty > 1 ? `<span class="price-breakdown">(${qty} × ${formatCOP(item.price)})</span>` : ''}
          </div>
          <div class="cart-item-note-row">
            ${item.customNotes ? `
              <span class="item-note-active">
                <span class="btn-edit-note" data-index="${index}" role="button" tabindex="0" title="Toca para editar indicación" aria-label="Editar indicación de ${item.name}">📝 ${item.customNotes}</span>
                <button type="button" class="btn-clear-note" data-index="${index}" title="Quitar indicación" aria-label="Quitar indicación de ${item.name}">✕</button>
              </span>
            ` : `
              <button type="button" class="btn-item-note" data-index="${index}">
                ＋ Nota especial
              </button>
            `}
          </div>
        </div>

        <div class="cart-item-stepper">
          <button type="button" class="btn-stepper btn-qty-minus" data-index="${index}" aria-label="Disminuir cantidad de ${item.name}">−</button>
          <span class="stepper-qty">${qty}</span>
          <button type="button" class="btn-stepper btn-qty-plus" data-index="${index}" aria-label="Aumentar cantidad de ${item.name}">+</button>
        </div>

        <button 
          type="button" 
          class="btn-remove-selected" 
          data-index="${index}" 
          aria-label="Quitar ${item.name} de la lista"
          title="Quitar de mi lista"
        >
          ✕
        </button>
      </div>
    `;
  }).join('');

  // Eventos de stepper y notas
  container.querySelectorAll('.btn-qty-minus').forEach(btn => {
    btn.addEventListener('click', () => updateItemQty(parseInt(btn.dataset.index), -1));
  });

  container.querySelectorAll('.btn-qty-plus').forEach(btn => {
    btn.addEventListener('click', () => updateItemQty(parseInt(btn.dataset.index), 1));
  });

  container.querySelectorAll('.btn-item-note').forEach(btn => {
    btn.addEventListener('click', () => openItemNoteDialog(parseInt(btn.dataset.index)));
  });

  container.querySelectorAll('.btn-edit-note').forEach(btn => {
    btn.addEventListener('click', () => openItemNoteDialog(parseInt(btn.dataset.index)));
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openItemNoteDialog(parseInt(btn.dataset.index));
      }
    });
  });

  container.querySelectorAll('.btn-clear-note').forEach(btn => {
    btn.addEventListener('click', () => clearItemNote(parseInt(btn.dataset.index)));
  });

  container.querySelectorAll('.btn-remove-selected').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      const row = btn.closest('.cart-item-row');
      if (row) {
        row.classList.add('item-removing');
        triggerHaptic(10);
        setTimeout(() => {
          removeSelectedItem(idx);
        }, 220);
      } else {
        removeSelectedItem(idx);
      }
    });
  });

  const totalAmount = AppState.selectedItems.reduce((sum, i) => sum + (i.price * (i.qty || 1)), 0);
  const totalEl = document.getElementById('calc-total');
  if (totalEl) totalEl.textContent = formatCOP(totalAmount);
};

// ==========================================================================
// MODO DICTADO RÁPIDO PARA EL MESERO
// ==========================================================================
const openWaiterReadMode = () => {
  if (AppState.selectedItems.length === 0) {
    showToast('No has marcado platos para dictar al mesero.');
    return;
  }
  switchComandaView('dictate');
  openDialog('cart-modal');
};

const renderWaiterReadMode = () => {
  const container = document.getElementById('waiter-read-container');
  const badge = document.getElementById('read-total-badge');
  const tableIndicator = document.getElementById('read-table-indicator');
  if (!container) return;

  if (tableIndicator) {
    if (AppState.tableNumber) {
      tableIndicator.textContent = `📍 Pedido para: ${AppState.tableNumber}`;
      tableIndicator.style.display = 'block';
    } else {
      tableIndicator.style.display = 'none';
    }
  }

  let totalAmount = 0;
  let totalItemsCount = 0;

  container.innerHTML = AppState.selectedItems.map((item, index) => {
    const qty = item.qty || 1;
    const subtotal = item.price * qty;
    totalAmount += subtotal;
    totalItemsCount += qty;

    return `
      <div class="read-item-card">
        <div class="read-item-badge">${index + 1}</div>
        <div class="read-item-info">
          <div class="read-item-title-row">
            <span class="read-item-name">
              <span class="read-item-qty">${qty}x</span> ${item.name}
            </span>
            <span class="read-item-price">${formatCOP(subtotal)}</span>
          </div>
          ${item.customNotes ? `
            <div class="read-item-notes">
              <strong>Indicación para cocina:</strong> ${item.customNotes}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');

  if (badge) {
    badge.textContent = `Total comanda (${totalItemsCount} ${totalItemsCount === 1 ? 'plato' : 'platos'}): ${formatCOP(totalAmount)}`;
  }
};

// ==========================================================================
// COMPARTIR LISTA CON LA MESA
// ==========================================================================
const initShareOrder = () => {
  const btnShare = document.getElementById('btn-share-order');
  if (!btnShare) return;

  btnShare.addEventListener('click', () => {
    if (AppState.selectedItems.length === 0) {
      showToast('Marca platos en tu lista primero.');
      return;
    }

    const total = AppState.selectedItems.reduce((sum, i) => sum + (i.price * (i.qty || 1)), 0);

    let text = `🥞 *Para pedir al Mesero · Crepes & Waffles* 🥞\n`;
    if (AppState.tableNumber) {
      text += `📍 *Mesa / Comensal:* ${AppState.tableNumber}\n`;
    }
    text += `\n`;

    AppState.selectedItems.forEach((item, index) => {
      const qty = item.qty || 1;
      const subtotal = item.price * qty;
      text += `${index + 1}. *${qty}x ${item.name}* (${formatCOP(subtotal)})\n`;
      if (item.customNotes) {
        text += `   📝 _${item.customNotes}_\n`;
      }
    });
    text += `\n*Total de la comanda:* ${formatCOP(total)}\n\n_Listo para dictar al mesero_ ☕`;

    if (navigator.share) {
      navigator.share({
        title: 'Platos para pedir en Crepes & Waffles',
        text: text
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        showToast('¡Lista copiada al portapapeles para compartir!');
      }).catch(() => {
        alert(text);
      });
    }
  });
};

// ==========================================================================
// MODAL DE INDICACIÓN / NOTA DE PREPARACIÓN AL MESERO
// ==========================================================================
const initNoteDialog = () => {
  const saveBtn = document.getElementById('btn-save-item-note');
  const cancelBtn = document.getElementById('btn-cancel-item-note');
  const closeBtn = document.getElementById('btn-close-note-dialog');
  const inputEl = document.getElementById('custom-note-input');
  const tableInput = document.getElementById('input-table-number');

  if (saveBtn) saveBtn.addEventListener('click', saveItemNoteFromDialog);
  if (cancelBtn) cancelBtn.addEventListener('click', () => closeDialog('item-note-dialog'));
  if (closeBtn) closeBtn.addEventListener('click', () => closeDialog('item-note-dialog'));

  if (inputEl) {
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        saveItemNoteFromDialog();
      }
    });
  }

  // Chips de atajos rápidos de preparación
  document.querySelectorAll('.btn-quick-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      if (!inputEl) return;
      const noteVal = chip.dataset.note;
      if (inputEl.value === noteVal) {
        inputEl.value = '';
        chip.classList.remove('active');
      } else {
        inputEl.value = noteVal;
        document.querySelectorAll('.btn-quick-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      }
      inputEl.focus();
    });
  });

  // Manejo del identificador de mesa / comensal
  if (tableInput) {
    if (AppState.tableNumber) {
      tableInput.value = AppState.tableNumber;
    }
    tableInput.addEventListener('input', (e) => {
      AppState.tableNumber = escapeHTML(e.target.value.trim()).slice(0, 25);
      saveSelectedToStorage();
    });
  }
};

// ==========================================================================
// MODAL Y ARMADOR DE "ENSALADA DE LA BARRA"
// ==========================================================================
const initSaladBuilder = () => {
  const ingredientsGrid = document.getElementById('ingredients-grid');
  const dressingsGrid = document.getElementById('dressings-grid');
  const complementsGrid = document.getElementById('complements-grid');

  if (!ingredientsGrid) return;

  // Renderizar ingredientes (24)
  ingredientsGrid.innerHTML = SALAD_BAR_CONFIG.ingredients.map((ing, i) => `
    <label class="salad-chip-label" id="lbl-ing-${i}">
      <input type="checkbox" class="salad-chip-input" data-group="ingredients" data-value="${ing}">
      <span>${ing}</span>
    </label>
  `).join('');

  // Renderizar salsas (5)
  dressingsGrid.innerHTML = SALAD_BAR_CONFIG.dressings.map((dr, i) => `
    <label class="salad-chip-label" id="lbl-dr-${i}">
      <input type="checkbox" class="salad-chip-input" data-group="dressings" data-value="${dr}">
      <span>${dr}</span>
    </label>
  `).join('');

  // Renderizar complementos (5)
  complementsGrid.innerHTML = SALAD_BAR_CONFIG.complements.map((cmp, i) => `
    <label class="salad-chip-label" id="lbl-cmp-${i}">
      <input type="checkbox" class="salad-chip-input" data-group="complements" data-value="${cmp}">
      <span>${cmp}</span>
    </label>
  `).join('');

  // Event listener para inputs
  document.querySelectorAll('.salad-chip-input').forEach(input => {
    input.addEventListener('change', handleSaladOptionChange);
  });

  // Botón para guardar ensalada personalizada
  const btnAddCustom = document.getElementById('btn-add-custom-salad');
  if (btnAddCustom) {
    btnAddCustom.addEventListener('click', () => {
      const ingCount = AppState.selectedSalad.ingredients.size;
      const drCount = AppState.selectedSalad.dressings.size;
      const cmpCount = AppState.selectedSalad.complements.size;

      if (ingCount === 0 && drCount === 0 && cmpCount === 0) {
        showToast('Elige al menos 1 ingrediente para tu ensalada.');
        return;
      }

      const ingList = Array.from(AppState.selectedSalad.ingredients).join(', ');
      const drList = Array.from(AppState.selectedSalad.dressings).join(', ');
      const cmpList = Array.from(AppState.selectedSalad.complements).join(', ');

      let customDetails = [];
      if (ingList) customDetails.push(`Ingredientes: ${ingList}`);
      if (drList) customDetails.push(`Salsas: ${drList}`);
      if (cmpList) customDetails.push(`Complementos: ${cmpList}`);

      toggleSelectItem({
        id: `ens-barra-custom-${Date.now()}`,
        name: 'Ensalada de la Barra (Personalizada)',
        price: SALAD_BAR_CONFIG.price,
        description: 'Ensalada personalizada para dictar a la mesera.',
        customNotes: customDetails.join(' | ')
      });

      closeDialog('salad-modal');
      showToast('Ensalada personalizada guardada para el mesero.');
    });
  }

  // Botón de cierre
  const btnClose = document.getElementById('btn-close-salad');
  if (btnClose) {
    btnClose.addEventListener('click', () => closeDialog('salad-modal'));
  }
};

const handleSaladOptionChange = (e) => {
  const input = e.target;
  const group = input.dataset.group;
  const value = input.dataset.value;
  const label = input.closest('.salad-chip-label');

  let maxLimit = 12;
  if (group === 'dressings') maxLimit = 2;
  if (group === 'complements') maxLimit = 3;

  const currentSet = AppState.selectedSalad[group];

  if (input.checked) {
    if (currentSet.size >= maxLimit) {
      input.checked = false;
      showToast(`Máximo ${maxLimit} opciones en este grupo.`);
      return;
    }
    currentSet.add(value);
    label.classList.add('selected');
  } else {
    currentSet.delete(value);
    label.classList.remove('selected');
  }

  updateSaladCounters();
};

const updateSaladCounters = () => {
  const ingCounter = document.getElementById('ingredients-counter');
  const drCounter = document.getElementById('dressings-counter');
  const cmpCounter = document.getElementById('complements-counter');

  const ingSize = AppState.selectedSalad.ingredients.size;
  const drSize = AppState.selectedSalad.dressings.size;
  const cmpSize = AppState.selectedSalad.complements.size;

  if (ingCounter) {
    ingCounter.textContent = `${ingSize} / ${SALAD_BAR_CONFIG.maxIngredients} seleccionados`;
    ingCounter.classList.toggle('limit-reached', ingSize === SALAD_BAR_CONFIG.maxIngredients);
  }
  if (drCounter) {
    drCounter.textContent = `${drSize} / ${SALAD_BAR_CONFIG.maxDressings} seleccionadas`;
    drCounter.classList.toggle('limit-reached', drSize === SALAD_BAR_CONFIG.maxDressings);
  }
  if (cmpCounter) {
    cmpCounter.textContent = `${cmpSize} / ${SALAD_BAR_CONFIG.maxComplements} seleccionados`;
    cmpCounter.classList.toggle('limit-reached', cmpSize === SALAD_BAR_CONFIG.maxComplements);
  }
};

// ==========================================================================
// BUSCADOR EN VIVO
// ==========================================================================
const initSearch = () => {
  const btnToggleSearch = document.getElementById('btn-toggle-search');
  const btnCloseSearch = document.getElementById('btn-close-search');
  const btnClearSearch = document.getElementById('btn-clear-search');
  const searchInput = document.getElementById('menu-search-input');
  const resultsContainer = document.getElementById('search-results-list');
  const searchStats = document.getElementById('search-stats');

  if (!btnToggleSearch || !searchInput) return;

  btnToggleSearch.addEventListener('click', () => {
    openDialog('search-modal');
    setTimeout(() => searchInput.focus(), 100);
  });

  if (btnCloseSearch) {
    btnCloseSearch.addEventListener('click', () => closeDialog('search-modal'));
  }

  if (btnClearSearch) {
    btnClearSearch.addEventListener('click', () => {
      searchInput.value = '';
      btnClearSearch.hidden = true;
      executeSearch('');
      searchInput.focus();
    });
  }

  let searchDebounce;
  searchInput.addEventListener('input', (e) => {
    let q = e.target.value;
    if (q.length > 50) {
      q = q.slice(0, 50);
      e.target.value = q;
    }
    q = q.trim();
    if (btnClearSearch) btnClearSearch.hidden = q.length === 0;

    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      executeSearch(q);
    }, 180);
  });

  const executeSearch = (query) => {
    const cleanQuery = (query || '').slice(0, 50).trim();
    if (!cleanQuery) {
      if (searchStats) searchStats.textContent = '';
      if (resultsContainer) {
        resultsContainer.innerHTML = '<p class="search-placeholder-text">Empieza a escribir para encontrar tus platos favoritos al instante.</p>';
      }
      return;
    }

    const term = cleanQuery.toLowerCase();
    const matched = [];

    MENU_DATA.forEach(cat => {
      cat.sections.forEach(sec => {
        if (sec.items) {
          sec.items.forEach(item => {
            const inName = item.name.toLowerCase().includes(term);
            const inDesc = (item.description || '').toLowerCase().includes(term);
            const inTags = (item.tags || []).some(t => t.toLowerCase().includes(term));
            const inSec = sec.name.toLowerCase().includes(term);

            if (inName || inDesc || inTags || inSec) {
              matched.push({ ...item, categoryName: cat.title, sectionName: sec.name });
            }
          });
        }
      });
    });

    if (searchStats) {
      searchStats.textContent = `${matched.length} ${matched.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}`;
    }

    if (resultsContainer) {
      if (matched.length === 0) {
        resultsContainer.innerHTML = `
          <div style="text-align: center; padding: 40px 16px; color: var(--cw-text-secondary);">
            <p style="font-size: 1.1rem; font-family: var(--font-serif); margin-bottom: 6px;">No se encontraron platos</p>
            <p style="font-size: 0.85rem;">Prueba buscando "champiñones", "waffle", "nutella", "salmón" o "vegano".</p>
          </div>
        `;
        return;
      }

      resultsContainer.innerHTML = matched.map(item => {
        const isSelected = AppState.selectedItems.some(i => i.id === item.id);
        return `
          <div class="menu-card ${isSelected ? 'is-selected' : ''}" style="margin-bottom: 8px;">
            ${item.image ? `
              <div class="menu-card-media-wrapper" style="height: 140px;">
                <img 
                  src="${item.image}" 
                  alt="${item.name}" 
                  class="menu-card-media" 
                  loading="lazy" 
                  decoding="async"
                  onerror="this.parentElement.classList.add('image-failed'); this.style.display='none'"
                />
              </div>
            ` : ''}
            <div class="menu-card-body">
              <div class="menu-card-header">
                <h4 class="item-name">${highlightMatch(item.name, cleanQuery)}</h4>
                <span class="item-price">${formatCOP(item.price)}</span>
              </div>
              <p style="font-size: 0.75rem; color: var(--cw-gold); font-weight: 600; margin-bottom: 4px;">
                ${item.categoryName} › ${item.sectionName}
              </p>
              <p class="item-desc">${highlightMatch(item.description || '', cleanQuery)}</p>
              <div class="menu-card-actions">
                <button 
                  type="button" 
                  class="btn-select-toggle btn-search-toggle ${isSelected ? 'selected' : ''}" 
                  data-id="${item.id}"
                >
                  <span class="toggle-icon">${isSelected ? '✓' : '＋'}</span>
                  <span class="toggle-label">${isSelected ? 'En lista' : 'Pedir'}</span>
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');

      resultsContainer.querySelectorAll('.btn-search-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
          const itemData = findItemById(btn.dataset.id);
          if (itemData) {
            toggleSelectItem(itemData.item);
            executeSearch(cleanQuery); // Re-renderizar resultados de búsqueda
          }
        });
      });
    }
  };
};

const highlightMatch = (text, query) => {
  if (!query || !text) return escapeHTML(text || '');
  const safeText = escapeHTML(text);
  const safeQuery = escapeRegex(query.slice(0, 50));
  try {
    const regex = new RegExp(`(${safeQuery})`, 'gi');
    return safeText.replace(regex, '<mark class="search-highlight">$1</mark>');
  } catch (e) {
    return safeText;
  }
};

const escapeRegex = (string) => {
  if (typeof string !== 'string') return '';
  return string.slice(0, 50).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// ==========================================================================
// MODAL DE DETALLE DE PLATO
// ==========================================================================
const openItemDetail = (itemId) => {
  const result = findItemById(itemId);
  if (!result) return;
  const { item: foundItem, category: foundCat, section: foundSec } = result;

  const detailBody = document.getElementById('detail-modal-body');
  if (!detailBody) return;

  const isSelected = AppState.selectedItems.some(i => i.id === foundItem.id);

  detailBody.innerHTML = `
    ${foundItem.image ? `
      <img src="${foundItem.image}" alt="${foundItem.name}" style="width: 100%; height: 220px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 16px;" />
    ` : ''}

    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
      <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--cw-text-primary);">${foundItem.name}</h3>
      <span style="font-size: 1.3rem; font-weight: 700; color: var(--cw-terracotta);">${formatCOP(foundItem.price)}</span>
    </div>

    <p style="font-size: 0.8rem; color: var(--cw-gold); font-weight: 600; margin-bottom: 12px;">
      ${foundCat.title} · ${foundSec.name}
    </p>

    <p style="font-size: 0.95rem; color: var(--cw-text-secondary); line-height: 1.5; margin-bottom: 16px;">
      ${foundItem.description || 'Preparado fresco al momento con ingredientes seleccionados de la más alta calidad.'}
    </p>

    ${foundItem.options ? `
      <div style="background: var(--cw-bg-warm); padding: 12px; border-radius: var(--radius-md); margin-bottom: 16px;">
        <h5 style="font-weight: 700; font-size: 0.88rem; margin-bottom: 8px;">Variaciones y combinaciones disponibles:</h5>
        ${foundItem.options.map(opt => `
          <div style="display: flex; justify-content: space-between; font-size: 0.86rem; padding: 4px 0; border-top: 1px dashed var(--cw-border-subtle);">
            <span>${opt.name}</span>
            <strong style="color: var(--cw-terracotta);">${formatCOP(opt.price)}</strong>
          </div>
        `).join('')}
      </div>
    ` : ''}

    ${foundItem.sideSaladOption ? `
      <div style="background: #EAF5ED; border: 1px solid #B7DEC3; padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.84rem; color: #1F5A36; margin-bottom: 16px;">
        🥗 <strong>Acompañamiento opcional:</strong> Pídelo con ensalada verde, vinagre balsámico y aceite de oliva por un valor adicional de $6.400.
      </div>
    ` : ''}

    ${foundItem.tags && foundItem.tags.includes('gluten-free-opt') ? `
      <div style="background: var(--cw-bg-warm); border: 1px solid var(--cw-border-subtle); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.84rem; color: var(--cw-text-secondary); margin-bottom: 16px;">
        🌾🚫 <strong>Masa especial:</strong> Recuerda que puedes solicitar tu crepe en <em>masa vegana y sin gluten</em> sin costo adicional.
      </div>
    ` : ''}

    <div style="background: rgba(36, 22, 16, 0.04); border-radius: var(--radius-md); padding: 12px; font-size: 0.78rem; color: var(--cw-text-tertiary); margin-bottom: 20px;">
      <strong>Aviso de preparación:</strong> ${ALLERGEN_NOTICE}
    </div>

    <div style="display: flex; gap: 10px;">
      <button 
        type="button" 
        id="btn-toggle-from-detail" 
        class="btn-primary-action"
        style="width: 100%; ${isSelected ? 'background-color: var(--tag-veg-text);' : ''}"
      >
        ${isSelected ? '✓ Quitar de mi lista para el mesero' : '＋ Marcar para pedir al mesero (' + formatCOP(foundItem.price) + ')'}
      </button>
    </div>
  `;

  document.getElementById('btn-toggle-from-detail').addEventListener('click', () => {
    toggleSelectItem(foundItem);
    closeDialog('item-detail-modal');
  });

  openDialog('item-detail-modal');
};

// ==========================================================================
// GESTIÓN ROBUSTA DE DIALOGS CON FOCO ACCESIBLE Y CONTROL DE SCROLL (/HARDEN)
// ==========================================================================
let openDialogCount = 0;

const openDialog = (dialogId, triggerEl = null) => {
  const dialog = document.getElementById(dialogId);
  if (dialog && !dialog.open) {
    dialog._triggerElement = triggerEl || document.activeElement;
    dialog.showModal();
    openDialogCount++;
    document.body.classList.add('modal-open');
  }
};

const closeDialog = (dialogId) => {
  const dialog = document.getElementById(dialogId);
  if (dialog && dialog.open) {
    dialog.close();
    openDialogCount = Math.max(0, openDialogCount - 1);
    if (openDialogCount === 0) {
      document.body.classList.remove('modal-open');
    }
    if (dialog._triggerElement && typeof dialog._triggerElement.focus === 'function') {
      try {
        dialog._triggerElement.focus();
      } catch (e) {}
      dialog._triggerElement = null;
    }
  }
};

// ==========================================================================
// ASIGNACIÓN DE EVENTOS MEDIANTE DELEGACIÓN ÓPTIMA (/OPTIMIZE)
// ==========================================================================
let isMenuDelegated = false;
const attachItemEvents = () => {
  if (isMenuDelegated) return;
  const menuContainer = document.getElementById('main-menu-content');
  if (!menuContainer) return;

  menuContainer.addEventListener('click', (e) => {
    // 1. Botón "Pedir / En lista"
    const toggleBtn = e.target.closest('.btn-select-toggle');
    if (toggleBtn) {
      e.stopPropagation();
      if (toggleBtn.classList.contains('btn-open-salad')) {
        openDialog('salad-modal', toggleBtn);
      } else if (toggleBtn.dataset.id) {
        const itemData = findItemById(toggleBtn.dataset.id);
        if (itemData) toggleSelectItem(itemData.item);
      }
      return;
    }

    // 2. Click en tarjeta o imagen para ver detalle
    const clickableArea = e.target.closest('.menu-card-clickable, .menu-card-media-wrapper');
    if (clickableArea) {
      if (e.target.closest('button')) return;
      const card = clickableArea.closest('.menu-card');
      if (card && card.dataset.id) {
        openItemDetail(card.dataset.id);
      }
    }
  });

  menuContainer.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const clickableArea = e.target.closest('.menu-card-clickable');
      if (clickableArea && !e.target.closest('button')) {
        e.preventDefault();
        const card = clickableArea.closest('.menu-card');
        if (card && card.dataset.id) {
          openItemDetail(card.dataset.id);
        }
      }
    }
  });

  isMenuDelegated = true;
};

// ==========================================================================
// BOTÓN FLOTANTE "VOLVER ARRIBA" (/POLISH)
// ==========================================================================
const initScrollTop = () => {
  const btn = document.getElementById('btn-scroll-top');
  if (!btn) return;

  const handleScroll = () => {
    if (window.scrollY > 380) {
      btn.hidden = false;
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  btn.addEventListener('click', () => {
    triggerHaptic(10);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
};

// ==========================================================================
// RESILIENCIA OFFLINE Y MONITOREO DE RED (/HARDEN)
// ==========================================================================
const initOfflineSupport = () => {
  const statusBar = document.getElementById('offline-status-bar');

  const updateOnlineStatus = () => {
    const isOffline = !navigator.onLine;
    if (statusBar) {
      statusBar.hidden = !isOffline;
    }
    if (isOffline) {
      showToast('Modo sin conexión activo · Carta y comanda disponibles 📶');
    } else {
      showToast('Conexión reestablecida 🟢');
    }
  };

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);

  if (!navigator.onLine && statusBar) {
    statusBar.hidden = false;
  }

  // Registrar Service Worker para navegación offline
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => {
          console.log('Crepes & Waffles SW activo:', reg.scope);
        })
        .catch((err) => {
          console.warn('Registro de SW omitido:', err);
        });
    });
  }
};

// ==========================================================================
// INICIALIZACIÓN DE LA APLICACIÓN
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  loadSelectedFromStorage();
  initHeroGreeting();
  renderCategoryTabs();
  renderMenuSections();
  initScrollSpy();
  initDietaryFilters();
  initSaladBuilder();
  initSearch();
  initShareOrder();
  initNoteDialog();
  initScrollTop();
  initOfflineSupport();
  updateSelectedUI();

  // Apertura del modal "Para Ordenar al Mesero" desde header o barra flotante
  const btnOpenCart = document.getElementById('btn-open-cart');
  const btnFloatingCart = document.getElementById('btn-floating-cart');
  const btnCloseCart = document.getElementById('btn-close-cart');
  const btnClearCart = document.getElementById('btn-clear-cart');
  const btnSwitchToDictate = document.getElementById('btn-switch-to-dictate');
  const tabViewList = document.getElementById('tab-view-list');
  const tabViewDictate = document.getElementById('tab-view-dictate');
  const btnOrderTaken = document.getElementById('btn-order-taken');
  const btnConfirmOrderTaken = document.getElementById('btn-confirm-order-taken');
  const btnToggleSalon = document.getElementById('btn-toggle-salon-mode');

  if (btnOpenCart) btnOpenCart.addEventListener('click', (e) => {
    switchComandaView('list');
    openDialog('cart-modal', e.currentTarget);
  });
  if (btnFloatingCart) btnFloatingCart.addEventListener('click', (e) => {
    switchComandaView('list');
    openDialog('cart-modal', e.currentTarget);
  });
  if (btnCloseCart) btnCloseCart.addEventListener('click', () => closeDialog('cart-modal'));
  if (btnClearCart) btnClearCart.addEventListener('click', clearAllSelected);

  // Selector de vista en la comanda (/distill)
  if (tabViewList) tabViewList.addEventListener('click', () => switchComandaView('list'));
  if (tabViewDictate) tabViewDictate.addEventListener('click', () => switchComandaView('dictate'));
  if (btnSwitchToDictate) btnSwitchToDictate.addEventListener('click', () => switchComandaView('dictate'));

  // Confirmación de pedido tomado
  if (btnOrderTaken) btnOrderTaken.addEventListener('click', markOrderAsCompleted);
  if (btnConfirmOrderTaken) btnConfirmOrderTaken.addEventListener('click', markOrderAsCompleted);

  // Alternador de Modo Salón nocturno / luz tenue universal (/adapt & /colorize)
  if (btnToggleSalon) {
    btnToggleSalon.addEventListener('click', () => {
      triggerHaptic(10);
      const isSalon = !document.body.classList.contains('salon-mode-active');
      document.body.classList.toggle('salon-mode-active', isSalon);
      document.querySelectorAll('.app-dialog').forEach(modal => {
        modal.classList.toggle('salon-mode', isSalon);
      });
      btnToggleSalon.textContent = isSalon ? '☀️ Claro' : '🌙 Salón';
      showToast(isSalon ? 'Modo Salón activado (luz tenue) 🌙' : 'Modo Claro activado ☀️');
    });
  }

  // Cierre de dialogs al hacer click en el backdrop
  document.querySelectorAll('.app-dialog').forEach(dialog => {
    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeDialog(dialog.id);
      }
    });

    // Soporte seguro para tecla Escape (/harden)
    dialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      closeDialog(dialog.id);
    });
  });
});
