// Простой отладочный код
console.log('JavaScript подключен!');

// УНИВЕРСАЛЬНАЯ ФУНКЦИЯ ДЛЯ СКРОЛЛА
function handleMenuClick(e) {
    e.preventDefault(); // Отменяем стандартное поведение
    
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        console.log('Скролл к:', targetId);
        
        // УНИВЕРСАЛЬНЫЙ СКРОЛЛ ДЛЯ ВСЕХ УСТРОЙСТВ
        const offsetTop = targetSection.offsetTop - 50;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ПОДКЛЮЧАЕМ СОБЫТИЯ ДЛЯ ВСЕХ ТИПОВ УСТРОЙСТВ
document.querySelectorAll('.fixed-nav .nav-link').forEach(link => {
    // Для десктопов и обычных кликов
    link.addEventListener('click', handleMenuClick);
    
    // Для мобильных устройств (touch events)
    link.addEventListener('touchend', handleMenuClick);
});

// АЛЬТЕРНАТИВНЫЙ ВАРИАНТ - САМЫЙ НАДЕЖНЫЙ
document.querySelectorAll('.fixed-nav .nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // САМЫЙ ПРОСТОЙ И НАДЕЖНЫЙ СПОСОБ
            targetSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        return false;
    });
});

// Подсветка активного пункта меню
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(function() {
            const sections = document.querySelectorAll('section, header');
            const navLinks = document.querySelectorAll('.fixed-nav .nav-link');
            
            let current = '';
            const scrollPos = window.pageYOffset + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
            
            ticking = false;
        });
        ticking = true;
    }
});

// Модальные окна (оставляем без изменений)
document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const modalId = this.getAttribute('data-modal') + '-modal';
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            console.log('Открыто модальное окно:', modalId);
        }
    });
});

// Закрытие модальных окон
document.querySelectorAll('.modal-close').forEach(close => {
    close.addEventListener('click', function() {
        const modal = this.closest('.modal-overlay');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});

// Закрытие по клику вне окна
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});

// Закрытие по ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = '';
    }
});

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена');
    
    // Скрываем все модальные окна при загрузке
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.style.display = 'none';
    });
    
    // Добавляем CSS для улучшения совместимости
    const style = document.createElement('style');
    style.textContent = `
        .fixed-nav .nav-link {
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
        }
    `;
    document.head.appendChild(style);
});