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

    // Вращение линии
    const currentDeg = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--rotation')) || 0;
    document.documentElement.style.setProperty('--rotation', `${currentDeg - 180}deg`);
});

// Обработчик active в навигации
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Header scroll background
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (!header) return;
    if (window.scrollY > 50) {
        header.classList.add('is-scrolled');
    } else {
        header.classList.remove('is-scrolled');
    }
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

// Copy email to clipboard
const mailLink = document.getElementById('mail-link');
if (mailLink) {
    mailLink.addEventListener('click', async (e) => {
        e.preventDefault();
        const email = mailLink.getAttribute('data-email') || mailLink.textContent.trim();
        
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