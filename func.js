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

// Автоматически включаем светлую тему на мобильных
if (window.innerWidth <= 768 && !localStorage.getItem('theme')) {
    document.documentElement.setAttribute('data-theme', 'light');
}

// Обработчик active в навигации
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Автоматическое переключение активных ссылок при прокрутке
function updateActiveNavLink() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    navLinks.forEach(link => link.classList.remove('active'));
    
    let activeLink;
    if (scrollY < window.innerHeight * 0.4) {
        activeLink = '.nav-link.home';
    } else if (scrollY > documentHeight - windowHeight - 150) {
        activeLink = '.nav-link.contacts';
    } else {
        const artSection = document.getElementById('art');
        const projectsSection = document.getElementById('projects');
        
        if (artSection && projectsSection) {
            const artCenter = artSection.offsetTop + artSection.offsetHeight / 2;
            const projectsCenter = projectsSection.offsetTop + projectsSection.offsetHeight / 2;
            
            activeLink = scrollY < (artCenter + projectsCenter) / 2 
                ? '.nav-link.art' 
                : '.nav-link.projects';
        }
    }
    
    if (activeLink) {
        document.querySelector(activeLink).classList.add('active');
    }
}
window.addEventListener('scroll', updateActiveNavLink);
updateActiveNavLink(); // Вызываем сразу при загрузке

// Header scroll background
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        header.classList.toggle('is-scrolled', window.scrollY > 50); // toggle(добавляет класс, при условии) 
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