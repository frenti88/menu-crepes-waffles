/**
 * Crepes & Waffles · Menú Digital Mobile
 * Lógica de interacción, búsqueda en vivo, filtros, ensalada personalizada y selección de mesa
 */

import { MENU_DATA, SALAD_BAR_CONFIG, DIETARY_TAGS, ALLERGEN_NOTICE } from './data/menu-data.js';

// Estado global de la aplicación
const AppState = {
  activeCategory: MENU_DATA[0].id,
  activeFilter: 'todos',
  searchQuery: '',
  cart: [],
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

// Cargar carrito desde LocalStorage
const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem('cw_mesa_cart');
    if (saved) {
      AppState.cart = JSON.parse(saved);
    }
  } catch (e) {
    AppState.cart = [];
  }
};

// Guardar carrito en LocalStorage
const saveCartToStorage = () => {
  try {
    localStorage.setItem('cw_mesa_cart', JSON.stringify(AppState.cart));
  } catch (e) {
    // Silencioso
  }
};

// ==========================================================================
// RENDERIZADO DEL MENÚ Y CATEGORÍAS
// ==========================================================================

const renderCategoryTabs = () => {
  const navList = document.getElementById('category-nav-list');
  if (!navList) return;

  navList.innerHTML = MENU_DATA.map((cat, index) => `
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
        <span>${cat.title}</span>
      </button>
    </li>
  `).join('');

  // Eventos de click en tabs
  navList.querySelectorAll('.category-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const catId = btn.dataset.catId;
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

  container.innerHTML = MENU_DATA.map(cat => `
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
          <p class="category-hero-subtitle">${cat.subtitle || ''}</p>
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              ${cat.callToAction.onlineStoreText}
            </a>
          </div>
        </div>
      ` : ''}
    </section>
  `).join('');

  attachItemEvents();
};

const renderItemCard = (item, catId) => {
  const isCustomSalad = item.isCustomSalad;
  return `
    <article 
      class="menu-card" 
      id="card-${item.id}"
      data-tags="${(item.tags || []).join(' ')}"
      data-id="${item.id}"
      data-name="${item.name.toLowerCase()}"
      data-desc="${(item.description || '').toLowerCase()}"
    >
      <div class="menu-card-main">
        <div class="menu-card-header">
          <h4 class="item-name">${item.name}</h4>
          <span class="item-price">${formatCOP(item.price)}</span>
        </div>

        <p class="item-desc">${item.description || ''}</p>

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
              class="btn-add-item btn-open-salad" 
              aria-haspopup="dialog"
              data-id="${item.id}"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              Armar Ensalada
            </button>
          ` : `
            <button 
              type="button" 
              class="btn-add-item btn-quick-add" 
              data-id="${item.id}"
              data-name="${item.name}"
              data-price="${item.price}"
              aria-label="Agregar ${item.name} a mi selección"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              Agregar a la mesa
            </button>
          `}

          <button 
            type="button" 
            class="btn-detail-item" 
            data-id="${item.id}"
            aria-label="Ver detalles de ${item.name}"
          >
            Detalles
          </button>
        </div>
      </div>

      ${item.image ? `
        <div class="menu-card-aside">
          <img 
            src="${item.image}" 
            alt="${item.name}" 
            class="item-thumb" 
            loading="lazy" 
            decoding="async"
          />
        </div>
      ` : ''}
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

  // Botón para agregar ensalada personalizada
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

      addToCart({
        id: `ens-barra-custom-${Date.now()}`,
        name: 'Ensalada de la Barra (Personalizada)',
        price: SALAD_BAR_CONFIG.price,
        customNotes: customDetails.join(' | ')
      });

      closeDialog('salad-modal');
      showToast('Ensalada de la Barra agregada a tu mesa.');
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
// SELECCIÓN DE MESA / CALCULADORA (CARRITO)
// ==========================================================================
const addToCart = (item) => {
  const existing = AppState.cart.find(i => i.id === item.id && i.customNotes === item.customNotes);
  if (existing) {
    existing.qty += 1;
  } else {
    AppState.cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      customNotes: item.customNotes || '',
      qty: 1
    });
  }
  saveCartToStorage();
  updateCartUI();
  showToast(`"${item.name}" agregado a tu mesa`);
};

const updateCartItemQty = (index, delta) => {
  if (!AppState.cart[index]) return;
  AppState.cart[index].qty += delta;
  if (AppState.cart[index].qty <= 0) {
    AppState.cart.splice(index, 1);
  }
  saveCartToStorage();
  updateCartUI();
};

const clearCart = () => {
  if (AppState.cart.length === 0) return;
  if (confirm('¿Deseas vaciar toda tu selección para la mesa?')) {
    AppState.cart = [];
    saveCartToStorage();
    updateCartUI();
    showToast('Selección vaciada.');
  }
};

const updateCartUI = () => {
  const totalItems = AppState.cart.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = AppState.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);

  // Badges en header
  const badge = document.getElementById('cart-badge');
  if (badge) {
    badge.textContent = totalItems;
    badge.style.transform = 'scale(1.25)';
    setTimeout(() => { badge.style.transform = 'scale(1)'; }, 200);
  }

  // Barra flotante inferior
  const floatBar = document.getElementById('floating-cart-bar');
  const floatCount = document.getElementById('float-cart-count');
  const floatTotal = document.getElementById('float-cart-total');

  if (floatBar) {
    if (totalItems > 0) {
      floatBar.classList.add('visible');
      if (floatCount) floatCount.textContent = `${totalItems} ${totalItems === 1 ? 'plato' : 'platos'}`;
      if (floatTotal) floatTotal.textContent = formatCOP(subtotal);
    } else {
      floatBar.classList.remove('visible');
    }
  }

  // Lista en el modal de carrito
  renderCartModalItems();
};

const renderCartModalItems = () => {
  const container = document.getElementById('cart-items-container');
  if (!container) return;

  if (AppState.cart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 16px; color: var(--cw-text-secondary);">
        <p style="font-size: 1.1rem; font-family: var(--font-serif); margin-bottom: 8px;">Aún no has agregado platos</p>
        <p style="font-size: 0.85rem;">Explora el menú y presiona "+ Agregar a la mesa" en tus platos favoritos.</p>
      </div>
    `;
    updateCartCalculations(0);
    return;
  }

  container.innerHTML = AppState.cart.map((item, index) => `
    <div class="cart-item-row">
      <div class="cart-item-meta">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-sub">${formatCOP(item.price)} c/u ${item.customNotes ? ` · <small>${item.customNotes}</small>` : ''}</div>
      </div>
      <div class="cart-item-controls">
        <button type="button" class="cart-qty-btn btn-qty-minus" data-index="${index}" aria-label="Disminuir cantidad de ${item.name}">-</button>
        <span class="cart-qty-val" aria-live="polite">${item.qty}</span>
        <button type="button" class="cart-qty-btn btn-qty-plus" data-index="${index}" aria-label="Aumentar cantidad de ${item.name}">+</button>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.btn-qty-minus').forEach(btn => {
    btn.addEventListener('click', () => updateCartItemQty(parseInt(btn.dataset.index), -1));
  });

  container.querySelectorAll('.btn-qty-plus').forEach(btn => {
    btn.addEventListener('click', () => updateCartItemQty(parseInt(btn.dataset.index), 1));
  });

  const subtotal = AppState.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  updateCartCalculations(subtotal);
};

const updateCartCalculations = (subtotal) => {
  const subtotalEl = document.getElementById('calc-subtotal');
  const tipEl = document.getElementById('calc-tip');
  const totalEl = document.getElementById('calc-total');
  const tipToggle = document.getElementById('tip-toggle');

  const includeTip = tipToggle ? tipToggle.checked : true;
  const tipAmount = includeTip ? Math.round(subtotal * 0.10) : 0;
  const totalAmount = subtotal + tipAmount;

  if (subtotalEl) subtotalEl.textContent = formatCOP(subtotal);
  if (tipEl) tipEl.textContent = formatCOP(tipAmount);
  if (totalEl) totalEl.textContent = formatCOP(totalAmount);
};

// ==========================================================================
// COMPARTIR PEDIDO CON LA MESA
// ==========================================================================
const initShareOrder = () => {
  const btnShare = document.getElementById('btn-share-order');
  if (!btnShare) return;

  btnShare.addEventListener('click', () => {
    if (AppState.cart.length === 0) {
      showToast('Agrega platos a tu selección primero.');
      return;
    }

    const subtotal = AppState.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
    const tipToggle = document.getElementById('tip-toggle');
    const includeTip = tipToggle ? tipToggle.checked : true;
    const tip = includeTip ? Math.round(subtotal * 0.10) : 0;
    const total = subtotal + tip;

    let text = `🥞 *Mi Selección Crepes & Waffles* 🥞\n\n`;
    AppState.cart.forEach(item => {
      text += `• ${item.qty}x ${item.name} (${formatCOP(item.price * item.qty)})\n`;
      if (item.customNotes) {
        text += `   _${item.customNotes}_\n`;
      }
    });
    text += `\n*Subtotal:* ${formatCOP(subtotal)}`;
    if (includeTip) {
      text += `\n*Propina sugerida (10%):* ${formatCOP(tip)}`;
    }
    text += `\n*Total aproximado:* ${formatCOP(total)}\n\n_Listo para ordenar a la mesera_ ☕`;

    if (navigator.share) {
      navigator.share({
        title: 'Mi Selección Crepes & Waffles',
        text: text
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        showToast('¡Pedido copiado al portapapeles para compartir!');
      }).catch(() => {
        alert(text);
      });
    }
  });
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
    const q = e.target.value.trim();
    if (btnClearSearch) btnClearSearch.hidden = q.length === 0;

    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      executeSearch(q);
    }, 200);
  });

  const executeSearch = (query) => {
    if (!query) {
      if (searchStats) searchStats.textContent = '';
      if (resultsContainer) {
        resultsContainer.innerHTML = '<p class="search-placeholder-text">Empieza a escribir para encontrar tus platos favoritos al instante.</p>';
      }
      return;
    }

    const term = query.toLowerCase();
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

      resultsContainer.innerHTML = matched.map(item => `
        <div class="menu-card" style="margin-bottom: 6px;">
          <div class="menu-card-main">
            <div class="menu-card-header">
              <h4 class="item-name">${highlightMatch(item.name, query)}</h4>
              <span class="item-price">${formatCOP(item.price)}</span>
            </div>
            <p style="font-size: 0.75rem; color: var(--cw-gold); font-weight: 600; margin-bottom: 4px;">
              ${item.categoryName} › ${item.sectionName}
            </p>
            <p class="item-desc">${highlightMatch(item.description || '', query)}</p>
            <div class="menu-card-actions">
              <button 
                type="button" 
                class="btn-add-item btn-search-add" 
                data-id="${item.id}"
                data-name="${item.name}"
                data-price="${item.price}"
              >
                + Agregar a la mesa
              </button>
            </div>
          </div>
        </div>
      `).join('');

      resultsContainer.querySelectorAll('.btn-search-add').forEach(btn => {
        btn.addEventListener('click', () => {
          addToCart({
            id: btn.dataset.id,
            name: btn.dataset.name,
            price: parseInt(btn.dataset.price)
          });
        });
      });
    }
  };
};

const highlightMatch = (text, query) => {
  if (!query || !text) return text;
  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
  return text.replace(regex, '<mark style="background: #FFE082; padding: 0 2px; border-radius: 2px;">$1</mark>');
};

const escapeRegex = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// ==========================================================================
// MODAL DE DETALLE DE PLATO
// ==========================================================================
const openItemDetail = (itemId) => {
  let foundItem = null;
  let foundCat = null;
  let foundSec = null;

  for (const cat of MENU_DATA) {
    for (const sec of cat.sections) {
      if (sec.items) {
        const it = sec.items.find(i => i.id === itemId);
        if (it) {
          foundItem = it;
          foundCat = cat;
          foundSec = sec;
          break;
        }
      }
    }
    if (foundItem) break;
  }

  if (!foundItem) return;

  const detailBody = document.getElementById('detail-modal-body');
  if (!detailBody) return;

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
        id="btn-add-from-detail" 
        class="btn-primary-action"
        style="width: 100%;"
      >
        Agregar a Mi Mesa (${formatCOP(foundItem.price)})
      </button>
    </div>
  `;

  document.getElementById('btn-add-from-detail').addEventListener('click', () => {
    addToCart({
      id: foundItem.id,
      name: foundItem.name,
      price: foundItem.price
    });
    closeDialog('item-detail-modal');
  });

  openDialog('item-detail-modal');
};

// ==========================================================================
// GESTIÓN DE DIALOGS (MODALES Y BOTTOM SHEETS)
// ==========================================================================
const openDialog = (dialogId) => {
  const dialog = document.getElementById(dialogId);
  if (dialog && !dialog.open) {
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  }
};

const closeDialog = (dialogId) => {
  const dialog = document.getElementById(dialogId);
  if (dialog && dialog.open) {
    dialog.close();
    document.body.style.overflow = '';
  }
};

// ==========================================================================
// ASIGNACIÓN DE EVENTOS A LOS ITEMS RENDERIZADOS
// ==========================================================================
const attachItemEvents = () => {
  // Botones "+ Agregar a la mesa"
  document.querySelectorAll('.btn-quick-add').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart({
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: parseInt(btn.dataset.price)
      });
    });
  });

  // Botón abrir ensalada personalizada
  document.querySelectorAll('.btn-open-salad').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openDialog('salad-modal');
    });
  });

  // Botón "Detalles"
  document.querySelectorAll('.btn-detail-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openItemDetail(btn.dataset.id);
    });
  });
};

// ==========================================================================
// INICIALIZACIÓN DE LA APLICACIÓN
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  loadCartFromStorage();
  renderCategoryTabs();
  renderMenuSections();
  initScrollSpy();
  initDietaryFilters();
  initSaladBuilder();
  initSearch();
  initShareOrder();
  updateCartUI();

  // Apertura del modal de selección desde header o barra flotante
  const btnOpenCart = document.getElementById('btn-open-cart');
  const btnFloatingCart = document.getElementById('btn-floating-cart');
  const btnCloseCart = document.getElementById('btn-close-cart');
  const btnClearCart = document.getElementById('btn-clear-cart');
  const tipToggle = document.getElementById('tip-toggle');

  if (btnOpenCart) btnOpenCart.addEventListener('click', () => openDialog('cart-modal'));
  if (btnFloatingCart) btnFloatingCart.addEventListener('click', () => openDialog('cart-modal'));
  if (btnCloseCart) btnCloseCart.addEventListener('click', () => closeDialog('cart-modal'));
  if (btnClearCart) btnClearCart.addEventListener('click', clearCart);
  if (tipToggle) {
    tipToggle.addEventListener('change', () => {
      const subtotal = AppState.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
      updateCartCalculations(subtotal);
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

    // Soporte para tecla Escape
    dialog.addEventListener('cancel', () => {
      document.body.style.overflow = '';
    });
  });
});
