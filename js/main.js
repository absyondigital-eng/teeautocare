'use strict';

// ===== PRODUCT DATA =====
const PRODUCTS = [
    {
        id: 33,
        slug: 'focus-blue-racing',
        name: 'FOCUS – Blue Racing',
        category: 'Ford',
        badge: 'Sale',
        badgeColor: 'bg-brand',
        price: 51.99,
        salePrice: 41.99,
        image: 'https://teeautocare.com/assets/uploads/media-uploader/focus-blue-racing-logo1747512507.jpg',
        description: 'Inject racing-inspired style into your Ford Focus interior with the Focus – Blue Racing seat covers. Featuring a bold blue design and sporty accents, these covers combine premium fabric, universal fit, and all-season comfort.',
        features: ['Universal fit', 'All-season comfort', 'Premium fabric', 'Easy installation'],
    },
    {
        id: 37,
        slug: 'focus-blue-piping',
        name: 'FOCUS – Blue Piping',
        category: 'Ford',
        badge: 'On Sale',
        badgeColor: 'bg-brand',
        price: 51.99,
        salePrice: 41.99,
        image: 'https://teeautocare.com/assets/uploads/media-uploader/focus-blue-piping-logo1747676456.jpg',
        description: 'Add a sleek, sporty edge to your car\'s interior with FOCUS seat covers featuring bold blue piping. Built for style and durability, these covers combine premium protection with modern flair.',
        features: ['Bold blue piping', 'Sporty design', 'Durable materials', 'Universal fit'],
    },
    {
        id: 38,
        slug: 'focus-white-piping',
        name: 'FOCUS – White Piping',
        category: 'Ford',
        badge: 'On Sale',
        badgeColor: 'bg-brand',
        price: 51.99,
        salePrice: 41.99,
        image: 'https://teeautocare.com/assets/uploads/media-uploader/focus-white-piping-logo1747676464.jpg',
        description: 'Elevate your car\'s interior with the FOCUS seat covers featuring bold white piping on a sleek black base. Crafted for drivers who appreciate clean design and lasting quality.',
        features: ['White piping on black base', 'UV protection', 'Stain resistant', 'Breathable fabric'],
    },
    {
        id: 39,
        slug: 'focus-red-quilted-piping',
        name: 'FOCUS – Red Quilted Piping',
        category: 'Ford',
        badge: 'On Sale',
        badgeColor: 'bg-brand',
        price: 52.99,
        salePrice: 41.99,
        image: 'https://teeautocare.com/assets/uploads/media-uploader/focus-blue-qulited-logo-21747676456.jpg',
        description: 'Make a bold statement with the FOCUS seat covers featuring vibrant red quilted piping. Designed for drivers who crave standout style and superior protection.',
        features: ['Red quilted piping', 'Premium quilted finish', 'Sporty edge', 'Full protection'],
    },
    {
        id: 40,
        slug: 'focus-blue-quilted-piping',
        name: 'FOCUS – Blue Quilted Piping',
        category: 'Volkswagen',
        badge: 'On Sale',
        badgeColor: 'bg-brand',
        price: 52.99,
        salePrice: 42.98,
        image: 'https://teeautocare.com/assets/uploads/media-uploader/focus-blue-qulited-logo1747676460.jpg',
        description: 'Refresh your ride with FOCUS seat covers featuring cool blue quilted piping. Merging contemporary design with dependable function, these covers offer unmatched comfort and refined sporty appeal.',
        features: ['Blue quilted piping', 'Contemporary design', 'All-seat coverage', 'Premium comfort'],
    },
];

// ===== CART STATE =====
let cart = [];
try {
    cart = JSON.parse(localStorage.getItem('teeCart') || '[]');
} catch (_) {
    cart = [];
}

// ===== RENDER PRODUCTS =====
function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    grid.innerHTML = PRODUCTS.map((p, i) => {
        const discount = Math.round((1 - p.salePrice / p.price) * 100);
        return `
        <div class="product-card bg-d3 rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.12] fade-in-up"
             style="animation-delay: ${i * 0.08}s">
            <div class="product-img-wrap relative aspect-square bg-d4">
                <a href="https://teeautocare.com/product/${p.slug}" target="_blank" rel="noopener">
                    <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover"
                         loading="${i < 2 ? 'eager' : 'lazy'}">
                </a>
                ${p.badge ? `<span class="${p.badgeColor} text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full absolute top-3 left-3">${p.badge}</span>` : ''}
                <div class="product-actions absolute inset-x-3 bottom-3 flex gap-2">
                    <button onclick="addToCart(${p.id})"
                        class="flex-1 bg-brand hover:bg-brand-dark text-white text-xs font-semibold py-2.5 rounded-xl transition-colors">
                        Add to Cart
                    </button>
                    <button onclick="openQuickView(${p.id})"
                        class="w-10 bg-dark/80 hover:bg-dark border border-white/10 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-all backdrop-blur-sm">
                        <i class="fas fa-eye text-xs"></i>
                    </button>
                </div>
            </div>
            <div class="p-4">
                <p class="text-[11px] text-white/30 font-medium mb-1 uppercase tracking-wider">${p.category}</p>
                <h3 class="text-sm font-semibold mb-2.5 line-clamp-1">
                    <a href="https://teeautocare.com/product/${p.slug}" target="_blank" rel="noopener"
                       class="hover:text-brand transition-colors">${p.name}</a>
                </h3>
                <div class="flex items-center gap-2">
                    <span class="text-white font-bold">£${p.salePrice.toFixed(2)}</span>
                    <span class="text-white/25 text-xs line-through">£${p.price.toFixed(2)}</span>
                    <span class="ml-auto text-[11px] font-bold text-brand bg-brand/10 px-2 py-0.5 rounded-full">${discount}% off</span>
                </div>
            </div>
        </div>`;
    }).join('');
}

// ===== CART FUNCTIONS =====
function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    saveCart();
    updateCartUI();
    openCartPanel();
    showToast(`<i class="fas fa-check-circle text-green-400"></i> <span><strong>${product.name}</strong> added to cart</span>`);
}

function changeQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    item.qty = Math.max(0, item.qty + delta);
    if (item.qty === 0) {
        cart = cart.filter(i => i.id !== productId);
    }
    saveCart();
    updateCartUI();
}

function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    saveCart();
    updateCartUI();
}

function saveCart() {
    try {
        localStorage.setItem('teeCart', JSON.stringify(cart));
    } catch (_) {}
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
    const totalPrice = cart.reduce((sum, i) => sum + (i.salePrice * i.qty), 0);

    // Badge
    const badge = document.getElementById('cartBadge');
    if (badge) {
        badge.textContent = totalItems;
        badge.classList.toggle('hidden', totalItems === 0);
    }

    // Count label
    const countEl = document.getElementById('cartCount');
    if (countEl) countEl.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;

    // Total
    const totalEl = document.getElementById('cartTotal');
    if (totalEl) totalEl.textContent = `£${totalPrice.toFixed(2)}`;

    // Items list
    const itemsEl = document.getElementById('cartItems');
    if (!itemsEl) return;

    if (cart.length === 0) {
        itemsEl.innerHTML = `
            <div class="flex flex-col items-center justify-center py-16 text-white/20">
                <i class="fas fa-bag-shopping text-4xl mb-4"></i>
                <p class="text-sm">Your cart is empty</p>
            </div>`;
        return;
    }

    itemsEl.innerHTML = cart.map(item => `
        <div class="flex gap-3 pb-4 mb-4 border-b border-white/[0.05] last:border-0 last:pb-0 last:mb-0">
            <img src="${item.image}" alt="${item.name}"
                 class="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-d3">
            <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold leading-tight truncate pr-6">${item.name}</p>
                <p class="text-xs text-white/35 mt-0.5">£${item.salePrice.toFixed(2)}</p>
                <div class="flex items-center gap-2 mt-2">
                    <button onclick="changeQty(${item.id}, -1)"
                        class="w-7 h-7 bg-white/5 hover:bg-white/10 rounded-lg text-sm flex items-center justify-center text-white/60 hover:text-white transition-all">
                        <i class="fas fa-minus text-[10px]"></i>
                    </button>
                    <span class="text-sm font-semibold w-5 text-center tabular-nums">${item.qty}</span>
                    <button onclick="changeQty(${item.id}, 1)"
                        class="w-7 h-7 bg-white/5 hover:bg-white/10 rounded-lg text-sm flex items-center justify-center text-white/60 hover:text-white transition-all">
                        <i class="fas fa-plus text-[10px]"></i>
                    </button>
                    <span class="ml-auto text-sm font-bold">£${(item.salePrice * item.qty).toFixed(2)}</span>
                </div>
            </div>
            <button onclick="removeFromCart(${item.id})"
                class="absolute text-white/20 hover:text-white/60 transition-colors"
                style="margin-left: auto; position: relative;">
                <i class="fas fa-times text-xs"></i>
            </button>
        </div>
    `).join('');
}

// ===== CART PANEL =====
function openCartPanel() {
    const overlay = document.getElementById('cartOverlay');
    overlay.classList.remove('hidden');
    // Force reflow then add open class for transition
    requestAnimationFrame(() => {
        requestAnimationFrame(() => overlay.classList.add('open'));
    });
    document.body.style.overflow = 'hidden';
}

function closeCartPanel() {
    const overlay = document.getElementById('cartOverlay');
    overlay.classList.remove('open');
    setTimeout(() => {
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
    }, 350);
}

// ===== QUICK VIEW =====
function openQuickView(productId) {
    const p = PRODUCTS.find(pr => pr.id === productId);
    if (!p) return;

    const discount = Math.round((1 - p.salePrice / p.price) * 100);
    const featuresHtml = p.features.map(f =>
        `<li class="flex items-center gap-2 text-sm text-white/55"><i class="fas fa-check text-brand text-xs"></i>${f}</li>`
    ).join('');

    const content = document.getElementById('quickViewContent');
    content.innerHTML = `
        <div class="aspect-square sm:aspect-auto sm:h-auto">
            <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover sm:rounded-l-3xl">
        </div>
        <div class="p-6 sm:p-8 flex flex-col justify-center">
            <span class="inline-block bg-brand/15 border border-brand/30 text-brand text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4 self-start">${p.badge}</span>
            <p class="text-xs text-white/30 font-medium uppercase tracking-wider mb-1">${p.category}</p>
            <h2 class="text-2xl sm:text-3xl font-black mb-3">${p.name}</h2>
            <p class="text-white/50 text-sm leading-relaxed mb-5">${p.description}</p>
            <ul class="space-y-1.5 mb-6">${featuresHtml}</ul>
            <div class="flex items-end gap-3 mb-6">
                <span class="text-3xl font-black">£${p.salePrice.toFixed(2)}</span>
                <span class="text-white/25 line-through text-lg mb-0.5">£${p.price.toFixed(2)}</span>
                <span class="text-brand font-bold text-sm mb-0.5 bg-brand/10 px-2 py-0.5 rounded-full">${discount}% off</span>
            </div>
            <div class="flex gap-3">
                <button onclick="addToCart(${p.id}); closeModal();"
                    class="flex-1 bg-brand hover:bg-brand-dark text-white font-semibold py-3.5 rounded-xl transition-colors">
                    Add to Cart
                </button>
                <a href="https://teeautocare.com/product/${p.slug}" target="_blank" rel="noopener"
                   class="w-12 h-12 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-all" title="View full product">
                    <i class="fas fa-arrow-up-right-from-square text-sm"></i>
                </a>
            </div>
        </div>
    `;

    const modal = document.getElementById('quickViewModal');
    modal.classList.remove('hidden');
    modal.classList.add('open', 'flex');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('quickViewModal');
    modal.classList.add('hidden');
    modal.classList.remove('open', 'flex');
    document.body.style.overflow = '';
}

// ===== TOAST =====
function showToast(html, duration = 3200) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = html;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('exit');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ===== HERO SLIDER =====
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    let current = 0;
    let timer = null;

    function goTo(index) {
        slides[current].classList.remove('active');
        dots[current]?.classList.remove('active');

        current = ((index % slides.length) + slides.length) % slides.length;

        slides[current].classList.add('active');
        dots[current]?.classList.add('active');
    }

    function startAuto() {
        timer = setInterval(() => goTo(current + 1), 5500);
    }

    function resetAuto() {
        clearInterval(timer);
        startAuto();
    }

    document.querySelector('.hero-prev')?.addEventListener('click', () => {
        goTo(current - 1);
        resetAuto();
    });

    document.querySelector('.hero-next')?.addEventListener('click', () => {
        goTo(current + 1);
        resetAuto();
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            goTo(i);
            resetAuto();
        });
    });

    startAuto();
}

// ===== COUNTDOWN =====
function initCountdown() {
    // Sale ends 7 days from page load
    const target = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    function pad(n) { return String(n).padStart(2, '0'); }

    function tick() {
        const diff = target - Date.now();
        if (diff <= 0) return;

        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);

        const set = (id, val) => {
            const el = document.getElementById(id);
            if (el && el.textContent !== val) el.textContent = val;
        };

        set('cDays', pad(d));
        set('cHours', pad(h));
        set('cMins', pad(m));
        set('cSecs', pad(s));
    }

    tick();
    setInterval(tick, 1000);
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuToggle');
    const menu = document.getElementById('mobileMenu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        const open = !menu.classList.contains('hidden');
        menu.classList.toggle('hidden', open);
        btn.querySelector('i').className = open ? 'fas fa-bars text-sm' : 'fas fa-times text-sm';
    });
}

// ===== SEARCH =====
function initSearch() {
    document.getElementById('searchToggle')?.addEventListener('click', () => {
        const bar = document.getElementById('searchBar');
        bar?.classList.toggle('hidden');
        if (!bar?.classList.contains('hidden')) {
            bar.querySelector('input')?.focus();
        }
    });
}

// ===== SCROLL REVEAL =====
function initReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// ===== NEWSLETTER =====
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    const msg = document.getElementById('newsletterMsg');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        msg?.classList.remove('hidden');
        form.reset();
        showToast('<i class="fas fa-check-circle text-green-400"></i> <span>Thanks for subscribing!</span>');
        setTimeout(() => msg?.classList.add('hidden'), 4000);
    });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
    initHeroSlider();
    initCountdown();
    initMobileMenu();
    initSearch();
    initNewsletter();

    // Cart panel controls
    document.getElementById('cartToggle')?.addEventListener('click', openCartPanel);
    document.getElementById('cartCloseBtn')?.addEventListener('click', closeCartPanel);
    document.getElementById('cartBackdrop')?.addEventListener('click', closeCartPanel);
    document.getElementById('continueShopping')?.addEventListener('click', closeCartPanel);

    // Modal controls
    document.getElementById('modalCloseBtn')?.addEventListener('click', closeModal);
    document.getElementById('modalBackdrop')?.addEventListener('click', closeModal);

    // Close modal on Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeModal();
            closeCartPanel();
        }
    });
});
