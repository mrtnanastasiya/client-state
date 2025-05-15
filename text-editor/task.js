const editor = document.getElementById('editor');
const clearButton = document.getElementById('clearButton');

// Загружаем текст из локального хранилища при загрузке страницы
editor.value = localStorage.getItem('editorText') || '';

// Сохраняем текст в локальное хранилище при изменениях
editor.addEventListener('input', function() {
    localStorage.setItem('editorText', editor.value);
});

// Обработчик кнопки "Очистить содержимое"
clearButton.addEventListener('click', function() {
    editor.value = ''; 
    localStorage.removeItem('editorText'); 
});