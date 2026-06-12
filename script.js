// Custom Cursor Logic
const dot = document.querySelector("[data-cursor-dot]");
const outline = document.querySelector("[data-cursor-outline]");

// Ensure cursor exists on desktop
if(window.innerWidth > 768 && dot && outline) {
    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        dot.style.left = `${posX}px`;
        dot.style.top = `${posY}px`;

        // Add slight delay to outline for trailing effect
        outline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });
}

// Spotlight Effect on Cards
const cards = document.querySelectorAll('.spotlight-card');

cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Intersection Observer for Scroll Animations & Counters
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger counter animation if it has counters inside
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                if(!counter.classList.contains('counted')) {
                    animateCounter(counter);
                    counter.classList.add('counted');
                }
            });

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Counter Animation Function
function animateCounter(counter) {
    const target = parseFloat(counter.getAttribute('data-target'));
    const duration = 2000; // ms
    const stepTime = 20; 
    const steps = duration / stepTime;
    const increment = target / steps;
    
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.innerText = target;
            clearInterval(timer);
        } else {
            // Keep decimals based on target
            if(target % 1 !== 0) {
                counter.innerText = current.toFixed(2).replace(/\.00$/, ''); // roughly 2 decimals
            } else {
                counter.innerText = Math.floor(current);
            }
        }
    }, stepTime);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
