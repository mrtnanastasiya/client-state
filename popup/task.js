// Функция для установки cookie
function setCookie(name, value, days) {
    const expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
    console.log(document.cookie);
}

// Функция для получения cookie по имени
function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Проверяем, было ли окно закрыто до этого
if (!getCookie('modalClosed')) {
    const modalActive = document.querySelector('.modal');
    if (modalActive) {
        modalActive.classList.add('modal_active');

        // Обработчик для кнопки "Закрыть"
        document.addEventListener('click', function(event) {
            if (event.target.classList.contains('modal__close')) {
                const modal = event.target.closest('.modal');
                if (modal) {
                    modal.classList.remove('modal_active');
                    setCookie('modalClosed', 'true', 30); // Сохраняем информацию о закрытии на 30 дней
                }
            }
        });
    }
}
