
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const emailInput = form.querySelector("input[type='email']");
  const passwordInput = form.querySelector("input[type='password']");
  const usernameInput = form.querySelector("input[type='text']");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const storedUser = JSON.parse(localStorage.getItem("lunarUser"));

    // Xóa lỗi cũ nếu có
    usernameInput.classList.remove("is-invalid");
    document.querySelectorAll(".invalid-feedback").forEach(el => el.remove());
    emailInput.classList.remove("is-invalid");
    passwordInput.classList.remove("is-invalid");

    
    if (storedUser.username !== usernameInput.value.trim()) {
      const feedback = document.createElement("div");
      feedback.className = "invalid-feedback";
      feedback.innerText = "Sai tên người dùng.";
      usernameInput.classList.add("is-invalid");
      usernameInput.parentElement.appendChild(feedback);
      return;
    }

    if (!storedUser || storedUser.email !== email) {
      const feedback = document.createElement("div");
      feedback.className = "invalid-feedback";
      feedback.innerText = "Email này chưa đăng ký tài khoản.";
      emailInput.classList.add("is-invalid");
      emailInput.parentElement.appendChild(feedback);
      return;
    }

    if (storedUser.password !== password) {
      const feedback = document.createElement("div");
      feedback.className = "invalid-feedback";
      feedback.innerText = "Sai mật khẩu.";
      passwordInput.classList.add("is-invalid");
      passwordInput.parentElement.appendChild(feedback);
      return;
    }

        localStorage.setItem("userLoggedIn", "true");
    localStorage.setItem("loggedUsername", usernameInput.value.trim());
// Hiện popup chào mừng
    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = "welcomeModal";
    modal.tabIndex = -1;
    modal.innerHTML = `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Xin chào!</h5>
            <button class="btn-close" data-bs-dismiss="modal" type="button"></button>
          </div>
          <div class="modal-body text-center">
            <p>Chào mừng bạn trở lại với Lunar Shop 🌙</p>
            <button class="btn btn-success" id="goHomeBtn">OK</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const bsModal = new bootstrap.Modal(document.getElementById("welcomeModal"));
    bsModal.show();

    document.getElementById("goHomeBtn").addEventListener("click", function () {
      window.location.href = "home.html";
    });
  });

  emailInput.addEventListener("input", () => emailInput.classList.remove("is-invalid"));
  passwordInput.addEventListener("input", () => passwordInput.classList.remove("is-invalid"));
});
