// fetchUserData
document.addEventListener('DOMContentLoaded', async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get('http://localhost:5000/login/facebook/success');
      const data = response.data;
      console.log(data);  // Log the data for debugging
    
     
      if (response.status === 200) {
        document.getElementById('user-pic').innerHTML = `<img src="${data.user.image}" alt="User Picture" />`;
        document.getElementById('user-name').innerText = data.user.displayName;
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  });
  