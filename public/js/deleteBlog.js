async function deleteHandlerEvent(event) {
    event.preventDefault();
  
    const blogId = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    const response = await fetch(`/api/blog/${blogId}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    console.log(result);
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      console.log(response.statusText);
    }
  }
  
  document
    .querySelector('.delete-blog-button')
    .addEventListener('click', deleteHandlerEvent);
  