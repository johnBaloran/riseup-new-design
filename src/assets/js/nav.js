(function () {
    'use strict';

    var nav = document.getElementById('cs-navigation');
    var hamburger = nav && nav.querySelector('.cs-toggle');
    var menuWrapper = document.getElementById('cs-ul-wrapper');
    var body = document.body;
    var BREAK = 1023.5;

    function isMobile() { return window.innerWidth <= BREAK; }

    /* ---- Scroll: solidify nav after 10px ---- */
    function handleScroll() {
        if (nav) nav.classList.toggle('cs-scrolled', window.scrollY > 10);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    /* ---- Helpers ---- */
    function closeDropdown(dropdown) {
        dropdown.classList.remove('cs-active');
        var btn = dropdown.querySelector('.cs-dropdown-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
    }

    function closeAllDropdowns() {
        if (!nav) return;
        nav.querySelectorAll('.cs-dropdown.cs-active').forEach(closeDropdown);
    }

    function closeMenu() {
        if (!nav) return;
        nav.classList.remove('cs-active');
        if (hamburger) {
            hamburger.classList.remove('cs-active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
        body.classList.remove('cs-open');
        if (menuWrapper && isMobile()) menuWrapper.inert = true;
        closeAllDropdowns();
    }

    /* ---- Hamburger ---- */
    if (hamburger) {
        hamburger.addEventListener('click', function () {
            var isOpen = nav.classList.contains('cs-active');
            if (isOpen) {
                closeMenu();
            } else {
                nav.classList.add('cs-active');
                hamburger.classList.add('cs-active');
                hamburger.setAttribute('aria-expanded', 'true');
                body.classList.add('cs-open');
                if (menuWrapper) menuWrapper.inert = false;
            }
        });
    }

    /* ---- Click backdrop to close ---- */
    if (nav) {
        nav.addEventListener('click', function (e) {
            if (e.target === nav && nav.classList.contains('cs-active')) closeMenu();
        });
    }

    /* ---- Mobile dropdown toggle ---- */
    if (nav) {
        nav.addEventListener('click', function (e) {
            if (!isMobile()) return;
            var btn = e.target.closest('.cs-dropdown-toggle');
            if (!btn) return;
            e.preventDefault();
            var dropdown = btn.closest('.cs-dropdown');
            if (!dropdown) return;
            var isOpen = dropdown.classList.contains('cs-active');
            closeAllDropdowns();
            if (!isOpen) {
                dropdown.classList.add('cs-active');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    }

    /* ---- Desktop hover: inert management ---- */
    if (nav) {
        nav.addEventListener('mouseenter', function (e) {
            if (isMobile()) return;
            var dropdown = e.target.closest('.cs-dropdown');
            if (!dropdown) return;
            var menu = dropdown.querySelector('.cs-drop-ul');
            if (menu) menu.inert = false;
        }, true);

        nav.addEventListener('mouseleave', function (e) {
            if (isMobile()) return;
            var dropdown = e.target.closest('.cs-dropdown');
            if (!dropdown) return;
            setTimeout(function () {
                if (!dropdown.matches(':hover')) {
                    var menu = dropdown.querySelector('.cs-drop-ul');
                    if (menu) menu.inert = true;
                }
            }, 10);
        }, true);
    }

    /* ---- Escape key ---- */
    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape' || !nav) return;
        var openDropdown = nav.querySelector('.cs-dropdown.cs-active');
        if (openDropdown) {
            closeDropdown(openDropdown);
            var btn = openDropdown.querySelector('.cs-dropdown-toggle');
            if (btn) btn.focus();
        } else if (nav.classList.contains('cs-active')) {
            closeMenu();
            if (hamburger) hamburger.focus();
        }
    });

    /* ---- Resize: close mobile menu if going to desktop ---- */
    window.addEventListener('resize', function () {
        if (!isMobile() && nav && nav.classList.contains('cs-active')) closeMenu();
    });

    /* ---- Initial inert state ---- */
    if (menuWrapper && isMobile()) menuWrapper.inert = true;
    if (nav) nav.querySelectorAll('.cs-drop-ul').forEach(function (m) { m.inert = true; });
})();
