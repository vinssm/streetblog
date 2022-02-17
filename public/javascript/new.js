const newFormHandler = async function(event) {
  event.preventDefault();

  const postTitle = document.querySelector('input[name="post-title"]').value;
  const postContent = document.querySelector('textarea[name="post-body"]').value;

  console.log(postTitle);
  console.log(postContent);

  await fetch(`/api/post`, {
    method: 'POST',
    body: JSON.stringify({ postTitle, postContent }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#new-post').addEventListener('submit', newFormHandler);