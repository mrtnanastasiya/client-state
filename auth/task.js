document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('signin__form');
  form.classList.add('signin_active');
  
  const welcomeElement = document.getElementById('welcome');
  const userIdElement = document.getElementById('user_id');
  const userId = localStorage.getItem('userId');

  function showWelcomeMessage(userId) {
  userIdElement.textContent = userId;
  welcomeElement.classList.add('welcome_active');
}

  if(userId) {
    showWelcomeMessage(userId);
  }

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  const formData = new FormData(form); 

  const xhr = new XMLHttpRequest();
  const url = 'https://students.netoservices.ru/nestjs-backend/auth';
  xhr.open('POST', url, true);
  //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.responseType = 'json';
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
        const response = xhr.response;
    
        if (response.success) {
              localStorage.setItem('userId', response.user_id)
              showWelcomeMessage(response.user_id);
              form.reset();
              window.location = window.location.href; // Принудительное обновление страницы
      } else {
        alert('Неверный логин/пароль');
      }
    } else {
      console.error('Ошибка: ' + xhr.status);
    }
  };
      
   // Отправляем объект FormData на сервер
  xhr.send(formData);
});

});
