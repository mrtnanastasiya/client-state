document.addEventListener('DOMContentLoaded', function() {
  var signinForm = document.querySelector('.signin');
  signinForm.classList.add('signin_active');
  
  var welcomeElement = document.getElementById('welcome');
  var userIdElement = document.getElementById('user_id');
  var userId = localStorage.getItem('userId');
  
  if(userId) {
    userIdElement.textContent = userId;
    welcomeElement.classList.add('welcome_active');
  }
});

document.getElementById('signin__btn').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default form submission

  var login = document.querySelector('[name="login"]').value;
  var password = document.querySelector('[name="password"]').value;

  var xhr = new XMLHttpRequest();
  var url = 'https://students.netoservices.ru/nestjs-backend/auth';
  xhr.open('POST', url, true);
  //xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log(response)

        if (response.success) {
          localStorage.setItem('userId', response.user_id);

          var welcomeElement = document.getElementById('welcome');
          var userIdElement = document.getElementById('user_id');
          
          userIdElement.textContent = response.user_id;
          welcomeElement.classList.add('welcome_active');
        } else {
          console.error('Неверный логин/пароль');
        }
      } else {
        var errorResponse = JSON.parse(xhr.responseText);
        var errorMessage = errorResponse.error || 'Произошла ошибка на сервере';
        console.error('Произошла ошибка: ' + errorMessage);
      }
    }
  };

  var data = JSON.stringify({ login: login, password: password });
  xhr.send(data);
  console.log(data)
});