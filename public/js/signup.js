async function signUpHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (password && username) {
      const response = await fetch('/api/users', {
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
        alert(result.errors[0].message);
      }
    } else {
      alert('Please provide username and password');
    }
  }
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signUpHandler);
  