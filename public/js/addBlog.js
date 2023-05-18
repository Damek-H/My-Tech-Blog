async function addBlogFormHandler(event) {
    event.preventDefault();
    console.log('Hello!');
    const title = document.querySelector('input[name="blog-title"]').value;
    const blogContent = document
      .querySelector('textarea[name="blog-content"]')
      .value.trim();
  
    const response = await fetch(`/api/blog`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        description: blogContent,
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
      alert(response.statusText);
    }
  }
  
  document
    .querySelector('.new-blog-form')
    .addEventListener('submit', addBlogFormHandler);
  