let generatedOTP = "";

const form = document.querySelector("form");
const usernameInput = document.getElementById("usernameInput");
const emailInput = document.getElementById("emailInput");
const otpInput = document.getElementById("otpInput");
const passwordInput = document.getElementById("passwordInput");
const confirmInput = document.getElementById("confirmPasswordInput");
const sendOtpBtn = document.getElementById("sendOtpBtn");

sendOtpBtn.addEventListener("click", function () {
  const email = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailError = document.getElementById("emailError");
  const otpError = document.getElementById("otpError");


  otpInput.classList.remove("is-invalid");
  otpError.style.display = "none";

  if (!email) {
    emailInput.classList.add("is-invalid");
  emailError.innerText = "Chưa nhập email.";
  emailError.style.display = "block";
  emailInput.focus();
  return;
  }

  if (!emailPattern.test(email)) {
    emailInput.classList.add("is-invalid");
  emailError.innerText = "Email không hợp lệ.";
  emailError.style.display = "block";
    emailInput.focus();
    return;
  }

  // Nếu email hợp lệ thì gửi OTP
  generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
  alert(`Mã OTP của bạn là: ${generatedOTP}`);

  sendOtpBtn.disabled = true;
  let countdown = 5;
  sendOtpBtn.innerText = `Gửi lại (${countdown}s)`;

  const timer = setInterval(() => {
    countdown--;
    sendOtpBtn.innerText = `Gửi lại (${countdown}s)`;

    if (countdown <= 0) {
      clearInterval(timer);
      sendOtpBtn.disabled = false;
      sendOtpBtn.innerText = "Gửi mã OTP";
    }
  }, 1000);
});


form.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirm = confirmInput.value.trim();
  const otpEntered = otpInput.value.trim();

  confirmInput.classList.remove("is-invalid");
  otpInput.classList.remove("is-invalid");
  document.getElementById("otpError").style.display = "none";

  if (otpEntered !== generatedOTP) {
    otpInput.classList.add("is-invalid");
    const otpError = document.getElementById("otpError");
    otpError.innerText = "Mã OTP không đúng.";
    otpError.style.display = "block";
    otpInput.focus();
    return;
  }

  if (password !== confirm) {
    confirmInput.classList.add("is-invalid");
    if (!confirmInput.nextElementSibling || !confirmInput.nextElementSibling.classList.contains("invalid-feedback")) {
      const feedback = document.createElement("div");
      feedback.className = "invalid-feedback";
      feedback.innerText = "Mật khẩu xác nhận không khớp.";
      confirmInput.after(feedback);
    }
    confirmInput.focus();
    return;
  }

  const userData = {
    username: usernameInput.value.trim(),
    email: email,
    password: password
  };
  localStorage.setItem("lunarUser", JSON.stringify(userData));

  const success = document.createElement("div");
  success.className = "modal fade";
  success.id = "registerSuccessModal";
  success.tabIndex = -1;
  success.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Đăng ký thành công!</h5>
          <button class="btn-close" data-bs-dismiss="modal" type="button"></button>
        </div>
        <div class="modal-body text-center">
          <p>Chúc mừng bạn đã đăng ký thành công tài khoản.</p>
          <button class="btn btn-primary" id="redirectLoginBtn">OK</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(success);

  const modal = new bootstrap.Modal(document.getElementById("registerSuccessModal"));
  modal.show();

  document.getElementById("redirectLoginBtn").addEventListener("click", function () {
    window.location.href = "login.html";
  });
});
