// Theme Toggle
const themeToggle = document.getElementById('themeToggle');

// Check for saved theme, default to dark theme
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Creativity Categories
const categoryCircles = document.querySelectorAll('.category-circle');
const workItems = document.querySelectorAll('.work-item');

categoryCircles.forEach(circle => {
    circle.addEventListener('click', () => {
        const category = circle.getAttribute('data-category');
        
        // Update active circle
        categoryCircles.forEach(c => c.classList.remove('active'));
        circle.classList.add('active');
        
        // Show corresponding work items
        workItems.forEach(item => {
            if (item.classList.contains(category)) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'var(--bg-primary)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--bg-primary)';
        header.style.backdropFilter = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .work-item, .hero-content, .hero-image').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Copy email to clipboard
const mailLink = document.getElementById('mail-link');
if (mailLink) {
    mailLink.addEventListener('click', async (e) => {
        e.preventDefault();
        const email = mailLink.textContent.trim();
        
        try {
            await navigator.clipboard.writeText(email);
        } catch {
            // Fallback для старых браузеров
            const textArea = document.createElement('textarea');
            textArea.value = email;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
            } catch {
                alert('Email: ' + email);
            }
            
            document.body.removeChild(textArea);
        }
    });
}

console.log('Dexitti Portfolio loaded successfully!');