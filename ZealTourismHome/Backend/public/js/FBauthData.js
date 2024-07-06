// fetchUserData
document.addEventListener('DOMContentLoaded', async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get('http://localhost:5000/login/facebook/success');
      const data = response.data;
      if (response.status === 200) {
        document.getElementById('user-pic').innerHTML = `<img src="${data.user.image}" />`;
        document.getElementById('user-name').innerText = data.user.displayName;
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  });
  