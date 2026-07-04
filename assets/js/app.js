document.addEventListener('DOMContentLoaded', function () {
  lucide.createIcons();

  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(function () { target.scrollIntoView({ behavior: 'auto' }); }, 0);
    }
  }

  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function () {
      const isHidden = mobileMenu.classList.toggle('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', String(!isHidden));
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  initVehicleGrid();
  initVehicleModal();
});

let allVehicles = [];

function initVehicleGrid() {
  const grid = document.getElementById('vehicle-grid');
  const loading = document.getElementById('vehicle-loading');
  const empty = document.getElementById('vehicle-empty');
  const brandFilter = document.getElementById('brand-filter');
  const sortPrice = document.getElementById('sort-price');

  if (!grid) return;

  function loadVehicles() {
    fetch('data/vehicles.json')
    .then(function (res) {
      if (!res.ok) throw new Error('Fahrzeugdaten konnten nicht geladen werden');
      return res.json();
    })
    .then(function (data) {
      const vehicles = data && Array.isArray(data.vehicles) ? data.vehicles : [];
      allVehicles = vehicles;

      if (loading) loading.remove();

      populateBrandFilter(vehicles);
      renderVehicleGrid(vehicles);

      if (brandFilter) {
        brandFilter.addEventListener('change', function () {
          applyFiltersAndSort();
        });
      }
      if (sortPrice) {
        sortPrice.addEventListener('change', function () {
          applyFiltersAndSort();
        });
      }
    })
    .catch(function (err) {
      console.error('Fahrzeugdaten Fehler:', err);
      if (loading) loading.textContent = 'Fahrzeuge konnten nicht geladen werden.';
      if (empty) empty.classList.remove('hidden');
    });
  }

  loadVehicles();
}

function applyFiltersAndSort() {
  const brandFilter = document.getElementById('brand-filter');
  const sortPrice = document.getElementById('sort-price');
  let list = allVehicles.slice();

  const selectedBrand = brandFilter ? brandFilter.value : '';
  if (selectedBrand) {
    list = list.filter(function (v) { return v.brand === selectedBrand; });
  }

  const sortValue = sortPrice ? sortPrice.value : 'default';
  if (sortValue === 'price-asc') {
    list.sort(function (a, b) { return a.price_eur - b.price_eur; });
  } else if (sortValue === 'price-desc') {
    list.sort(function (a, b) { return b.price_eur - a.price_eur; });
  }

  renderVehicleGrid(list);
}

function populateBrandFilter(vehicles) {
  const brandFilter = document.getElementById('brand-filter');
  if (!brandFilter) return;

  const brands = Array.from(new Set(vehicles.map(function (v) { return v.brand; }))).sort();
  brands.forEach(function (brand) {
    const option = document.createElement('option');
    option.value = brand;
    option.textContent = brand;
    brandFilter.appendChild(option);
  });
}

function formatPrice(value) {
  if (value === 0) return 'Verkauft';
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
}

function formatKm(value) {
  return new Intl.NumberFormat('de-DE').format(value) + ' km';
}

function placeholderImage(vehicle) {
  const text = encodeURIComponent((vehicle.brand || '') + ' ' + (vehicle.model || ''));
  return 'https://placehold.co/600x400/1e3a5f/ffffff?text=' + text;
}

function renderVehicleGrid(vehicles) {
  const grid = document.getElementById('vehicle-grid');
  const empty = document.getElementById('vehicle-empty');
  if (!grid) return;

  grid.innerHTML = '';

  if (vehicles.length === 0) {
    if (empty) empty.classList.remove('hidden');
    return;
  }
  if (empty) empty.classList.add('hidden');

  vehicles.forEach(function (vehicle) {
    const isSold = vehicle.status === 'sold';
    const imgUrl = vehicle.main_image || placeholderImage(vehicle);
    const card = document.createElement('article');
    card.className = 'group bg-white rounded-2xl border border-[var(--color-border)] shadow-sm hover:shadow-lg transition overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]';
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', vehicle.brand + ' ' + vehicle.model + ' – ' + (isSold ? 'Verkauft' : formatPrice(vehicle.price_eur)));
    card.dataset.id = vehicle.id;

    card.innerHTML =
      '<div class="relative aspect-[3/2] overflow-hidden bg-[var(--color-bg)]">' +
        '<img src="' + imgUrl + '" alt="' + escapeHtml(vehicle.brand + ' ' + vehicle.model) + '" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" loading="lazy">' +
        (isSold ? '<span class="absolute top-3 left-3 px-3 py-1 bg-[var(--color-text)]/90 text-white text-xs font-semibold rounded-full">Verkauft</span>' : '') +
      '</div>' +
      '<div class="p-5">' +
        '<div class="flex items-start justify-between gap-2 mb-2">' +
          '<h3 class="text-lg font-bold text-[var(--color-primary)] leading-tight">' + escapeHtml(vehicle.brand + ' ' + vehicle.model) + '</h3>' +
          '<span class="text-sm font-semibold text-[var(--color-accent)] whitespace-nowrap">' + (isSold ? 'Verkauft' : formatPrice(vehicle.price_eur)) + '</span>' +
        '</div>' +
        '<div class="flex flex-wrap gap-2 text-sm text-[var(--color-text-light)]">' +
          '<span class="inline-flex items-center gap-1"><i data-lucide="calendar" class="w-4 h-4"></i>' + escapeHtml(String(vehicle.year)) + '</span>' +
          '<span class="inline-flex items-center gap-1"><i data-lucide="gauge" class="w-4 h-4"></i>' + formatKm(vehicle.mileage_km) + '</span>' +
          '<span class="inline-flex items-center gap-1"><i data-lucide="fuel" class="w-4 h-4"></i>' + escapeHtml(vehicle.fuel) + '</span>' +
        '</div>' +
      '</div>';

    card.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      openVehicleModal(vehicle);
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openVehicleModal(vehicle);
      }
    });

    grid.appendChild(card);
  });

  lucide.createIcons({ icons: { calendar: true, gauge: true, fuel: true } });
}

let currentModalVehicle = null;
let currentImageIndex = 0;
let focusTrapHandler = null;
let lastFocusedElement = null;

function initVehicleModal() {
  const modal = document.getElementById('vehicle-modal');
  const closeBtn = document.getElementById('modal-close');
  const backdrop = document.getElementById('modal-backdrop');
  const prevBtn = document.getElementById('modal-prev');
  const nextBtn = document.getElementById('modal-next');

  if (!modal) return;

  if (closeBtn) closeBtn.addEventListener('click', closeVehicleModal);
  if (backdrop) backdrop.addEventListener('click', closeVehicleModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeVehicleModal();
    }
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      showModalImage(currentImageIndex - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      showModalImage(currentImageIndex + 1);
    });
  }
}

function openVehicleModal(vehicle) {
  const modal = document.getElementById('vehicle-modal');
  const panel = document.getElementById('modal-panel');
  if (!modal || !panel) return;

  currentModalVehicle = vehicle;
  currentImageIndex = 0;
  lastFocusedElement = document.activeElement;

  document.getElementById('modal-title').textContent = vehicle.brand + ' ' + vehicle.model;
  document.getElementById('modal-subtitle').textContent = vehicle.year + ' · ' + formatKm(vehicle.mileage_km) + ' · ' + vehicle.fuel;
  document.getElementById('modal-description').textContent = vehicle.description || '';
  document.getElementById('modal-price').textContent = vehicle.status === 'sold' ? 'Verkauft' : formatPrice(vehicle.price_eur);

  const specs = [
    { label: 'Marke', value: vehicle.brand },
    { label: 'Modell', value: vehicle.model },
    { label: 'Erstzulassung', value: vehicle.year },
    { label: 'Kilometer', value: formatKm(vehicle.mileage_km) },
    { label: 'Kraftstoff', value: vehicle.fuel },
    { label: 'Leistung', value: vehicle.power_kw + ' kW' },
    { label: 'Getriebe', value: vehicle.transmission },
    { label: 'Farbe', value: vehicle.color }
  ];
  const specsContainer = document.getElementById('modal-specs');
  specsContainer.innerHTML = specs.map(function (spec) {
    return '<dt class="text-[var(--color-text-light)]">' + escapeHtml(spec.label) + '</dt><dd class="font-medium text-[var(--color-text)]">' + escapeHtml(String(spec.value)) + '</dd>';
  }).join('');

  const featuresContainer = document.getElementById('modal-features');
  if (vehicle.features && vehicle.features.length) {
    featuresContainer.innerHTML = vehicle.features.map(function (feature) {
      return '<span class="px-3 py-1 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-full text-xs text-[var(--color-text-light)]">' + escapeHtml(feature) + '</span>';
    }).join('');
  } else {
    featuresContainer.innerHTML = '<span class="text-sm text-[var(--color-text-light)]">Keine Angaben</span>';
  }

  const images = buildImageList(vehicle);
  const hasGallery = images.length > 1;
  document.getElementById('modal-prev').classList.toggle('hidden', !hasGallery);
  document.getElementById('modal-next').classList.toggle('hidden', !hasGallery);
  showModalImage(0, images);

  const cta = document.getElementById('modal-cta');
  if (cta) {
    const message = 'Hallo, ich interessiere mich für das Fahrzeug: ' + vehicle.brand + ' ' + vehicle.model + ' (' + vehicle.year + ')';
    cta.href = 'https://wa.me/491757060349?text=' + encodeURIComponent(message);
  }

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  requestAnimationFrame(function () {
    panel.classList.remove('scale-95', 'opacity-0');
    panel.classList.add('scale-100', 'opacity-100');
  });

  lucide.createIcons();
  setupFocusTrap(modal);
  panel.focus();
}

function buildImageList(vehicle) {
  const images = [];
  if (vehicle.images && vehicle.images.length) {
    images.push.apply(images, vehicle.images);
  }
  if (vehicle.main_image) {
    images.push(vehicle.main_image);
  }
  if (images.length === 0) {
    images.push(placeholderImage(vehicle));
  }
  return images;
}

function showModalImage(index, images) {
  if (!currentModalVehicle) return;
  const list = images || buildImageList(currentModalVehicle);
  const total = list.length;
  currentImageIndex = ((index % total) + total) % total;

  const imgEl = document.getElementById('modal-image');
  imgEl.src = list[currentImageIndex];
  imgEl.alt = currentModalVehicle.brand + ' ' + currentModalVehicle.model + ' – Bild ' + (currentImageIndex + 1);

  const dotsContainer = document.getElementById('modal-dots');
  if (total > 1) {
    dotsContainer.innerHTML = list.map(function (_, i) {
      return '<button type="button" class="w-2 h-2 rounded-full transition ' + (i === currentImageIndex ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border)]') + '" aria-label="Bild ' + (i + 1) + '" data-index="' + i + '"></button>';
    }).join('');
    dotsContainer.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        showModalImage(parseInt(btn.dataset.index, 10), list);
      });
    });
  } else {
    dotsContainer.innerHTML = '';
  }
}

function closeVehicleModal() {
  const modal = document.getElementById('vehicle-modal');
  const panel = document.getElementById('modal-panel');
  if (!modal || !panel) return;

  panel.classList.remove('scale-100', 'opacity-100');
  panel.classList.add('scale-95', 'opacity-0');

  setTimeout(function () {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    if (focusTrapHandler) {
      modal.removeEventListener('keydown', focusTrapHandler);
      focusTrapHandler = null;
    }
    if (lastFocusedElement) {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  }, 150);
}

function setupFocusTrap(modal) {
  if (focusTrapHandler) modal.removeEventListener('keydown', focusTrapHandler);

  focusTrapHandler = function (e) {
    if (e.key !== 'Tab') return;

    const focusable = Array.from(modal.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )).filter(function (el) {
      return el.offsetParent !== null;
    });

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  modal.addEventListener('keydown', focusTrapHandler);
}

function escapeHtml(text) {
  if (text == null) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
