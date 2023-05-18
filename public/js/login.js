async function loginFormHandlerEvent(event) {
    event.preventDefault();
  
    const username = document.querySelector('#user-name-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (password && username) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        console.log(response.statusText);
        alert('Failed to log in.');
      }
    }
  }
  
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandlerEvent);