document.getElementById('userForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const lastName = document.getElementById('lastName').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    
    const userData = {
        name: name,
        last_name: lastName,
        password: password,
        email: email
    };
    
    try {
        const response = await fetch('http://localhost:8000/add_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        if (response.ok) {
            alert('User added successfully');
        } else {
            const errorData = await response.json();
            console.log('hello');
            alert(`Failed to add user: ${errorData.message}`);
        }
    } catch (error) {
        alert(`Failed to add user: ${error.message}`);
    }
});

