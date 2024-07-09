document.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();
  const authBtn = document.getElementById('LogIn');
  const loginForm = document.getElementById("Loginform");
  const sendOtpBtn = document.getElementById("sendOtpBtn");
  const emailInput = document.getElementById("Mail");
  const otpInput = document.getElementById("Otp");
  const emailDisplay = document.getElementById("emailDisplay");
  const otpMessage = document.getElementById('otpMessage'); // Add this line
  // Function to handle OTP request

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

  sendOtpBtn.addEventListener("click", async () => {
    const email = emailInput.value;

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/loginotp",
        { email }
      );
      emailDisplay.textContent = email;
      alert(response.data.message);
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    }
  });

  // Function to handle form submission lgoin with OTP

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = document.getElementById("password").value;
    const otp = otpInput.value;

    const loginType = document.querySelector(
      'input[name="customRadio"]:checked'
    ).id;

    try {
      let response;
      if (loginType === "PasswordTry") {
        response = await axios.post("http://localhost:5000/api/user/login", {
          email,
          password,
        });
      } else {
        response = await axios.post(
          "http://localhost:5000/api/user/verifyOpt",
          { email, otp }
        );
      }

      alert(response.data.message);
      if (response.status === 200) {
        console.log(response.data);
          localStorage.setItem('token', response.data.token);
        //  alert('login successfully')
            
        authBtn.textContent = 'Logout';
        document.getElementById('LogInarea').style.display = 'none'; // Set your actual token here
        window.location.href = '../success.html';
      }else{
        otpMessage.textContent = response.data.message; // Display the message
       
        otpMessage.style.display = 'block'; // Show the message container
      }
    } catch (error) {
    
        if (error.response && error.response.data && error.response.data.message) {
            otpMessage.textContent = error.response.data.message; // Display the error message
            otpMessage.style.display = 'block';
        }else{
            alert('Failed to log in. Please try again.');
        }
    }
  });


});


