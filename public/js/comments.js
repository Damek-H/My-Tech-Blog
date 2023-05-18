const commentFormHandlerEvent = async function (event) {
    event.preventDefault();
  
    const blogId = document.querySelector('input[name="blog-id"]').value;
  
    const commentContent = document.querySelector(
      'textarea[name="comment-body"]'
    ).value;
  
    if (commentContent) {
      await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
          blog_id: blogId,
          comment_description: commentContent,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      document.location.reload();
    }
  };
  
  document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandlerEvent);
  