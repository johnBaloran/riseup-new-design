(function () {
    'use strict';

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
