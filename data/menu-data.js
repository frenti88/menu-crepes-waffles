/**
 * Base de datos oficial del Menú Crepes & Waffles
 * Contenido 100% exacto extraído de las 8 páginas del menú físico/digital
 */

export const ALLERGEN_NOTICE = "Si tienes alguna alergia alimentaria, restricción y/o intolerancia, te pedimos informárselo a nuestro equipo de servicio, haremos todo lo posible para atender tu solicitud. Ten en cuenta que en nuestras cocinas preparamos productos que contienen trigo, huevos, frutos secos, maní, soya, leche, pescados y mariscos y que no todos los platos tienen en su descripción la totalidad de los ingredientes.";

export const VEGAN_DOUGH_NOTICE = "Ahora puedes pedir tus crepes en masa vegana y sin gluten.";

export const SIDE_SALAD_NOTICE = "Pídelo con ensalada verde, vinagre balsámico y aceite de oliva. Valor adicional: $6.400";

export const MENU_DATA = [
  {
    id: "desayunos-brunch",
    title: "Desayunos & Brunch",
    subtitle: "Mañanas con sabor artesanal",
    bannerImage: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80",
    disclaimer: "Imagen de carácter ilustrativo, la presentación puede variar dependiendo el restaurante. Sujeto a disponibilidad y/o hasta agotar existencias.",
    sections: [
      {
        id: "huevos",
        name: "Huevos",
        items: [
          {
            id: "des-h-poche",
            name: "Poché",
            price: 13300,
            description: "Gratinados con el toque especial de Crepes & Waffles®.",
            tags: ["vegetariano"],
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=80"
          },
          {
            id: "des-h-benedictine",
            name: "Benedictine",
            price: 25900,
            description: "Sobre un muffin inglés con lomo ahumado de cerdo y salsa Crepes & Waffles®.",
            tags: [],
            image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=700&q=80"
          },
          {
            id: "des-h-rancheros",
            name: "Rancheros",
            price: 21500,
            description: "Huevos con cebolla, lomo ahumado de cerdo, salsa de tomate y queso parmesano.",
            tags: []
          },
          {
            id: "des-h-australianos",
            name: "Australianos",
            price: 29800,
            description: "Huevos poché, corte especial de tocineta, aguacate, tomate asado y salsa poché, todo sobre una tostada de pan artesanal.",
            featured: true,
            tags: [],
            image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=700&q=80"
          },
          {
            id: "des-h-crepeswaffles",
            name: "Crepes & Waffles®",
            price: 17900,
            description: "Crepe con huevos revueltos y cebollina a la crema sobre un fondo de salsa de queso.",
            tags: []
          },
          {
            id: "des-h-rosarito",
            name: "Rosarito",
            price: 28900,
            description: "Tostada artesanal, dos huevos poché, tocineta crujiente, aguacate y una salsa de chile chipotle resaltando el sabor de México.",
            tags: ["picante"]
          }
        ]
      },
      {
        id: "crepes-desayuno",
        name: "Crepes",
        notice: "Ahora puedes pedir tus crepes en masa vegana y sin gluten.",
        items: [
          {
            id: "des-c-sensacion-colombia",
            name: "Sensación Colombia",
            price: 28900,
            description: "Carne desmechada, queso, huevo, crema agria y nuestro tradicional “hogao\".",
            tags: ["gluten-free-opt"]
          },
          {
            id: "des-c-jamon-queso",
            name: "Jamón y Queso",
            price: 19900,
            description: "Clásica crepe rellena de jamón seleccionado y queso fundido.",
            tags: ["gluten-free-opt"]
          },
          {
            id: "des-c-queso",
            name: "Queso",
            price: 14200,
            description: "Deliciosa crepe rellena de suave queso fundido.",
            tags: ["vegetariano", "gluten-free-opt"]
          },
          {
            id: "des-c-parisien",
            name: "Parisien",
            price: 24900,
            description: "Crepe con huevo, tocineta, queso y salsa de queso.",
            tags: ["gluten-free-opt"]
          },
          {
            id: "des-c-bretonne",
            name: "Bretonne",
            price: 25900,
            description: "Típica crepe francesa de lomo ahumado de cerdo, queso y huevo.",
            image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=700&q=80",
            tags: ["gluten-free-opt"]
          },
          {
            id: "des-c-crespolinis",
            name: "Crespolinis",
            price: 22900,
            description: "Crepe con huevos revueltos, lomo ahumado de cerdo, queso y salsa primavera.",
            tags: ["gluten-free-opt"]
          }
        ]
      },
      {
        id: "waffles-desayuno",
        name: "Waffles",
        items: [
          {
            id: "des-w-mantequilla-syrup",
            name: "Mantequilla y Syrup o Miel",
            price: 11200,
            description: "Waffle dorado tradicional servido con mantequilla y a tu elección de syrup o miel pura de abejas.",
            tags: ["vegetariano"],
            image: "https://images.unsplash.com/photo-1598214886806-c87b84b7078b?auto=format&fit=crop&w=700&q=80",
            options: [
              { name: "Con Huevo Frito y Tocineta", price: 18400 },
              { name: "Con Huevo Frito y Salchichas", price: 18400 }
            ]
          },
          {
            id: "des-w-choclo",
            name: "Waffle D'Choclo",
            price: 16500,
            description: "Waffle de maíz relleno de queso, con queso 7 cueros y suero costeño.",
            isSignature: true,
            tags: ["vegetariano"],
            image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=700&q=80"
          }
        ]
      },
      {
        id: "mini-waffles-desayuno",
        name: "Mini Waffles",
        items: [
          {
            id: "des-mw-yuca",
            name: "Mini Waffle D'Yuca",
            price: 8900,
            description: "Un mini waffle con mantequilla, panela orgánica molida y jalea de guayaba.",
            tags: ["vegetariano"],
            options: [
              { name: "Pídelo con doble Mini Waffles", price: 15900 }
            ]
          }
        ]
      },
      {
        id: "menu-infantil",
        name: "Menú Infantil",
        items: [
          {
            id: "des-inf-mickey-salchichas",
            name: "Waffle Mickey con Syrup, Salchichitas y Huevo Frito",
            price: 14900,
            description: "Divertido waffle con forma de Mickey acompañado de syrup dulce, salchichitas y huevo frito.",
            tags: []
          },
          {
            id: "des-inf-mickey-tocineta",
            name: "Waffle Mickey con Syrup, Tocineta y Huevo Frito",
            price: 14900,
            description: "Divertido waffle con forma de Mickey acompañado de syrup dulce, tocineta crocante y huevo frito.",
            tags: []
          }
        ]
      },
      {
        id: "mas-opciones",
        name: "+ Opciones",
        items: [
          {
            id: "des-op-timbal",
            name: "Timbal de Frutas Frescas",
            price: 9900,
            description: "Refrescante combinación de mango, sandía y naranja.",
            tags: ["vegano", "vegetariano"]
          },
          {
            id: "des-op-acai",
            name: "Açaí Bowl",
            price: 21900,
            description: "Açaí con arándanos, fresa, banano y granola.",
            tags: ["vegano", "vegetariano", "nueces"],
            image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=700&q=80"
          },
          {
            id: "des-op-pancakes-ahuyama",
            name: "Pancakes de Ahuyama",
            price: 18900,
            description: "Con yogurt griego, granola y miel.",
            tags: ["vegetariano", "nueces"],
            image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=700&q=80"
          },
          {
            id: "des-op-parfait-frutos",
            name: "Nuestros Clásicos Parfaits: Frutos del Bosque",
            price: 19400,
            description: "Copa con granola, yogurt de vainilla, fresa, arándanos y salsa de arándanos.",
            tags: ["vegetariano", "nueces"]
          },
          {
            id: "des-op-parfait-guanabana",
            name: "Nuestros Clásicos Parfaits: Guanábana",
            price: 19400,
            description: "Copa de yogurt griego natural sin azúcar, acompañado de granola y copos de guanábana... Endulza a tu gusto con miel.",
            tags: ["vegetariano", "nueces"]
          }
        ]
      },
      {
        id: "para-cada-dia",
        name: "Para Cada Día",
        items: [
          {
            id: "des-dia-momposino",
            name: "Queso Momposino",
            price: 16900,
            description: "Tradicional y delicioso queso en capas de Mompox para que estires a tu antojo.",
            tags: ["vegetariano"]
          }
        ]
      },
      {
        id: "des-bebidas",
        name: "Bebidas de Desayuno",
        items: [
          { id: "des-j-mora", name: "Jugo de Mora", price: 7900, description: "Jugo natural recién preparado.", tags: ["vegano", "vegetariano"] },
          { id: "des-j-mango", name: "Jugo de Mango", price: 8200, description: "Jugo natural de mango fresco.", tags: ["vegano", "vegetariano"] },
          { id: "des-j-mandarina", name: "Jugo de Mandarina", price: 10200, description: "Jugo natural recién exprimido.", tags: ["vegano", "vegetariano"] },
          { id: "des-j-fresa", name: "Jugo de Fresa", price: 8300, description: "Jugo natural de fresa.", tags: ["vegano", "vegetariano"] },
          { id: "des-j-guanabana", name: "Jugo de Guanábana (en leche)", price: 8500, description: "Jugo natural en leche.", tags: ["vegetariano"] },
          { id: "des-j-naranja", name: "Jugo de Naranja", price: 9600, description: "Zumo puro de naranja exprimido al momento.", tags: ["vegano", "vegetariano"] },
          { id: "des-j-frambuesa", name: "Jugo de Frambuesa", price: 10500, description: "Jugo natural de frambuesas silvestres.", tags: ["vegano", "vegetariano"] },
          { id: "des-lim-natural", name: "Limonada Natural", price: 6900, description: "Limonada fresca tradicional.", tags: ["vegano", "vegetariano"] },
          { id: "des-lim-hierbabuena", name: "Limonada de Hierbabuena", price: 8300, description: "Con hierbabuena fresca macerada.", tags: ["vegano", "vegetariano"] },
          { id: "des-lim-mangobiche", name: "Limonada de Mango Biche", price: 9600, description: "Toque cítrico y mango biche.", tags: ["vegano", "vegetariano"] },
          { id: "des-lim-coco", name: "Limonada de Coco", price: 11600, description: "Cremosa con leche de coco natural.", tags: ["vegetariano"] },
          { id: "des-bat-pina", name: "Batido Piña, Jengibre y Hierbabuena", price: 9900, description: "Energizante y digestivo.", tags: ["vegano", "vegetariano"] },
          { id: "des-bat-alegria", name: "Batido Alegría", price: 11200, description: "Mezcla de frutas del campo: mango, maracuyá y piña.", tags: ["vegano", "vegetariano"] },
          { id: "des-bat-bienestar", name: "Batido Bienestar", price: 11200, description: "Mezcla de frutas del campo: manzana, pera, feijoa y hierbabuena.", tags: ["vegano", "vegetariano"] },
          { id: "des-agua-siembra", name: "Agua Siembra® con o sin Gas", price: 7500, description: "Agua de origen puro embotellada de forma sostenible.", tags: ["vegano", "vegetariano"] },
          { id: "des-agua-manantial", name: "Agua Manantial®", price: 7500, description: "Agua mineral natural sin gas.", tags: ["vegano", "vegetariano"] },
          { id: "des-agua-manantial-gas", name: "Agua Manantial® con Gas", price: 7200, description: "Agua mineral natural con gas.", tags: ["vegano", "vegetariano"] },
          { id: "des-coca-cola", name: "Coca-Cola® Original o Zero", price: 6500, description: "Refresco personal.", tags: [] }
        ]
      }
    ]
  },
  {
    id: "entradas-sopas",
    title: "Entradas y Sopas",
    subtitle: "Frescura natural de la huerta a la mesa",
    bannerImage: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
    disclaimer: "Imagen de carácter ilustrativo, la presentación puede variar dependiendo el restaurante. Sujeto a disponibilidad y/o hasta agotar existencias.",
    sections: [
      {
        id: "entradas",
        name: "Entradas",
        items: [
          {
            id: "ent-barra",
            name: "Ensalada de la Barra",
            price: 18900,
            description: "Porque nadie conoce la mezcla mejor que tú. Elige hasta 12 ingredientes frescos, 2 salsas artesanales y 3 complementos crujientes.",
            isCustomSalad: true,
            featured: true,
            tags: ["vegetariano", "personalizable"],
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80"
          },
          {
            id: "ent-cesar",
            name: "Ensalada Cesar",
            price: 17900,
            description: "La clásica receta con lechugas frescas, crutones dorados y queso parmesano.",
            tags: ["vegetariano"]
          }
        ]
      },
      {
        id: "sopas",
        name: "Sopas",
        items: [
          {
            id: "sop-otono",
            name: "Soy Otoño",
            price: 11900,
            description: "Explosión de vegetales, tomate, zucchini y zanahoria, con frijolitos rojos cuarentanos. *Frijol de temporada, origen Montes de María.",
            tags: ["vegano", "vegetariano"]
          },
          {
            id: "sop-espinaca",
            name: "Espinaca",
            price: 13900,
            description: "Sopa de espinaca del huerto a tu casa. Naturalmente deliciosa.",
            tags: ["vegetariano"]
          },
          {
            id: "sop-lentejas",
            name: "Lentejas",
            price: 14900,
            description: "Con champiñones y Portobellos, lentejas beluga y un ligero toque de especias de la India.",
            tags: ["vegetariano"]
          },
          {
            id: "sop-covarachia",
            name: "Covarachía",
            price: 15900,
            description: "Sopa donde el tomate, el maíz y el plátano entran a jugar para resaltar el valor de los sabores de nuestra tierra, con aguacate, crema agria y cilantro.",
            isSignature: true,
            tags: ["vegetariano", "picante"],
            image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=700&q=80"
          },
          {
            id: "sop-sol",
            name: "Sopa del Sol",
            price: 14900,
            description: "Sopa de zapallo con un toque de queso de cabra y pesto, pan pita y cilantro.",
            tags: ["vegetariano", "nueces"]
          },
          {
            id: "sop-mexicana",
            name: "Mexicana con Pollo",
            price: 20500,
            description: "Sabores de México: chile chipotle, crema agria, queso, aguacate, pollo, pico de gallo y tortilla mexicana.",
            tags: ["picante"],
            image: "https://images.unsplash.com/photo-1578020190125-f4f7c18bc9cb?auto=format&fit=crop&w=700&q=80"
          }
        ]
      }
    ]
  },
  {
    id: "crepes-sal",
    title: "Crepes de Sal",
    subtitle: "Recetas emblemáticas dobladas con maestría",
    bannerImage: "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=1200&q=80",
    notice: "Ahora puedes pedir tus crepes en masa vegana y sin gluten.",
    disclaimer: "Imagen de carácter ilustrativo, la presentación puede variar dependiendo el restaurante. Sujeto a disponibilidad y/o hasta agotar existencias.",
    sections: [
      {
        id: "crepes-clasicos",
        name: "Crepes Clásicos",
        items: [
          {
            id: "cs-jamon-queso",
            name: "Jamón y Queso",
            price: 19900,
            description: "Clásica crepe rellena de jamón seleccionado y queso fundido.",
            image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=700&q=80",
            options: [
              { name: "Con Champiñones", price: 23900 }
            ],
            tags: ["gluten-free-opt"]
          },
          {
            id: "cs-pavo-holandes",
            name: "Pavo, Queso tipo Holandés y Salsa Dijonnaise",
            price: 31900,
            description: "Pechuga de pavo con queso holandés y salsa dijonnaise artesanal.",
            sideSaladOption: true,
            tags: ["gluten-free-opt"]
          },
          {
            id: "cs-sensacion",
            name: "Sensación",
            price: 25900,
            description: "Lomo ahumado de cerdo, queso y huevo. Pídelo también con cebolla y tomate.",
            tags: ["gluten-free-opt"]
          },
          {
            id: "cs-sensacion-colombia",
            name: "Sensación Colombia",
            price: 28900,
            description: "Carne desmechada, queso, huevo, crema agria y nuestro tradicional “hogao\".",
            image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=700&q=80",
            tags: ["gluten-free-opt"]
          }
        ]
      },
      {
        id: "crepes-vegetarianos",
        name: "Crepes Vegetarianos",
        items: [
          {
            id: "cs-champinones-ajillo",
            name: "Champiñones al Ajillo",
            price: 22900,
            description: "Crepe de champiñones en salsa al ajillo con queso.",
            image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=700&q=80",
            tags: ["vegetariano", "gluten-free-opt"]
          },
          {
            id: "cs-romana",
            name: "Romana",
            price: 22900,
            description: "Mozzarellina, salsa napolitana con albahaca y queso parmesano.",
            sideSaladOption: true,
            tags: ["vegetariano", "gluten-free-opt"]
          },
          {
            id: "cs-sicilia",
            name: "Sicilia",
            price: 25400,
            description: "Mozzarellina, tomates secos, tomates frescos y albahaca.",
            sideSaladOption: true,
            tags: ["vegetariano", "gluten-free-opt"]
          },
          {
            id: "cs-champ-alcachofa",
            name: "Champiñones, Alcachofa y Queso",
            price: 27900,
            description: "Delicada combinación de champiñones, alcachofas y queso fundido.",
            tags: ["vegetariano", "gluten-free-opt"]
          },
          {
            id: "cs-poblana",
            name: "Poblana",
            price: 25900,
            description: "Aguacate, queso, pico de gallo, salsa agria, lechuga y un delicioso toque mexicano de ají.",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=700&q=80",
            tags: ["vegetariano", "picante", "gluten-free-opt"]
          },
          {
            id: "cs-toscana",
            name: "Toscana",
            price: 25900,
            description: "Queso, tomate, albahaca, champiñones frescos, salsa de champiñones y napolitana.",
            tags: ["vegetariano", "gluten-free-opt"]
          },
          {
            id: "cs-normanda",
            name: "Normanda",
            price: 26900,
            description: "Champiñones frescos, variedad de quesos y salsa de champiñones.",
            tags: ["vegetariano", "gluten-free-opt"]
          },
          {
            id: "cs-caprino",
            name: "Caprino",
            price: 29800,
            description: "Champiñones salteados, tomates secos, tomates frescos, pesto, reducción de balsámico y mozzarellina.",
            tags: ["vegetariano", "nueces", "gluten-free-opt"]
          }
        ]
      },
      {
        id: "crepes-carne",
        name: "Crepes de Carne",
        items: [
          {
            id: "cs-bolonesa-queso",
            name: "Boloñesa y Queso",
            price: 23300,
            description: "Nuestra clásica y suave salsa boloñesa gratinada con queso.",
            options: [
              { name: "Con Lomo Ahumado de Cerdo", price: 26900 },
              { name: "Con Champiñones", price: 25900 }
            ],
            tags: ["gluten-free-opt"]
          },
          {
            id: "cs-sombrero-vueltiao",
            name: "Sombrero Vueltiao",
            price: 30900,
            description: "Carne desmechada, preparada con “hogao” sobre puré de plátano maduro, acompañada de crema agria, aguacate y un toque de pico de gallo.",
            featured: true,
            isSignature: true,
            image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=700&q=80",
            tags: ["gluten-free-opt"]
          },
          {
            id: "cs-cochinita-pibil",
            name: "Cochinita Pibil",
            price: 29600,
            description: "Preparación mexicana de cerdo desmechado, acompañado de tonos cítricos y un toque de aguacate, lechuga, pico de gallo, cebolla encurtida y crema agria.",
            isSignature: true,
            image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=700&q=80",
            tags: ["picante", "gluten-free-opt"]
          },
          {
            id: "cs-ternera",
            name: "Ternera",
            price: 31500,
            description: "Tierna ternera cocinada a fuego lento en su salsa.",
            options: [
              { name: "Con Champiñones", price: 31800 }
            ],
            tags: ["gluten-free-opt"]
          },
          {
            id: "cs-stroganoff",
            name: "Stroganoff",
            price: 37200,
            description: "Julianas de lomo y champiñones en su salsa.",
            tags: ["gluten-free-opt"]
          },
          {
            id: "cs-mexicano",
            name: "Mexicano",
            price: 28900,
            description: "Boloñesa en salsa mexicana, queso rallado, lechuga, crema agria, ají y pico de gallo.",
            tags: ["picante", "gluten-free-opt"]
          },
          {
            id: "cs-lomito-pimienta",
            name: "Lomito Pimienta",
            price: 38200,
            description: "Julianas de lomo y pimienta del Putumayo en su salsa.",
            tags: ["picante", "gluten-free-opt"]
          },
          {
            id: "cs-roastbeef",
            name: "Roastbeef",
            price: 34900,
            description: "Tajadas de roastbeef y queso, cebollas asadas, rúgula, mayonesa chipotle y chucrut de cebollas, armando una fantasía de sabor.",
            tags: ["picante", "gluten-free-opt"]
          },
          {
            id: "cs-lomo-arabe",
            name: "Lomo Árabe",
            price: 41800,
            description: "Con especias del Medio Oriente y ensalada a su mejor estilo.",
            tags: ["gluten-free-opt"]
          }
        ]
      },
      {
        id: "crepes-pollo",
        name: "Crepes de Pollo",
        items: [
          {
            id: "cs-pollo-queso",
            name: "Pollo y Queso",
            price: 27900,
            description: "Pollo tierno desmenuzado en salsa suave con queso fundido.",
            options: [
              { name: "Con Champiñones", price: 30900 },
              { name: "Con Brócoli y Salsa de Queso Parmesano", price: 33600 }
            ],
            tags: ["gluten-free-opt"]
          },
          {
            id: "cs-pollo-curry",
            name: "Pollo al Curry",
            price: 30900,
            description: "Pechuga de pollo cocinada en una perfumada y cremosa salsa al curry.",
            tags: ["gluten-free-opt"]
          },
          {
            id: "cs-pollo-chipotle",
            name: "Pollo Chipotle",
            price: 31900,
            description: "Pollo con salsa chipotle, aguacate, pico de gallo, queso, maíz y crema agria, acompañado de rúgula.",
            tags: ["picante", "gluten-free-opt"]
          },
          {
            id: "cs-pollo-rosarito",
            name: "Pollo Rosarito",
            price: 32800,
            description: "Pollo en salsa mexicana con chipotle, arcos de aguacate y frijol rojo cuarentano. *Frijol de temporada, origen Montes de María.",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=700&q=80",
            tags: ["picante", "gluten-free-opt"]
          },
          {
            id: "cs-pollo-curry-hindu",
            name: "Pollo al Curry al estilo Hindú",
            price: 31900,
            description: "Con maní, uvas pasas y chutney de mango.",
            tags: ["nueces", "gluten-free-opt"]
          },
          {
            id: "cs-pollo-trufa-mexicano",
            name: "Pollo Trufa Mexicano",
            price: 32900,
            description: "Mezcla de sabores mexicanos con micro-huitlacoche, aguacate y salsa de queso parmesano.",
            tags: ["picante", "gluten-free-opt"]
          },
          {
            id: "cs-pollo-peruano",
            name: "Pollo Peruano",
            price: 31900,
            description: "Típica preparación de ají de gallina limeño, salsa de aceitunas y aceitunas moradas, rúgula y huevo.",
            tags: ["nueces", "picante", "gluten-free-opt"]
          },
          {
            id: "cs-pollo-aji-panka",
            name: "Pollo al Ají Panka",
            price: 32900,
            description: "Pollo con todos los sabores del Perú. Puré de frijol al cilantro, aguacate, rúgula, filamentos de pimentón y cebolla roja.",
            tags: ["picante", "gluten-free-opt"]
          },
          {
            id: "cs-pollo-mexicano",
            name: "Pollo Mexicano",
            price: 32500,
            description: "Pollo en salsa mexicana y chipotle, queso rallado, lechuga, crema agria, ají y pico de gallo.",
            tags: ["picante", "gluten-free-opt"]
          },
          {
            id: "cs-pollo-thai",
            name: "Pollo Thai",
            price: 33500,
            description: "Pechuga de pollo y champiñones Portobello, con una mezcla de sabores orientales a base de curry y maracuyá.",
            tags: ["gluten-free-opt"]
          }
        ]
      },
      {
        id: "crepes-mar",
        name: "Crepes de Mar",
        items: [
          {
            id: "cs-palmitos",
            name: "Palmitos",
            price: 32300,
            description: "Al Curry, al Ajillo o en Salsa de la Casa (Marco Polo).",
            tags: ["mar", "gluten-free-opt"]
          },
          {
            id: "cs-calamares",
            name: "Calamares",
            price: 34800,
            description: "Al Curry, al Ajillo o en Salsa de la Casa (Marco Polo).",
            tags: ["mar", "gluten-free-opt"]
          },
          {
            id: "cs-camarones",
            name: "Camarones",
            price: 41900,
            description: "Al Curry, al Ajillo o en Salsa de la Casa (Marco Polo).",
            tags: ["mar", "gluten-free-opt"]
          },
          {
            id: "cs-mar-encocado",
            name: "Mar Encocado",
            price: 42500,
            description: "Pulpo, camarones, calamares y langostinos sobre quinua negra, bañados en salsa de coco y toques de coco crujiente.",
            featured: true,
            image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=700&q=80",
            tags: ["mar", "gluten-free-opt"]
          },
          {
            id: "cs-camarones-rosarito",
            name: "Camarones Rosarito",
            price: 42800,
            description: "En salsa mexicana con chipotle, arcos de aguacate y frijol rojo cuarentano. *Frijol de temporada, origen Montes de María.",
            tags: ["mar", "picante", "gluten-free-opt"]
          },
          {
            id: "cs-salmon-roll",
            name: "Salmon Roll",
            price: 42500,
            description: "Rollitos de salmón ahumado con rúgula, queso crema, mostaza, cebolla, aguacate y crujientes vegetales frescos. Acompañados de ensalada verde.",
            image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=700&q=80",
            tags: ["mar", "gluten-free-opt"]
          }
        ]
      }
    ]
  },
  {
    id: "pitas-panne-cook",
    title: "Pitas y Panne Cook",
    subtitle: "Bolsillos árabes crocantes y panes campesinos ahuecados",
    bannerImage: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=1200&q=80",
    disclaimer: "Imagen de carácter ilustrativo, la presentación puede variar dependiendo el restaurante. Sujeto a disponibilidad y/o hasta agotar existencias.",
    sections: [
      {
        id: "pitas",
        name: "Pitas",
        items: [
          {
            id: "pit-pollo-arabe",
            name: "Pollo Árabe",
            price: 28900,
            description: "Pechuga de pollo al horno, lechuga, tahini, trocitos de aceitunas y cebollas encurtidas.",
            image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80",
            tags: []
          },
          {
            id: "pit-pavo",
            name: "Pavo",
            price: 31900,
            description: "Pan árabe relleno de pechuga de pavo, variedad de quesos y salsa dijonnaise.",
            sideSaladOption: true,
            tags: []
          },
          {
            id: "pit-doble-pocket",
            name: "Doble Pocket",
            price: 25500,
            description: "Pan árabe relleno de lomo ahumado de cerdo, salsa dijonnaise y variedad de quesos.",
            tags: []
          },
          {
            id: "pit-popeye-pocket",
            name: "Popeye Pocket",
            price: 23900,
            description: "Pan árabe relleno de espinaca, lomo ahumado de cerdo, cebolla, huevo, champiñones y tomate, gratinado con queso, acompañado con salsa amarilla y vinagreta verde.",
            tags: []
          },
          {
            id: "pit-mozzarella",
            name: "Mozzarella Pocket",
            price: 16200,
            description: "Queso, salsa napolitana y albahaca.",
            tags: ["vegetariano"]
          },
          {
            id: "pit-champinon",
            name: "Champiñón Pocket",
            price: 29200,
            description: "Portobello y champiñones salteados con albahaca, tomates secos y rúgula, gratinados con queso.",
            tags: ["vegetariano"]
          },
          {
            id: "pit-capresa",
            name: "Capresa",
            price: 27900,
            description: "Pan árabe relleno de mozzarellina, tomates frescos y secos, rúgula y pesto.",
            image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80",
            tags: ["vegetariano", "nueces"]
          },
          {
            id: "pit-siciliana",
            name: "Siciliana",
            price: 27900,
            description: "Queso, salsa napolitana, tomates frescos, tomates secos, albahaca y aceite de oliva.",
            tags: ["vegetariano"]
          },
          {
            id: "pit-vegetariana",
            name: "Vegetariana",
            price: 25900,
            description: "Queso, salsa napolitana, champiñones, cebolla, tomate, pimentón y apio.",
            tags: ["vegetariano"]
          },
          {
            id: "pit-griega",
            name: "Griega",
            price: 27900,
            description: "Queso, salsa napolitana, alcachofas, aceitunas moradas, cebolla, tomate y especias.",
            tags: ["vegetariano"]
          }
        ]
      },
      {
        id: "panne-cook",
        name: "Panne Cook",
        notice: "Delicioso pan francés redondo, relleno con cualquiera de nuestras opciones:",
        items: [
          {
            id: "pc-ternera",
            name: "Ternera",
            price: 35300,
            description: "Tierna ternera en su salsa servida dentro de pan francés crujiente.",
            options: [
              { name: "Con Champiñones", price: 35800 }
            ],
            tags: []
          },
          {
            id: "pc-pollo-champinones",
            name: "Pollo y Champiñones",
            price: 34900,
            description: "Pechuga de pollo con champiñones en salsa suave.",
            image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=700&q=80",
            options: [
              { name: "Con Queso", price: 35900 }
            ],
            tags: []
          },
          {
            id: "pc-pollo-curry",
            name: "Pollo al Curry",
            price: 35900,
            description: "Pollo en aromática salsa al curry servido dentro de pan campesino.",
            tags: []
          },
          {
            id: "pc-stroganoff",
            name: "Stroganoff",
            price: 44900,
            description: "Julianas de lomo y champiñones en su salsa.",
            tags: []
          },
          {
            id: "pc-lomito-pimienta",
            name: "Lomito Pimienta",
            price: 44900,
            description: "Julianas de lomo y pimienta del Putumayo en su salsa.",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80",
            tags: ["picante"]
          },
          {
            id: "pc-palmitos",
            name: "Palmitos",
            price: 35900,
            description: "Al Curry, al Ajillo o en Salsa de la Casa (Marco Polo).",
            tags: ["mar"]
          },
          {
            id: "pc-calamares",
            name: "Calamares",
            price: 40700,
            description: "Al Curry, al Ajillo o en Salsa de la Casa (Marco Polo).",
            tags: ["mar"]
          },
          {
            id: "pc-camarones",
            name: "Camarones",
            price: 45900,
            description: "Al Curry, al Ajillo o en Salsa de la Casa (Marco Polo).",
            isSignature: true,
            image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=700&q=80",
            tags: ["mar"]
          }
        ]
      }
    ]
  },
  {
    id: "ensaladas",
    title: "Ensaladas",
    subtitle: "Combinaciones botánicas y frescas con salsas de autor",
    bannerImage: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80",
    disclaimer: "Imagen de carácter ilustrativo, la presentación puede variar dependiendo el restaurante. Sujeto a disponibilidad y/o hasta agotar existencias.",
    sections: [
      {
        id: "ensaladas-lista",
        name: "Ensaladas",
        items: [
          {
            id: "ens-cesar-pollo",
            name: "Cesar con Pollo",
            price: 29500,
            description: "La clásica ensalada con crutones, tomates cherry y queso parmesano. Acompañada con pan centeno.",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80",
            tags: []
          },
          {
            id: "ens-cesar-salmon",
            name: "Cesar con Salmón Ahumado",
            price: 41900,
            description: "La clásica ensalada con crutones, tomates cherry, queso parmesano y exquisito salmón ahumado. Acompañada con pan centeno.",
            tags: ["mar"]
          },
          {
            id: "ens-florentina",
            name: "Florentina",
            price: 35500,
            description: "Mozzarellina, variedad de lechugas frescas, albahaca fresca, tomates secos, frescos y cherry, champiñones, pesto, aguacate, aceitunas negras y vinagre balsámico.",
            image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80",
            tags: ["vegetariano", "nueces"]
          },
          {
            id: "ens-thai",
            name: "Thai",
            price: 36200,
            description: "Pechuga de pavo con ajonjolí y albahaca, variedad de lechugas frescas, rúgula, apio, champiñones, pimentón, tomate cherry, cebollas crocantes y una vinagreta oriental.",
            tags: []
          },
          {
            id: "ens-mediterranea",
            name: "Mediterránea",
            price: 42900,
            description: "Camarones, calamares, pesto, variedad de lechugas frescas, apio, champiñones, cebolla roja, aceitunas negras, vinagreta balsámica y cebollas crocantes.",
            image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=700&q=80",
            tags: ["mar", "nueces"]
          },
          {
            id: "ens-marroqui-camaron",
            name: "Marroquí con Camarón",
            price: 42900,
            description: "Couscous preparado con especias, aguacate, chutney de mango, quinua tostada y ensalada verde con vinagreta marroquí.",
            tags: ["mar", "nueces"]
          },
          {
            id: "ens-marroqui-pollo",
            name: "Marroquí con Pollo",
            price: 29200,
            description: "Couscous preparado con especias, aguacate, chutney de mango, quinua tostada y ensalada verde con vinagreta marroquí.",
            tags: ["nueces"]
          },
          {
            id: "ens-tuna-salad",
            name: "Tuna Salad",
            price: 40900,
            description: "Atún ventresca, variedad de lechugas frescas, rúgula, pepino, albahaca, champiñones, apio, aguacate, tomate cherry, aceitunas negras y vinagreta de finas hierbas. Acompañado con pan árabe.",
            tags: ["mar"]
          },
          {
            id: "ens-valparaiso",
            name: "Valparaíso",
            price: 42900,
            description: "Filete de salmón ahumado con merkén, acompañado de quinua negra, kale con queso parmesano y Grana Padano, picadillo de tomate, aguacate y vinagreta árabe.",
            tags: ["mar"]
          },
          {
            id: "ens-torina",
            name: "Torina",
            price: 38500,
            description: "Mozzarellina envuelta en jamón serrano con cebollas caramelizadas y pimienta, variedad de lechugas, rúgula, tomate cherry y vinagreta a base de mostaza Dijón.",
            tags: []
          }
        ]
      }
    ]
  },
  {
    id: "bebidas",
    title: "Bebidas",
    subtitle: "Jugos de fruta 100% natural, batidos, cervezas y vinos",
    bannerImage: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80",
    disclaimer: "Se prohíbe el expendio de bebidas alcohólicas a menores de edad.",
    sections: [
      {
        id: "jugos",
        name: "Jugos Naturales",
        items: [
          { id: "beb-j-mora", name: "Mora", price: 7900, description: "Jugo de fruta 100% natural.", tags: ["vegano", "vegetariano"] },
          { id: "beb-j-mango", name: "Mango", price: 8200, description: "Jugo de fruta 100% natural.", tags: ["vegano", "vegetariano"] },
          { 
            id: "beb-j-mandarina", 
            name: "Mandarina", 
            price: 10200, 
            description: "Jugo natural recién exprimido.", 
            image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=700&q=80",
            tags: ["vegano", "vegetariano"] 
          },
          { id: "beb-j-fresa", name: "Fresa", price: 8300, description: "Jugo de fruta 100% natural.", tags: ["vegano", "vegetariano"] },
          { id: "beb-j-guanabana", name: "Guanábana (en leche)", price: 8500, description: "Jugo natural en leche.", tags: ["vegetariano"] },
          { id: "beb-j-feijoa", name: "Feijoa", price: 7900, description: "Jugo de fruta 100% natural.", tags: ["vegano", "vegetariano"] },
          { id: "beb-j-durazno", name: "Durazno", price: 8900, description: "Jugo de fruta 100% natural.", tags: ["vegano", "vegetariano"] },
          { id: "beb-j-frambuesa", name: "Frambuesa", price: 10500, description: "Jugo de fruta 100% natural.", tags: ["vegano", "vegetariano"] }
        ]
      },
      {
        id: "limonadas",
        name: "Limonadas",
        items: [
          { id: "beb-lim-natural", name: "Limonada Natural", price: 6900, description: "Zumo de limón fresco preparado al momento.", tags: ["vegano", "vegetariano"] },
          { id: "beb-lim-mandarino", name: "Limonada Limón Mandarino", price: 7900, description: "Refrescante combinación cítrica de limón mandarino.", tags: ["vegano", "vegetariano"] },
          { id: "beb-lim-hierbabuena", name: "Limonada de Hierbabuena", price: 8300, description: "Con hojas frescas de hierbabuena maceradas.", tags: ["vegano", "vegetariano"] },
          { id: "beb-lim-mangobiche", name: "Limonada de Mango Biche", price: 9600, description: "El toque perfecto entre acidez fresca y mango verde.", tags: ["vegano", "vegetariano"] },
          { 
            id: "beb-lim-coco", 
            name: "Limonada de Coco", 
            price: 11600, 
            description: "Cremosa limonada batida con leche de coco natural.", 
            image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80",
            tags: ["vegetariano"] 
          }
        ]
      },
      {
        id: "batidos",
        name: "Batidos",
        items: [
          {
            id: "beb-bat-pina-jengibre",
            name: "Piña, Jengibre y Hierbabuena",
            price: 9900,
            description: "Refrescante, digestivo y tonificante combinación.",
            tags: ["vegano", "vegetariano"]
          },
          {
            id: "beb-bat-alegria",
            name: "Alegría",
            price: 11200,
            description: "Mezcla de frutas del campo: mango, maracuyá y piña.",
            image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=700&q=80",
            tags: ["vegano", "vegetariano"]
          },
          {
            id: "beb-bat-bienestar",
            name: "Bienestar",
            price: 11200,
            description: "Mezcla de frutas del campo: manzana, pera, feijoa y hierbabuena.",
            tags: ["vegano", "vegetariano"]
          }
        ]
      },
      {
        id: "otras-bebidas",
        name: "Otras Bebidas",
        items: [
          { id: "beb-agua-manantial", name: "Agua Manantial®", price: 7500, description: "Agua mineral natural sin gas.", tags: ["vegano", "vegetariano"] },
          { id: "beb-agua-manantial-gas", name: "Agua Manantial® con Gas", price: 7200, description: "Agua mineral natural con gas.", tags: ["vegano", "vegetariano"] },
          { id: "beb-gaseosas", name: "Gaseosas (Coca-Cola®, Zero, Sprite® o Kola Roman®)", price: 6500, description: "Coca-Cola® original, Coca-Cola® zero, Sprite® o Kola Roman®.", tags: [] }
        ]
      },
      {
        id: "cervezas",
        name: "Cervezas",
        items: [
          { id: "beb-cer-club", name: "Club Colombia", price: 10900, description: "Cerveza premium nacional.", tags: [] },
          { id: "beb-cer-stella", name: "Stella Artois", price: 13300, description: "Cerveza importada tipo Lager.", tags: [] }
        ]
      },
      {
        id: "vinos",
        name: "Vinos",
        items: [
          {
            id: "beb-vino-tinto",
            name: "Vino AMORETINTO - Tinto",
            price: 68500,
            description: "Cepa: Merlot | Origen: Chile.",
            options: [
              { name: "Media Botella", price: 68500 },
              { name: "Botella", price: 109500 }
            ],
            tags: []
          },
          {
            id: "beb-vino-blanco",
            name: "Vino AMORETINTO - Blanco",
            price: 68500,
            description: "Cepa: Gewurstraminer | Origen: Chile.",
            options: [
              { name: "Media Botella", price: 68500 },
              { name: "Botella", price: 109500 }
            ],
            tags: []
          },
          {
            id: "beb-vino-prosecco",
            name: "Vino Prosecco",
            price: 83000,
            description: "Cepa: Glera | Origen: Italia.",
            options: [
              { name: "Media Botella", price: 83000 },
              { name: "Botella", price: 118500 }
            ],
            tags: []
          }
        ]
      }
    ]
  },
  {
    id: "dulces-helados",
    title: "Crepes Dulces, Waffles y Helados",
    subtitle: "El corazón artesanal de la dulzura",
    bannerImage: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80",
    disclaimer: "Imagen de carácter ilustrativo, la presentación puede variar dependiendo el restaurante. Sujeto a disponibilidad y/o hasta agotar existencias.",
    sections: [
      {
        id: "crepes-dulces",
        name: "Crepes Dulces",
        items: [
          {
            id: "cd-nutella",
            name: "Nutella®",
            price: 16900,
            description: "Crepe de Nutella® con crema chantilly.",
            isSignature: true,
            image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=700&q=80",
            options: [
              { name: "Con Fresas", price: 17600 },
              { name: "Con Banano", price: 17600 }
            ],
            tags: ["vegetariano", "nueces"]
          },
          {
            id: "cd-chocolate-fondue",
            name: "Chocolate Fondue",
            price: 14800,
            description: "Crepe con fresas y banano, helado de Vainilla, crema chantilly y chocolate.",
            image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=700&q=80",
            tags: ["vegetariano"]
          },
          {
            id: "cd-baby-doll",
            name: "Baby Doll",
            price: 15600,
            description: "Banano fresco, helado de Vainilla, nueces, chocolate caliente y crema chantilly.",
            tags: ["vegetariano", "nueces"]
          },
          {
            id: "cd-mont-blanc",
            name: "Mont Blanc",
            price: 17800,
            description: "Crepe con chocolate blanco, fresas y crema chantilly.",
            tags: ["vegetariano"]
          },
          {
            id: "cd-cleopatra",
            name: "Cleopatra",
            price: 14600,
            description: "Crepe con tajadas de banano y fresa, helado de Mora, crema chantilly y salsa de uva e inglesa.",
            tags: ["vegetariano"]
          }
        ]
      },
      {
        id: "waffles-dulce",
        name: "Waffles de Dulce",
        items: [
          {
            id: "wd-mantequilla-syrup",
            name: "Mantequilla y Syrup o Miel",
            price: 11200,
            description: "Clásico waffle caliente con mantequilla y miel o syrup.",
            tags: ["vegetariano"]
          },
          {
            id: "wd-sencillo-chantilly",
            name: "Sencillo con Crema Chantilly",
            price: 14200,
            description: "Pídelo con una de nuestras salsas de dulce: arequipe, chocolate, melocotón, inglesa, piña, caramelo, agrás o crema de limón.",
            tags: ["vegetariano"]
          },
          {
            id: "wd-sencillo-helado",
            name: "Sencillo con Helado",
            price: 15600,
            description: "Pídelo con una de nuestras salsas de dulce: arequipe, chocolate, melocotón, inglesa, piña, caramelo, agrás o crema de limón.",
            tags: ["vegetariano"]
          },
          {
            id: "wd-especial",
            name: "Especial",
            price: 17900,
            description: "Con helado y crema chantilly. Escoge tres o cuatro salsas diferentes: arequipe, chocolate, melocotón, inglesa, piña, frutos del bosque, caramelo, agrás o crema de limón.",
            tags: ["vegetariano"]
          },
          {
            id: "wd-arequipe",
            name: "Arequipe",
            price: 14600,
            description: "Con salsa de arequipe, helado de Vainilla y Arequipe con crema chantilly.",
            tags: ["vegetariano"]
          },
          {
            id: "wd-arequipe-banano",
            name: "Arequipe y Banano",
            price: 14900,
            description: "Tajadas de banano fresco con salsa de arequipe, helado de Vainilla y Arequipe con crema chantilly.",
            tags: ["vegetariano"]
          },
          {
            id: "wd-nutella",
            name: "Nutella®",
            price: 17600,
            description: "Con helado de Vainilla y crema chantilly.",
            tags: ["vegetariano", "nueces"]
          },
          {
            id: "wd-nutella-banano",
            name: "Nutella® y Banano",
            price: 17900,
            description: "Tajadas de banano fresco, helado Old Style y crema chantilly.",
            image: "https://images.unsplash.com/photo-1598214886806-c87b84b7078b?auto=format&fit=crop&w=700&q=80",
            tags: ["vegetariano", "nueces"]
          },
          {
            id: "wd-frutos-bosque",
            name: "Frutos del Bosque",
            price: 15600,
            description: "Con helado de Vainilla y crema chantilly.",
            image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=700&q=80",
            tags: ["vegetariano"]
          }
        ]
      },
      {
        id: "mini-waffles-dulce",
        name: "Mini Waffles de Dulce",
        items: [
          { id: "mwd-mantequilla", name: "Mantequilla y Syrup o Miel", price: 11200, description: "Mini waffle tradicional con mantequilla y dulce.", tags: ["vegetariano"] },
          { id: "mwd-arequipe", name: "Arequipe", price: 14600, description: "Con helado de Vainilla y crema chantilly.", tags: ["vegetariano"] },
          { id: "mwd-chocolate", name: "Chocolate", price: 14600, description: "Con helado de Vainilla y crema chantilly.", tags: ["vegetariano"] },
          { id: "mwd-nutella", name: "Nutella®", price: 17600, description: "Con helado de Vainilla y crema chantilly.", tags: ["vegetariano", "nueces"] },
          { id: "mwd-frutos-bosque", name: "Frutos del Bosque", price: 15600, description: "Frutos del bosque con helado de Vainilla y crema chantilly.", tags: ["vegetariano"] }
        ]
      },
      {
        id: "waffles-sal-dulces",
        name: "Waffles de Sal",
        items: [
          {
            id: "ws-choclo",
            name: "Waffle D'Choclo",
            price: 16500,
            description: "Waffle de maíz relleno de queso, con queso 7 cueros y suero costeño.",
            tags: ["vegetariano"]
          },
          {
            id: "ws-mini-yuca",
            name: "Mini Waffle D'Yuca",
            price: 8900,
            description: "Un mini waffle con mantequilla, panela orgánica molida y jalea de guayaba.",
            tags: ["vegetariano"],
            options: [
              { name: "Pídelo con doble Mini Waffles", price: 15900 }
            ]
          }
        ]
      },
      {
        id: "gofres",
        name: "Gofres",
        items: [
          { id: "gof-nutella", name: "Gofre Nutella®", price: 17900, description: "Gofre estilo belga con abundante Nutella®.", tags: ["vegetariano", "nueces"] },
          { id: "gof-especial", name: "Gofre Especial", price: 18700, description: "Con helado y crema chantilly. Escoge dos salsas diferentes: arequipe, chocolate, Nutella®, frutos del bosque.", tags: ["vegetariano", "nueces"] },
          { id: "gof-chocolato", name: "Gofre Chocolato", price: 14100, description: "Cubierto de delicioso chocolate artesanal.", tags: ["vegetariano"] },
          { id: "gof-arequipa", name: "Gofre Arequipa", price: 14600, description: "Bañado en abundante arequipe de la casa.", tags: ["vegetariano"] },
          { id: "gof-choc-blanco", name: "Gofre Chocolate Blanco", price: 14400, description: "Suave chocolate blanco fundido sobre gofre crujiente.", tags: ["vegetariano"] },
          { id: "gof-caramelo", name: "Gofre Caramelo", price: 8400, description: "Toque dorado de salsa de caramelo.", tags: ["vegetariano"] },
          { id: "gof-frutos-bosque", name: "Gofre Frutos del Bosque", price: 14500, description: "Con compota natural de frutos rojos silvestres.", tags: ["vegetariano"] },
          { id: "gof-mantequilla", name: "Gofre Mantequilla y Syrup", price: 9900, description: "Gofre clásico caliente con mantequilla y syrup.", tags: ["vegetariano"] }
        ]
      },
      {
        id: "copas-gourmet-glases",
        name: "Copas, Glazés e Italianos",
        items: [
          {
            id: "cop-limena",
            name: "Copa Limeña",
            price: 16800,
            description: "Helado de Vainilla con salsa de arequipe, frutos del bosque, merengue, copos de guanábana y crema chantilly.",
            isSignature: true,
            image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=700&q=80",
            tags: ["vegetariano"]
          },
          {
            id: "cop-banana-split",
            name: "Banana Split",
            price: 17500,
            description: "Helado de Mora, Fresa, Vainilla, tajadas de banano fresco, crema chantilly, barquillo y salsa de mora y chocolate.",
            image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=700&q=80",
            tags: ["vegetariano", "nueces"]
          },
          {
            id: "cop-tarta-chocolate",
            name: "Tarta de Chocolate y Fudge",
            price: 15500,
            description: "Fusión de helado de Chocolate y Coffee Toffee con fudge de chocolate, en una base de almendras tostadas y crocante italiano.",
            tags: ["vegetariano", "nueces"]
          },
          {
            id: "cop-vainilla-hot-chocolate",
            name: "Vainilla Hot Chocolate",
            price: 14900,
            description: "Helado Old Style, almendras tostadas entre crema chantilly y chocolate caliente con el que le darás gusto a tu gusto.",
            tags: ["vegetariano", "nueces"]
          },
          {
            id: "cop-tiramisu",
            name: "Tiramisú",
            price: 14900,
            description: "Nuestra recreación italiana de helado Old Style, bizcochuelo bañado con coñac, entonado con salsas inglesas, chocolate y de café.",
            image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=700&q=80",
            tags: ["vegetariano"]
          },
          {
            id: "cop-vesubio",
            name: "Vesubio",
            price: 11900,
            description: "Deliciosa combinación italiana de helado de Fresa, Vainilla y Limón, bañado con salsa de uva y crema chantilly.",
            tags: ["vegetariano"]
          },
          {
            id: "cop-capri",
            name: "Capri",
            price: 12200,
            description: "Una suave sensación de helado de Vainilla sobre una crujiente galleta mantequilla, con salsas de arequipe, uva y crema chantilly.",
            tags: ["vegetariano"]
          }
        ]
      },
      {
        id: "delizzia-copas",
        name: "Delizzia y Copas Clásicas",
        items: [
          {
            id: "cop-capricho-maracuya",
            name: "Capricho de Maracuyá",
            price: 15800,
            description: "Helado de Yogurt de Maracuyá con coulis de maracuyá, fresas, melocotones, galleta de mantequilla y el crujiente de la galleta de encaje.",
            tags: ["vegetariano"]
          },
          {
            id: "cop-tentacion",
            name: "Tentación",
            price: 16900,
            description: "Bizcochuelo bañado con un toque de licor que exalta el sabor del helado de Vainilla, Coffee Toffee y Chocolate. Combina sutilmente con salsa de chocolate, nueces y crema chantilly.",
            tags: ["vegetariano", "nueces"]
          },
          {
            id: "cop-festival",
            name: "Festival",
            price: 22900,
            description: "Bizcochuelo acompañado de helados de Mora, Fresa, Melocotón, Limón y Vainilla, con trocitos de banano, fresas frescas, salsa de uva y crema chantilly.",
            tags: ["vegetariano"]
          },
          {
            id: "cop-filosofia-acaramelada",
            name: "Filosofía Acaramelada",
            price: 11900,
            description: "Domo de helado de Vainilla en crocante de macadamias y almendras, las tajadas de banano y la salsa de caramelo, se unen para darle sentido y sabor a la vida.",
            tags: ["vegetariano", "nueces"]
          },
          {
            id: "cop-merengue-glaze",
            name: "Merengue Glazé",
            price: 16500,
            description: "Merengue y helado de Vainilla, juegan con la salsa de chocolate caliente, nueces y crema chantilly para proporcionar solo placer.",
            tags: ["vegetariano", "nueces"]
          },
          {
            id: "cop-melocoton",
            name: "Copa Melocotón",
            price: 15600,
            description: "Helado de Vainilla y Yogurt de Maracuyá con melocotones tajados, coulis de maracuyá, crema chantilly y crujiente galleta de encaje.",
            tags: ["vegetariano"]
          },
          {
            id: "cop-banana-royal",
            name: "Banana Royal",
            price: 14900,
            description: "Alucinante mezcla de helado de Vainilla y Chocolate con tajadas de fresa, banano, salsa de chocolate caliente, crujiente galleta de encaje y crema chantilly.",
            tags: ["vegetariano"]
          },
          {
            id: "cop-suprema",
            name: "Suprema",
            price: 15800,
            description: "Helado de Vainilla y tajaditas de banano entre crema chantilly, bañadas con salsa de chocolate y arequipe, mini cono de galleta y nueces.",
            tags: ["vegetariano", "nueces"]
          },
          {
            id: "cop-dama-blanca",
            name: "Dama Blanca",
            price: 11900,
            description: "Helado de Vainilla y Chocolate acompañado con salsa de chocolate, nueces y crema chantilly.",
            tags: ["vegetariano", "nueces"]
          },
          {
            id: "cop-alaska",
            name: "Alaska",
            price: 15900,
            description: "Profiterol con salsa inglesa, helado de Vainilla y Mora, con salsa de uva y crema chantilly.",
            tags: ["vegetariano"]
          },
          {
            id: "cop-brownie",
            name: "Brownie",
            price: 12900,
            description: "Helado de Vainilla mezclado con trozos de brownie, salsa de caramelo y chocolate.",
            tags: ["vegetariano"]
          },
          {
            id: "cop-dulce-encanto",
            name: "Dulce Encanto",
            price: 15800,
            description: "Bizcochuelo bañado en salsa inglesa y arequipe, con helado Cocado, tartufino de chocolate y crujiente galleta de encaje.",
            tags: ["vegetariano", "nueces"]
          }
        ]
      },
      {
        id: "helados-temporada",
        name: "Helados de Temporada (Tarro 470ml)",
        notice: "Sabores que vuelven para hacerte sonreír. Disponibles únicamente en tarro de 470 ml.",
        items: [
          { id: "hel-dulce-leche", name: "Dulce de Leche 470ml", price: 39000, description: "Helado de Dulce de Leche argentino con stracciatella.", tags: ["vegetariano"] },
          { id: "hel-maracuya-stracciatella", name: "Maracuyá Stracciatella 470ml", price: 28500, description: "Helado de Maracuyá Pasión Tropical. Helado de Maracuyá en agua con trozos de chocolate oscuro y vetas de maracuyá.", tags: ["vegetariano"] },
          { id: "hel-yogurt-guayaba", name: "Yogurt de Guayaba 470ml", price: 22000, description: "Helado de Yogurt con vetas de guayaba.", tags: ["vegetariano"] },
          { id: "hel-vainilla-chocoalmend", name: "Vainilla Chocoalmend 470ml", price: 24000, description: "Helado de Vainilla con almendras tostadas y fudge de chocolate.", tags: ["vegetariano", "nueces"] },
          { id: "hel-lulada", name: "Lulada 470ml", price: 20500, description: "Helado de Lulo en agua.", tags: ["vegano", "vegetariano"] },
          { id: "hel-yogurt-amarenas", name: "Yogurt Griego con Amarenas 470ml", price: 29000, description: "Auténtico Yogurt Griego con cerezas amarenas italianas.", tags: ["vegetariano"] }
        ]
      },
      {
        id: "helados-infantiles",
        name: "Helados Infantiles",
        items: [
          { id: "hel-inf-piggy", name: "Helado Piggy", price: 9800, description: "Figura divertida con helado de Chicle.", tags: ["vegetariano"] },
          { id: "hel-inf-samy", name: "Samy", price: 9800, description: "Pingüino adorable con helado de Vainilla.", tags: ["vegetariano"] }
        ]
      },
      {
        id: "sabores-heladeria",
        name: "Catálogo de Sabores de Helado",
        isFlavorCatalog: true,
        description: "Sabores artesanales preparados diariamente en nuestras plantas:",
        flavors: [
          { name: "Almendra", tags: ["nueces"] },
          { name: "Arequipe", tags: [] },
          { name: "Avellana", tags: ["nueces"] },
          { name: "Brownie", tags: [] },
          { name: "Cheesecake de Limón", tags: [] },
          { name: "Chicle", tags: [] },
          { name: "Choco Rochelle", tags: ["nueces"] },
          { name: "Chocolate", tags: [] },
          { name: "Chocolate sin Azúcar Añadido", tags: ["sin-azucar"] },
          { name: "Cocado", tags: [] },
          { name: "Coffee Toffee", tags: [] },
          { name: "Crocante", tags: ["nueces"] },
          { name: "Dulce Tumaco", tags: [] },
          { name: "Fresa", tags: [] },
          { name: "Fresa sin Azúcar Añadido", tags: ["sin-azucar"] },
          { name: "Galleta", tags: [] },
          { name: "Limón", tags: [] },
          { name: "Maracuyá", tags: [] },
          { name: "Mora", tags: [] },
          { name: "Pistacho", tags: ["nueces"] },
          { name: "Ron con Pasas", tags: [] },
          { name: "Vainilla", tags: [] },
          { name: "Vainilla sin Azúcar Añadido", tags: ["sin-azucar"] },
          { name: "Old Style", tags: [] },
          { name: "Yogurt de Curuba Light", tags: ["light"] },
          { name: "Yogurt de Frutos del Bosque", tags: [] },
          { name: "Yogurt de Maracuyá", tags: [] },
          { name: "Cacao Nibs Crunch (*Leche Vegetal)", tags: ["vegano"] },
          { name: "Limonada de Coco (*Leche Vegetal)", tags: ["vegano"] }
        ]
      }
    ]
  },
  {
    id: "crepes-en-casa",
    title: "Nuestra Magia en tu Cocina",
    subtitle: "Crepes en Casa · Amor por el sabor, amor por lo fresco",
    bannerImage: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80",
    description: "Enamórate de la frescura de nuestros ingredientes, experimenta con los sabores de nuestras recetas. Salsas, masas, sopas y vinagretas listas para que descubras con nosotros a qué sabe la vida.",
    callToAction: {
      title: "¿Dónde puedo comprar las salsas de Crepes en Casa?",
      text: "Pídele a nuestras meseras tus salsas favoritas #CrepesEnCasa y descubre un universo de sabor fácil de preparar.",
      phone: "601 676 7610",
      onlineStoreUrl: "https://domicilios.crepesywaffles.com",
      onlineStoreText: "domicilios.crepesywaffles.com"
    },
    sections: [
      {
        id: "vinagretas-casa",
        name: "Vinagretas (250ml)",
        items: [
          { id: "cas-vin-balsamico", name: "Vinagreta Balsámico 250ml", price: 23300, description: "Perfecta mezcla de vinagre balsámico, aceite de oliva y miel.", tags: ["vegetariano"] },
          { id: "cas-vin-oriental", name: "Vinagreta Oriental 250ml", price: 23300, description: "Mezcla de vinagres, mostaza y un toque agridulce.", tags: ["vegetariano"] },
          { id: "cas-vin-mostaza", name: "Vinagreta Mostaza 250ml", price: 23300, description: "Vinagreta donde la mostaza es protagonista. ¡Úsala para acompañar lo que más te guste!", tags: ["vegetariano"] }
        ]
      },
      {
        id: "sopas-casa",
        name: "Sopas Listas para Calentar (500ml / 1Lt)",
        items: [
          {
            id: "cas-sop-covarachia",
            name: "Sopa Covarachía",
            price: 14900,
            description: "Nuestra tradicional sopa de tomate, maíz y plátano.",
            options: [
              { name: "500ml", price: 14900 },
              { name: "1 Litro", price: 20500 }
            ],
            tags: ["vegetariano", "vegano", "picante"]
          },
          {
            id: "cas-sop-cebolla",
            name: "Sopa de Cebolla",
            price: 16200,
            description: "Clásica receta francesa cocinada con cebollas caramelizadas.",
            options: [
              { name: "500ml", price: 16200 },
              { name: "1 Litro", price: 25000 }
            ],
            tags: []
          },
          {
            id: "cas-sop-espinaca",
            name: "Sopa de Espinaca",
            price: 14900,
            description: "Del huerto a tu hogar. Fresca y reconfortante.",
            options: [
              { name: "500ml", price: 14900 },
              { name: "1 Litro", price: 20500 }
            ],
            tags: ["vegetariano"]
          },
          {
            id: "cas-sop-lentejas",
            name: "Sopa de Lentejas",
            price: 19300,
            description: "Lentejas beluga con champiñones y portobellos.",
            options: [
              { name: "500ml", price: 19300 },
              { name: "1 Litro", price: 32800 }
            ],
            tags: ["vegetariano", "vegano"]
          },
          {
            id: "cas-sop-vida-verdes",
            name: "Sopa Vida en Verdes",
            price: 18000,
            description: "Nutritiva combinación de vegetales verdes seleccionados.",
            options: [
              { name: "500ml", price: 18000 },
              { name: "1 Litro", price: 30000 }
            ],
            tags: ["vegetariano"]
          },
          {
            id: "cas-sop-otono",
            name: "Sopa Soy Otoño",
            price: 15900,
            description: "Vegetales y frijolitos rojos cuarentanos de Montes de María.",
            options: [
              { name: "500ml", price: 15900 },
              { name: "1 Litro", price: 26200 }
            ],
            tags: ["vegano", "vegetariano"]
          }
        ]
      },
      {
        id: "salsas-casa",
        name: "Salsas de Sal (250ml / 500ml / 1Lt)",
        items: [
          {
            id: "cas-sal-hogao",
            name: "Hogao",
            price: 10900,
            description: "Tradicional hogao colombiano.",
            options: [
              { name: "250ml", price: 10900 },
              { name: "500ml", price: 16900 }
            ],
            tags: ["vegano", "vegetariano"]
          },
          {
            id: "cas-sal-pesto",
            name: "Pesto 250ml",
            price: 24000,
            description: "Albahaca fresca, nueces, ajo, queso y aceite de oliva.",
            tags: ["vegetariano", "nueces"]
          },
          {
            id: "cas-sal-curry",
            name: "Salsa Curry",
            price: 24900,
            description: "Cremosa y aromática receta de especias de la India.",
            options: [
              { name: "500ml", price: 24900 },
              { name: "1 Litro", price: 40000 }
            ],
            tags: ["vegetariano"]
          },
          {
            id: "cas-sal-napolitana",
            name: "Salsa Napolitana",
            price: 17900,
            description: "Tomates madurados a fuego lento con albahaca.",
            options: [
              { name: "500ml", price: 17900 },
              { name: "1 Litro", price: 30000 }
            ],
            tags: ["vegano", "vegetariano"]
          },
          {
            id: "cas-sal-casa",
            name: "Salsa de la Casa (Marco Polo)",
            price: 30800,
            description: "Nuestra emblemática salsa con receta secreta de la casa.",
            options: [
              { name: "500ml", price: 30800 },
              { name: "1 Litro", price: 48000 }
            ],
            tags: ["vegetariano"]
          },
          {
            id: "cas-sal-champinones",
            name: "Salsa Champiñones",
            price: 25000,
            description: "Champiñones salteados en salsa cremosa.",
            options: [
              { name: "500ml", price: 25000 },
              { name: "1 Litro", price: 40000 }
            ],
            tags: ["vegetariano"]
          },
          {
            id: "cas-sal-mexicana",
            name: "Salsa Mexicana",
            price: 17900,
            description: "Salsa de jitomates con chile chipotle y especias.",
            options: [
              { name: "500ml", price: 17900 },
              { name: "1 Litro", price: 30000 }
            ],
            tags: ["vegetariano", "picante"]
          },
          {
            id: "cas-sal-parmesana",
            name: "Salsa Parmesana",
            price: 30800,
            description: "Intensa reducción de queso parmesano seleccionado.",
            options: [
              { name: "500ml", price: 30800 },
              { name: "1 Litro", price: 52500 }
            ],
            tags: ["vegetariano"]
          }
        ]
      },
      {
        id: "salsas-proteina-casa",
        name: "Salsas con Proteína (500ml / 1Lt)",
        items: [
          { id: "cas-sp-stroganoff", name: "Salsa Stroganoff 500ml", price: 49900, description: "Julianas de lomo y champiñones en su salsa.", tags: [] },
          { id: "cas-sp-lomito-pimienta", name: "Lomito Pimienta 500ml", price: 56000, description: "Julianas de lomo y pimienta del Putumayo en su salsa.", tags: ["picante"] },
          { id: "cas-sp-pollo", name: "Salsa de Pollo 500ml", price: 38500, description: "Tierna pechuga de pollo en suave salsa blanca.", tags: [] },
          { id: "cas-sp-pollo-thai", name: "Pollo Thai 500ml", price: 38900, description: "Pechuga de pollo, portobellos, curry y maracuyá.", tags: [] },
          { id: "cas-sp-cochinita", name: "Cochinita Pibil 500ml", price: 37900, description: "Carne de cerdo desmechada con adobo cítrico de achiote.", tags: ["picante"] },
          { id: "cas-sp-carne-desmechada", name: "Carne Desmechada 500ml", price: 40000, description: "Carne suave desmechada preparada con hogao de la casa.", tags: [] },
          {
            id: "cas-sp-bolonesa",
            name: "Salsa Boloñesa",
            price: 25700,
            description: "Nuestra clásica receta tradicional de carne y tomate.",
            options: [
              { name: "500ml", price: 25700 },
              { name: "1 Litro", price: 40000 }
            ],
            tags: []
          }
        ]
      },
      {
        id: "sabores-dulces-casa",
        name: "Sabores Dulces (250ml / 500ml)",
        items: [
          {
            id: "cas-dul-arequipe",
            name: "Arequipe de la Casa",
            price: 11800,
            description: "Suave, cremoso y artesanal.",
            options: [
              { name: "250ml", price: 11800 },
              { name: "500ml", price: 20000 }
            ],
            tags: ["vegetariano"]
          },
          {
            id: "cas-dul-frutos-bosque",
            name: "Salsa Frutos del Bosque",
            price: 15800,
            description: "Compota natural de mora, fresa y arándanos silvestres.",
            options: [
              { name: "250ml", price: 15800 },
              { name: "500ml", price: 24700 }
            ],
            tags: ["vegano", "vegetariano"]
          },
          {
            id: "cas-dul-maracuya",
            name: "Coulis de Maracuyá",
            price: 18000,
            description: "Reducción intensa de pulpa de maracuyá natural.",
            options: [
              { name: "250ml", price: 18000 },
              { name: "500ml", price: 24000 }
            ],
            tags: ["vegano", "vegetariano"]
          },
          {
            id: "cas-dul-guayaba",
            name: "Jalea de Guayaba",
            price: 15900,
            description: "Dulce tradicional de guayaba madura.",
            options: [
              { name: "250ml", price: 15900 },
              { name: "500ml", price: 25900 }
            ],
            tags: ["vegano", "vegetariano"]
          }
        ]
      },
      {
        id: "masas-casa",
        name: "Masas Listas para Preparar (500ml)",
        notice: "¡Disfruta nuestras masas listas para preparar pancakes o waffles en casa!",
        items: [
          { id: "cas-mas-waffle", name: "Masa Waffle 500ml", price: 13400, description: "Masa lista para verter en tu wafflera y dorar.", tags: ["vegetariano"] },
          { id: "cas-mas-yuca", name: "Masa de Yuca 500ml", price: 26800, description: "Deliciosa masa de almidón de yuca y queso.", tags: ["vegetariano"] },
          { id: "cas-mas-choclo", name: "Masa de Choclo 500ml", price: 24800, description: "Masa fresca de maíz dulce para waffles o panqueques.", tags: ["vegetariano"] }
        ]
      }
    ]
  }
];

export const SALAD_BAR_CONFIG = {
  title: "Ensalada de la Barra",
  subtitle: "Porque nadie conoce la mezcla mejor que tú",
  price: 18900,
  maxIngredients: 12,
  maxDressings: 2,
  maxComplements: 3,
  ingredients: [
    "Apio",
    "Arveja",
    "Brócoli",
    "Champiñones frescos",
    "Espinaca",
    "Huevo",
    "Lechuga",
    "Maíz desgranado",
    "Mazorca baby",
    "Palmito vegetal del Chocó",
    "Pimentón rojo",
    "Remolacha",
    "Tomate Cherry",
    "Zanahoria en julianas",
    "Arracacha de Cajamarca con perejil y crema",
    "Cebolla encurtida",
    "Ceviche de chontaduro",
    "Ceviche de mango",
    "Verduras encurtidas: cebolla, pimentón y pepino cohombro",
    "Fríjolitos rojos de temporada",
    "Pepinillo agridulce",
    "Quinoa con tomates secos",
    "Trigo kamut",
    "Zukizana: láminas de zucchini y zanahoria con pesto"
  ],
  dressings: [
    "Aceite de Oliva",
    "Salsa Amarilla",
    "Salsa Rosada",
    "Vinagre Mosto de Caña",
    "Vinagreta Verde"
  ],
  complements: [
    "Ajonjolí tostado",
    "Chips de arracacha de Cajamarca",
    "Lentejas crocantes",
    "Semillas de Girasol",
    "Semillas de Soya"
  ]
};

export const DIETARY_TAGS = {
  "vegetariano": { label: "Vegetariano", icon: "🌱", color: "#2d6a4f", bg: "#eef8f2", border: "#b7e4c7" },
  "vegano": { label: "Vegano", icon: "🌿", color: "#1b4332", bg: "#e0f2e9", border: "#95d5b2" },
  "picante": { label: "Ligeramente Picante", icon: "🌶️", color: "#c84b31", bg: "#fdf0ed", border: "#f6b8a8" },
  "nueces": { label: "Contiene Nueces / Maní", icon: "🥜", color: "#8a582b", bg: "#faf3eb", border: "#deb887" },
  "gluten-free-opt": { label: "Opción Masa Vegana / Sin Gluten", icon: "🌾🚫", color: "#6b5b45", bg: "#f6f3ee", border: "#d5c9b9" },
  "mar": { label: "Pescados & Mariscos", icon: "🦐", color: "#1d6984", bg: "#e9f4f8", border: "#a6d4e5" },
  "sin-azucar": { label: "Sin Azúcar Añadido", icon: "✨", color: "#546e7a", bg: "#eceff1", border: "#b0bec5" },
  "light": { label: "Línea Light", icon: "🍃", color: "#377d5d", bg: "#eaf5ef", border: "#a8dab5" },
  "personalizable": { label: "Arma a tu gusto", icon: "🥗", color: "#795548", bg: "#efebe9", border: "#d7ccc8" }
};
