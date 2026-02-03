// Function to handle the counting animation
const startCounters = () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace(/,/g, '');
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc).toLocaleString();
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target.toLocaleString() + "+";
            }
        };
        updateCount();
    });
};

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // If the entry is the stats section, trigger counters
            if (entry.target.classList.contains('stats-section')) {
                startCounters();
            }
        }
    });
}, observerOptions);

// Attach observer to all elements with .reveal class and the stats section
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => observer.observe(el));

    const stats = document.querySelector('.stats-section');
    if (stats) observer.observe(stats);
});

// Mobile Menu Toggle
function toggleMenu() {
    const nav = document.getElementById('navMenu');
    nav.classList.toggle('active');
}