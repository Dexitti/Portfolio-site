// Размытие фона header'а при прокрутке
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        header.classList.toggle('is-scrolled', window.scrollY > 50); // toggle(добавляет класс, при условии) 
    }
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');

// Проверяем сохраненную тему, по умолчанию dark theme
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

// Плавная прокрутка для якорных ссылок
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

// Композиция profile images
const composition = document.querySelector('.img-composition');
if (composition && composition.offsetParent !== null) {
    const artSets = composition.querySelectorAll('.art-set');
    let currentIndex = 0;
    
    function showArtSet(index) {
        artSets.forEach((set, i) => {
            set.classList.toggle('active', i === index);
        });
    }
    
    setInterval(() => {
        currentIndex = (currentIndex + 1) % artSets.length;
        showArtSet(currentIndex);
    }, 5000);

    showArtSet(0); // Первая default
}

// Карусель изображений
document.querySelectorAll('.circle-mask').forEach(container => {
    const slides = container.querySelectorAll('.carousel-slide');
    const prevBtn = container.querySelector('.carousel-prev');
    const nextBtn = container.querySelector('.carousel-next');
    let currentIndex = 0;
    let interval = null;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function isVisible() {
        const rect = container.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    function updateAutoPlay() {
        if (isVisible() && !interval) {
            interval = setInterval(() => {
                if (isVisible()) {
                    currentIndex = (currentIndex + 1) % slides.length;
                    showSlide(currentIndex);
                } else {
                    clearInterval(interval);
                    interval = null;
                }
            }, 3000);
        }
    }

    function resetTimer() {
        if (interval) {
            clearInterval(interval);
            interval = null;
            setTimeout(updateAutoPlay, 0);
        }
    }

    // Кнопки prev/next
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
        resetTimer();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
        resetTimer();
    });

    // Оптимизированная проверка видимости
    let ticking = false;
    function checkVisibility() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateAutoPlay();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', checkVisibility);
    updateAutoPlay(); // При загрузке
});

// Копирование email в буфер
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