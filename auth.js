document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const messageDiv = document.getElementById('message');

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = signupForm.email.value;
            const password = signupForm.password.value;
            
            messageDiv.textContent = '';

            try {
                const response = await fetch('http://localhost:8000/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    messageDiv.style.color = 'green';
                    messageDiv.textContent = 'Sign up successful! Please check your email to verify your account.';
                } else {
                    messageDiv.style.color = 'red';
                    messageDiv.textContent = data.detail || 'An error occurred.';
                }
            } catch (error) {
                messageDiv.style.color = 'red';
                messageDiv.textContent = 'Failed to connect to the server.';
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = loginForm.email.value;
            const password = loginForm.password.value;
            
            messageDiv.textContent = '';

            try {
                const response = await fetch('http://localhost:8000/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('access_token', data.access_token);
                    messageDiv.style.color = 'green';
                    messageDiv.textContent = 'Login successful!';
                    // Redirect to a protected page or update the UI
                    window.location.href = '/'; // Redirect to home page
                } else {
                    messageDiv.style.color = 'red';
                    messageDiv.textContent = data.detail || 'Login failed.';
                }
            } catch (error) {
                messageDiv.style.color = 'red';
                messageDiv.textContent = 'Failed to connect to the server.';
            }
        });
    }
});
