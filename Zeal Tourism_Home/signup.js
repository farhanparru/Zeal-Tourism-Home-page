document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const firstName = document.getElementById('firstName').value;
    const countryCode = document.getElementById('countryCode').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const password = document.getElementById('newPassword').value;
  
    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        firstName,
        countryCode,
        phoneNumber,
        password
      });
  
      if (response.status === 201) {
        alert('Registration successful');
        document.getElementById('signupForm').reset();
      } else {
        alert(`Registration failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed: Server error');
    }
  });
  