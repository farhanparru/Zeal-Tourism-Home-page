document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submitEmailBtn');
  
    submitButton.addEventListener('click', async () => {
      const emailInput = document.getElementById('new');
      const email = emailInput.value;
     
  
      if (!email) {
        document.querySelector('.invalidmessage').style.display = 'block';
        return;
      } else {
        document.querySelector('.invalidmessage').style.display = 'none';
      }
  
      try {
        const response = await axios.post('http://localhost:5000/api/user/forgotpassword', { email });
  
        if (response.status === 200) {
          alert('Reset password email sent successfully. Please check your email.');
        } else {
          alert('Error sending email: ' + response.data);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error sending email. Please try again later.');
      }
    });
  });
  