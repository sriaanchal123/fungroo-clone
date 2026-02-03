// 1. Mobile Menu Toggle
function toggleMenu() {
    const nav = document.getElementById('navMenu');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = '70px';
    nav.style.left = '0';
    nav.style.width = '100%';
    nav.style.background = '#fff';
    nav.style.padding = '20px';
}

// 2. Scroll Reveal Animation
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Trigger counter if the stats section is seen
            if (entry.target.classList.contains('stats-section')) {
                startCounters();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
observer.observe(document.querySelector('.stats-section'));

// 3. Stats Counter Logic
function startCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace(/,/g, '');
        const increment = target / 50; // Speed of counting

        const updateCount = () => {
            const current = +counter.innerText.replace(/,/g, '');
            if (current < target) {
                counter.innerText = Math.ceil(current + increment).toLocaleString();
                setTimeout(updateCount, 30);
            } else {
                counter.innerText = target.toLocaleString() + "+";
            }
        };
        updateCount();
    });
}