document.addEventListener('DOMContentLoaded', async () => {
    const responseMessage = document.getElementById('responseMessage');
    const form = document.getElementById('resetPasswordForm');
  
    const urlParams = window.location.pathname.split('/').slice(2);
    const userId = urlParams[0];
    const token = urlParams[1];

  
    try {
        const response = await axios.get(`http://localhost:5000/api/user/resetpassword/${userId}/${token}`);

      } catch (error) {
    
        if (error.response && error.response.data) {
          responseMessage.innerHTML = `<div style= "color:"red">${error.response.data.message}</div>`;
        } else {
          responseMessage.innerHTML = '<div class="alert alert-danger">Error fetching reset password data.</div>';
        }
        form.style.display = 'block';
      }
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const newPassword = document.getElementById('newPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

  
      if (newPassword !== confirmPassword) {
        responseMessage.innerHTML = '<div class="alert alert-danger">Passwords do not match.</div>';
        return;
      }
  
      try {
        const resetResponse = await axios.post(`http://localhost:5000/api/user/changepassword/${userId}/${token}`, {
          password: newPassword,
          confirmpassword: confirmPassword
        });
    
  
        if (resetResponse.status === 200) {
          responseMessage.innerHTML = '<div class="alert alert-success">Password reset successful.</div>';
          document.getElementById('resetPasswordForm').reset();
          window.location.href = '/Home';
        } else {   
          responseMessage.innerHTML = `<div class="alert alert-danger">Error: ${resetResponse.data.message}</div>`;
        }
      } catch (error) {
         console.log(error);
         
      
      }
    });
  });
