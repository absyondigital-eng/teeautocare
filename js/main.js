'use strict';

// ===== DESIGN EXAMPLES =====
const DESIGNS = [
    {
        id: 1,
        name: 'Blue Racing',
        tag: 'Most Popular',
        tagColor: 'bg-brand',
        image: 'images/focus-blue-racing.jpg',
        description: 'Bold blue racing-inspired design. Great for names, numbers, and anything with a sporty edge.',
        from: 41.99,
    },
    {
        id: 2,
        name: 'Blue Piping',
        tag: 'On Sale',
        tagColor: 'bg-brand',
        image: 'images/focus-blue-piping.jpg',
        description: 'Sleek blue piping on a dark base. Clean and modern, works well with any personalisation.',
        from: 41.99,
    },
    {
        id: 3,
        name: 'White Piping',
        tag: 'On Sale',
        tagColor: 'bg-brand',
        image: 'images/focus-white-piping.jpg',
        description: 'Sharp white piping on black. Understated but stylish. Popular for names and monograms.',
        from: 41.99,
    },
    {
        id: 4,
        name: 'Red Quilted Piping',
        tag: 'On Sale',
        tagColor: 'bg-brand',
        image: 'images/focus-red-quilted.jpg',
        description: 'Quilted finish with vibrant red piping. Stands out. Brilliant for logos and bold text.',
        from: 41.99,
    },
    {
        id: 5,
        name: 'Blue Quilted Piping',
        tag: 'On Sale',
        tagColor: 'bg-brand',
        image: 'images/focus-blue-quilted.jpg',
        description: 'Premium quilted look with blue piping. Refined and sporty at the same time.',
        from: 42.98,
    },
];

// ===== RENDER DESIGNS =====
function renderDesigns() {
    const grid = document.getElementById('designGrid');
    if (!grid) return;

    grid.innerHTML = DESIGNS.map((d, i) => {
        const tag = d.tag
            ? '<span style="background:#dc2626;color:#fff;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;padding:3px 10px;border-radius:999px;position:absolute;top:12px;left:12px;">' + d.tag + '</span>'
            : '';
        return '<div class="product-card rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.14]" style="background:#1c1c1c;">'
            + '<div class="product-img-wrap relative" style="aspect-ratio:4/3;background:#242424;">'
            + '<img src="' + d.image + '" alt="' + d.name + '" class="w-full h-full object-cover" loading="' + (i < 2 ? 'eager' : 'lazy') + '">'
            + tag
            + '<div class="product-actions absolute inset-x-3 bottom-3">'
            + '<button onclick="openEnquiry(\'' + d.name + '\')" style="width:100%;background:#dc2626;color:#fff;font-size:12px;font-weight:600;padding:10px;border-radius:12px;border:none;cursor:pointer;">Personalise This Design</button>'
            + '</div>'
            + '</div>'
            + '<div style="padding:20px;">'
            + '<h3 style="font-weight:700;margin-bottom:6px;">' + d.name + '</h3>'
            + '<p style="color:rgba(255,255,255,0.45);font-size:12px;line-height:1.6;margin-bottom:12px;">' + d.description + '</p>'
            + '<div style="display:flex;align-items:center;justify-content:space-between;">'
            + '<span style="font-size:13px;color:rgba(255,255,255,0.4);">From <strong style="color:#fff;">£' + d.from.toFixed(2) + '</strong></span>'
            + '<button onclick="openEnquiry(\'' + d.name + '\')" style="font-size:12px;color:#dc2626;background:none;border:none;cursor:pointer;font-weight:500;">Order this &rarr;</button>'
            + '</div>'
            + '</div>'
            + '</div>';
    }).join('');
}

// ===== ENQUIRY MODAL =====
function openEnquiry(designName) {
    const modal = document.getElementById('enquiryModal');
    const title = document.getElementById('enquiryTitle');
    const designInput = document.getElementById('enquiryDesign');

    if (title) title.textContent = `Interested in ${designName}?`;
    if (designInput) designInput.value = designName;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeEnquiry() {
    const modal = document.getElementById('enquiryModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
}

// ===== TOAST =====
function showToast(html, duration = 3500) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
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
    let timer;

    function goTo(index) {
        slides[current].classList.remove('active');
        dots[current]?.classList.remove('active');
        current = ((index % slides.length) + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current]?.classList.add('active');
    }

    function startAuto() { timer = setInterval(() => goTo(current + 1), 5500); }
    function resetAuto() { clearInterval(timer); startAuto(); }

    document.querySelector('.hero-prev')?.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
    document.querySelector('.hero-next')?.addEventListener('click', () => { goTo(current + 1); resetAuto(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); resetAuto(); }));
    startAuto();
}

// ===== COUNTDOWN =====
function initCountdown() {
    const target = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const pad = n => String(n).padStart(2, '0');

    function tick() {
        const diff = target - Date.now();
        if (diff <= 0) return;
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
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
    // Close mobile menu when a link is clicked
    menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            menu.classList.add('hidden');
            btn.querySelector('i').className = 'fas fa-bars text-sm';
        });
    });
}

// ===== FORMS =====
function initForms() {
    // Main order form
    const orderForm = document.getElementById('orderForm');
    const orderSuccess = document.getElementById('orderSuccess');
    orderForm?.addEventListener('submit', e => {
        e.preventDefault();
        orderForm.classList.add('hidden');
        orderSuccess?.classList.remove('hidden');
        showToast('<i class="fas fa-check-circle text-green-400"></i> <span>Request sent. We\'ll be in touch shortly!</span>');
    });

    // Enquiry form (modal)
    const enquiryForm = document.getElementById('enquiryForm');
    enquiryForm?.addEventListener('submit', e => {
        e.preventDefault();
        closeEnquiry();
        showToast('<i class="fas fa-check-circle text-green-400"></i> <span>Enquiry sent. We\'ll get back to you soon.</span>');
        enquiryForm.reset();
    });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    renderDesigns();
    initHeroSlider();
    initCountdown();
    initMobileMenu();
    initForms();

    // Enquiry modal
    document.getElementById('enquiryClose')?.addEventListener('click', closeEnquiry);
    document.getElementById('enquiryBackdrop')?.addEventListener('click', closeEnquiry);

    // Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeEnquiry();
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
