document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const firstName = document.getElementById('FirstName').value;
    const phoneNumber = document.getElementById('PhoneNumber').value;
    const password = document.getElementById('Password').value;
  
    try {
      const response = await axios.post('http://localhost:5000/api/user/signup', {
        firstName,
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
  