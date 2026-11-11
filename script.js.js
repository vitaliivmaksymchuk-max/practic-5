document.addEventListener('DOMContentLoaded', () => {
    // 1. Індикатор глобального стану (сеансовий таймер)
    // Працює неперервно під час навігації завдяки зберіганню контексту виконання JS
    let secondsElapsed = 0;
    const timerElement = document.getElementById('sessionTimer');
    
    setInterval(() => {
        secondsElapsed++;
        const mins = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
        const secs = String(secondsElapsed % 60).padStart(2, '0');
        timerElement.textContent = `${mins}:${secs}`;
    }, 1000);

    // 2. Логіка клієнтської маршрутизації (SPA Routing)
    const navContainer = document.getElementById('navContainer');
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');

    function switchSection(targetId) {
        // Перемикання видимості секцій без деструктивного знищення DOM
        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.remove('is-hidden');
            } else {
                section.classList.add('is-hidden');
            }
        });

        // Оновлення класів активності в навігаційному меню
        navLinks.forEach(link => {
            if (link.getAttribute('data-target') === targetId) {
                link.classList.add('is-active');
            } else {
                link.classList.remove('is-active');
            }
        });
    }

    // Делегування кліків на навігаційному контейнері (без інлайн-обробників)
    navContainer.addEventListener('click', (event) => {
        const link = event.target.closest('.nav-link');
        if (!link) return;

        event.preventDefault(); // Запобігаємо стандартній поведінці посилань
        const targetId = link.getAttribute('data-target');
        
        // Змінюємо хекш у URL без перезавантаження сторінки
        window.location.hash = targetId;
        switchSection(targetId);
    });

    // Підтримка навігації кнопками браузера "Назад" / "Вперед"
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            switchSection(hash);
        }
    });

    // Початкова ініціалізація за поточним хешем або за замовчуванням
    const initialHash = window.location.hash.substring(1);
    if (initialHash && document.getElementById(initialHash)) {
        switchSection(initialHash);
    }
});