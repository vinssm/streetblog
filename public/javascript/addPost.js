async function newFormHandler(event) {
    event.preventDefault();
    
    const title = document.querySelector('#title').value;
    const image_url = document.querySelector('#image_url').value;
    const ingredients = document.querySelector('#ingredients').value;
    const description = document.querySelector('#description').value;
    const category = document.querySelector('#category').value;

    const response = await fetch(`/api/recipes`, {
      method: 'POST',
      body: JSON.stringify({
        title, 	      
        ingredients,
        description,
        category,
        image_url
      }),
      headers: {'Content-Type': 'application/json'}
    });
  
    if (response.ok) {
    document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.recipe-form').addEventListener('submit', newFormHandler);
  