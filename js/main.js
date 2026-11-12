/**
 * Servi Maxs - LÓGICA E INTERACTIVIDAD JAVASCRIPT
 * Control de animaciones, responsive drawer, filtros, formulario inteligente y WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  // Constantes y elementos del DOM
  const headerNav = document.querySelector('.header-nav');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileDrawerLinks = document.querySelectorAll('.mobile-drawer-link');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const faqItems = document.querySelectorAll('.faq-item');
  const contactForm = document.getElementById('quotationForm');
  const modalBackdrop = document.getElementById('successModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalOkBtn = document.getElementById('modalOkBtn');
  const modalWaActionBtn = document.getElementById('modalWaActionBtn');
  const demoModal = document.getElementById('demoModal');
  const demoModalClose = document.getElementById('demoModalClose');
  const demoTitle = document.getElementById('demoTitle');
  const demoCategory = document.getElementById('demoCategory');
  const demoDescription = document.getElementById('demoDescription');
  const demoFeaturesList = document.getElementById('demoFeaturesList');

  // WhatsApp configuración
  const PHONE_NUMBER = "573113754530"; // Número empresarial sugerido (Colombia)

  /* ==========================================================================
     1. EFECTO DE NAVEGACIÓN STICKY AL HACER SCROLL
     ========================================================================== */
  const handleScroll = () => {
    if (window.scrollY > 40) {
      headerNav.classList.add('scrolled');
    } else {
      headerNav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ==========================================================================
     2. MENÚ MÓVIL (DRAWER LATERAL)
     ========================================================================== */
  const toggleMobileMenu = () => {
    const isOpen = mobileDrawer.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  const openMobileMenu = () => {
    mobileDrawer.classList.add('open');
    mobileToggle.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    mobileDrawer.classList.remove('open');
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
  }

  mobileDrawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Cerrar menú móvil con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobileDrawer.classList.contains('open')) closeMobileMenu();
      if (modalBackdrop.classList.contains('open')) closeModal();
      if (demoModal && demoModal.classList.contains('open')) closeDemoModal();
    }
  });

  /* ==========================================================================
     3. FILTRO INTERACTIVO DE PORTAFOLIO
     ========================================================================== */
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  /* ==========================================================================
     4. PREGUNTAS FRECUENTES (FAQ ACORDEÓN SUAVE)
     ========================================================================== */
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    const answerPane = item.querySelector('.faq-answer-pane');

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Cerrar otros elementos abiertos (comportamiento acordeón limpio)
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-question-btn').setAttribute('aria-expanded', 'false');
          otherItem.querySelector('.faq-answer-pane').style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('active');
        questionBtn.setAttribute('aria-expanded', 'false');
        answerPane.style.maxHeight = null;
      } else {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
        answerPane.style.maxHeight = answerPane.scrollHeight + 'px';
      }
    });
  });

  /* ==========================================================================
     5. SELECCIÓN RÁPIDA DE PLANES Y SERVICIOS HACIA EL FORMULARIO
     ========================================================================== */
  const selectPlanButtons = document.querySelectorAll('[data-select-service]');
  const serviceDropdown = document.getElementById('serviceSelect');

  selectPlanButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceName = btn.getAttribute('data-select-service');
      if (serviceDropdown && serviceName) {
        serviceDropdown.value = serviceName;
      }

      const contactSection = document.getElementById('contacto');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        
        // Destacar temporalmente el contenedor del formulario con resplandor azul tecnológico oficial
        const formContainer = document.querySelector('.contact-form-container');
        if (formContainer) {
          formContainer.style.boxShadow = '0 0 45px rgba(59, 130, 246, 0.65)';
          formContainer.style.borderColor = 'var(--blue-electric)';
          setTimeout(() => {
            formContainer.style.boxShadow = '';
            formContainer.style.borderColor = '';
          }, 1800);
        }
      }
    });
  });

  /* ==========================================================================
     6. FORMULARIO INTELIGENTE DE COTIZACIÓN
     ========================================================================== */
  let lastFormData = null;

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Obtener datos del formulario
      const name = document.getElementById('clientName').value.trim();
      const business = document.getElementById('clientBusiness').value.trim();
      const location = document.getElementById('clientLocation').value.trim();
      const email = document.getElementById('clientEmail').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const service = document.getElementById('serviceSelect').value;
      const budget = document.getElementById('clientBudget').value;
      const description = document.getElementById('projectDesc').value.trim();

      // Guardar datos para envío opcional directo a WhatsApp
      lastFormData = {
        name,
        business: business || 'Independiente / Personal',
        location: location || 'No especificada',
        email,
        phone,
        service: service || 'Solución Digital General',
        budget: budget || 'A convenir',
        description: description || 'Sin detalles adicionales'
      };

      // Abrir modal de confirmación con el mensaje oficial
      openModal();

      // Resetear campos
      contactForm.reset();
    });
  }

  // Control del modal de éxito
  const openModal = () => {
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOkBtn) modalOkBtn.addEventListener('click', closeModal);

  // Cerrar al hacer clic fuera de la tarjeta
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  // Botón para reenviar la cotización directamente por WhatsApp
  if (modalWaActionBtn) {
    modalWaActionBtn.addEventListener('click', () => {
      if (!lastFormData) return;
      const waText = `¡Hola Servi Maxs! 👋%0A%0A` +
        `Mi nombre es *${encodeURIComponent(lastFormData.name)}* y represento a *${encodeURIComponent(lastFormData.business)}* (${encodeURIComponent(lastFormData.location)}).%0A%0A` +
        `Estoy interesado en cotizar: *${encodeURIComponent(lastFormData.service)}*%0A` +
        `Presupuesto estimado: ${encodeURIComponent(lastFormData.budget)}%0A%0A` +
        `*Descripción de mi requerimiento:*%0A${encodeURIComponent(lastFormData.description)}%0A%0A` +
        `Quedo atento a su asesoría. ¡Gracias!`;

      window.open(`https://wa.me/${PHONE_NUMBER}?text=${waText}`, '_blank');
      closeModal();
    });
  }

  /* ==========================================================================
     7. MODAL DE DEMOSTRACIÓN DE PROYECTOS DEL PORTAFOLIO
     ========================================================================== */
  const demoData = {
    'restaurante': {
      title: 'Portal Web Gastronómico & Menú Digital',
      category: 'Página Web Interactiva',
      description: 'Diseño responsive de alto impacto visual para restaurantes y empresas de servicios gastronómicos. Permite explorar platillos en alta definición, consultar horarios, ubicación y realizar pedidos directos vía WhatsApp.',
      features: ['Menú digital interactivo por categorías', 'Botón directo de reservas a WhatsApp', 'Ubicación con Google Maps integrado', 'Carga ultra rápida optimizada para celulares']
    },
    'inventario': {
      title: 'Sistema de Inventarios y Ventas en la Nube',
      category: 'Software & Paneles Administrativos',
      description: 'Herramienta integral para sustituir hojas de cálculo manuales. Monitoreo en tiempo real del stock de productos, alertas automáticas de agotamiento, registro de compras/ventas y reportes exportables.',
      features: ['Control multi-almacén y stock mínimo', 'Módulo de facturación rápida', 'Reportes de ganancias y ventas diarias', 'Acceso seguro multi-usuario con roles']
    },
    'tienda': {
      title: 'Tienda Virtual & Catálogo E-Commerce',
      category: 'Comercio Electrónico',
      description: 'Plataforma para exhibir productos, gestionar variantes (tallas, colores) y procesar pedidos en línea. Integra catálogo autogestionable y opciones flexibles de pago y despacho.',
      features: ['Carrito de compras dinámico y moderno', 'Integración con pasarelas de pago y PSE', 'Formulario optimizado de checkout móvil', 'Gestión rápida de catálogo y promociones']
    },
    'automatizacion': {
      title: 'Panel SaaS & Automatización con IA',
      category: 'Soluciones a Medida & Automatización',
      description: 'Dashboard centralizado que automatiza flujos repetitivos de atención, genera respuestas estructuradas mediante modelos inteligentes y exporta métricas estratégicas para la toma de decisiones.',
      features: ['Automatización de flujos de trabajo', 'Generación de reportes automáticos', 'Asistente de respuestas contextuales con IA', 'Diseño oscuro futurista de alta productividad']
    }
  };

  const demoButtons = document.querySelectorAll('.btn-demo-view');

  demoButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const demoKey = btn.getAttribute('data-demo');
      const item = demoData[demoKey];

      if (item && demoModal) {
        demoTitle.textContent = item.title;
        demoCategory.textContent = item.category;
        demoDescription.textContent = item.description;

        demoFeaturesList.innerHTML = '';
        item.features.forEach(feat => {
          const li = document.createElement('li');
          li.className = 'service-feature-item';
          li.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${feat}`;
          demoFeaturesList.appendChild(li);
        });

        demoModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeDemoModal = () => {
    if (demoModal) {
      demoModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (demoModalClose) demoModalClose.addEventListener('click', closeDemoModal);
  if (demoModal) {
    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) closeDemoModal();
    });
  }

  /* ==========================================================================
     8. ANIMACIÓN SCROLL REVEAL (INTERSECTION OBSERVER)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  /* ==========================================================================
     9. NAVEGACIÓN ACTIVA EN SCROLL
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const bottomBarLinks = document.querySelectorAll('.bottom-bar-item');

  const updateActiveNav = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        bottomBarLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNav, { passive: true });
});
