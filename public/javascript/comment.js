const postId = document.querySelector('input[name="post-id"]').value;

const commentFormHandler = async (event) => {
  event.preventDefault();

  const commentContent = document.querySelector('textarea[name="comment-body"]').value.trim();
  const recipeId = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1,
   console.log(commentContent)];

  if(commentContent) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        recipeId,
        commentContent
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  };
}

document.querySelector('#comment-form').addEventListener('submit', commentFormHandler);
