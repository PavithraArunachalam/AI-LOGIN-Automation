const form = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('username-error');
const passwordError = document.getElementById('password-error');
const formMessage = document.getElementById('form-message');

function clearMessages() {
  usernameError.textContent = '';
  passwordError.textContent = '';
  formMessage.textContent = '';
  formMessage.className = 'form-message';
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  clearMessages();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  let isValid = true;

  if (!username) {
    usernameError.textContent = 'Username is required';
    isValid = false;
  }

  if (!password) {
    passwordError.textContent = 'Password is required';
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  if (username === 'demo.user' && password === 'Pass123!') {
    formMessage.textContent = 'Login successful';
    formMessage.classList.add('success');
  } else {
    formMessage.textContent = 'Invalid username or password';
    formMessage.classList.add('failure');
  }
});