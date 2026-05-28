function initScrollNavbar() {
    const navbar = document.getElementById('navbar');
    const profileSection = document.querySelector('.profile-section');

    if (!profileSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                navbar.classList.add('visible');
            } else {
                navbar.classList.remove('visible');
            }
        });
    }, { threshold: 0 });

    observer.observe(profileSection);
}
