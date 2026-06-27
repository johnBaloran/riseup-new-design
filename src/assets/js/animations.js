/* Shared custom dropdown utility */
window.closeAllDropdowns = function () {
    document.querySelectorAll('.cs-city-dropdown-panel.cs-open').forEach(function (p) { p.classList.remove('cs-open'); });
    document.querySelectorAll('.cs-city-dropdown-btn[aria-expanded="true"]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
};

window.initCustomDropdown = function (dropdownEl, onSelect) {
    if (!dropdownEl) return;
    var btn = dropdownEl.querySelector('.cs-city-dropdown-btn');
    var panel = dropdownEl.querySelector('.cs-city-dropdown-panel');
    var valueEl = dropdownEl.querySelector('.cs-city-dropdown-value');
    var options = Array.prototype.slice.call(dropdownEl.querySelectorAll('.cs-city-option'));

    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = panel.classList.contains('cs-open');
        window.closeAllDropdowns();
        if (!isOpen) {
            btn.setAttribute('aria-expanded', 'true');
            panel.classList.add('cs-open');
        }
    });

    options.forEach(function (opt) {
        opt.addEventListener('click', function (e) {
            e.stopPropagation();
            options.forEach(function (o) { o.classList.remove('cs-active'); });
            opt.classList.add('cs-active');
            if (valueEl) valueEl.textContent = opt.textContent.trim();
            window.closeAllDropdowns();
            if (onSelect) onSelect(opt.dataset.value || opt.dataset.city || opt.dataset.level, opt.textContent.trim());
        });
    });
};

document.addEventListener('click', function () { window.closeAllDropdowns(); });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') window.closeAllDropdowns(); });

(function () {
    'use strict';

    // Grain texture for league page headers — static, not motion-dependent
    var header = document.getElementById('league-header');
    if (header) {
        var grain = document.createElement('canvas');
        grain.width = 256;
        grain.height = 256;
        var gctx = grain.getContext('2d');
        var img = gctx.createImageData(256, 256);
        for (var i = 0; i < img.data.length; i += 4) {
            var v = Math.random() * 255 | 0;
            img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
            img.data[i + 3] = 255;
        }
        gctx.putImageData(img, 0, 0);
        grain.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;opacity:0.045;pointer-events:none;z-index:0;mix-blend-mode:soft-light;';
        header.insertBefore(grain, header.firstChild);
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var els = document.querySelectorAll('.cs-reveal');
    if (!els.length) return;

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('cs-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

    els.forEach(function (el) { observer.observe(el); });
})();
