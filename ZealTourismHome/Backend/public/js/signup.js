document.getElementById('signupForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const FirstName = document.getElementById('FirstName').value;
  const countryCode = document.getElementById('CountryCode').value;
  const PhoneNumber = document.getElementById('PhoneNumber').value;
  const password = document.getElementById('password').value;


  try {
    const response = await axios.post('http://localhost:5000/api/user/signup', {
      FirstName,
      PhoneNumber: `${countryCode}${PhoneNumber}`,
      password
    });
 

    if (response.status === 200) {
      alert('Registration successful');
      document.getElementById('signupForm').reset();
    } else {
      alert(`Registration failed: ${response.data.message}`);
    }
  } catch (error) {
    console.error( error);
    alert('Registration failed: Server error');
  }
});
