document.addEventListener('DOMContentLoaded', async () => {
  const authBtn = document.getElementById('LogIn');

  const googleToken = localStorage.getItem('googleAccessToken');
  authBtn.textContent = googleToken ? 'Logout' : 'Login';

  authBtn.addEventListener('click', () => {
    if (localStorage.getItem('googleAccessToken')) {

      localStorage.removeItem('googleAccessToken');

      alert('Logout successful');

      authBtn.textContent = 'Login';
    } else {
      document.getElementById('LogInarea').style.display = 'block';
    }
  });

  try {
    const response = await axios.get('http://localhost:5000/login/google/success');
    if (response.status === 200) {
      const data = response.data;
      
      localStorage.setItem('googleAccessToken', data.accessToken);

      document.getElementById('user-pic').innerHTML = `<img src="${data.user.image}" alt="User Picture" />`;

      document.getElementById('user-name').innerText = data.user.displayName;
      
      authBtn.textContent = 'Logout';
    } else {
      console.error(response.data.message);
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
});
