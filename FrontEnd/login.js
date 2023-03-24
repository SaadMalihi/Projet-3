const form = document.querySelector('#login-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = form.elements.email.value;
    const password = form.elements.password.value;
    const errorMessage = document.querySelector('#error-message');
    
    fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    localStorage.setItem('token', data.token);
                    window.location.href = 'index.html';        
                });
            } else {
                errorMessage.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
})