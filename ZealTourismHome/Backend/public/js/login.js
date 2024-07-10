document.addEventListener('DOMContentLoaded', () => {
    const authBtn = document.getElementById('LogIn');
  
   
    const token = localStorage.getItem('token');
    authBtn.textContent = token ? 'Logout' : 'Login';
  
    authBtn.addEventListener('click', () => {
      if (localStorage.getItem('token')) {
      
        localStorage.removeItem('token');

        alert('Logout successful');
        authBtn.textContent = 'Login';
      } else {
        document.getElementById('LogInarea').style.display = 'block';
      }
    });
  
    document.getElementById('Loginform').addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const password = document.getElementById('password').value;
      const email = document.getElementById('Mail').value;
  
      try {
        const response = await axios.post('http://localhost:5000/api/user/login', { password, email });
  
        if (response.status === 200) {
          console.log(response.data);
          alert('Login successful');
          document.getElementById('Loginform').reset();
          localStorage.setItem('token', response.data.token);

          authBtn.textContent = 'Logout';
          window.location.href = '../success.html';
          document.getElementById('LogInarea').style.display = 'none';
        } else {
          alert(`Login failed: ${response.data.message}`);
        }
      } catch (error) {
        console.error(error);
       
      }
    });
  });
  