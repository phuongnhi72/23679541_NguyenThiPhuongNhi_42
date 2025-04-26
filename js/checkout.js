document.addEventListener("DOMContentLoaded", function () {
  const bankDetails = document.getElementById("bankDetails");
  const checkoutForm = document.getElementById("checkoutForm");

  document.querySelectorAll("input[name='paymentMethod']").forEach(input => {
    input.addEventListener("change", () => {
      bankDetails.style.display = input.value === "ATM" ? "block" : "none";
    });
  });

  checkoutForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const method = document.querySelector("input[name='paymentMethod']:checked").value;
    const bankName = document.getElementById("bankName").value.trim();
    const bankNumber = document.getElementById("bankNumber").value.trim();
    const bankHolder = document.getElementById("bankHolder").value.trim();

    const nameValid = /^\p{Lu}\p{Ll}+(\s\p{Lu}\p{Ll}+)+$/u.test(name);
    const phoneValid = /^(0[3-9])[0-9]{8}$/.test(phone);
    const addressValid = address.length >= 10;
    const bankNameValid = method === "ATM" ? bankName.length >= 2 : true;
    const bankNumberValid = method === "ATM" ? /^\d{8,}$/.test(bankNumber) : true;
    const bankHolderValid = method === "ATM" ? /^([A-Z]+\s){1,}[A-Z]+$/.test(bankHolder) : true;

    if (!nameValid) return alert("❌ Họ tên phải từ 2 từ trở lên, viết hoa chữ cái đầu.");
    if (!phoneValid) return alert("❌ Số điện thoại phải gồm 10 số và bắt đầu từ 03–09.");
    if (!addressValid) return alert("❌ Địa chỉ giao hàng phải tối thiểu 10 ký tự.");
    if (!bankNameValid) return alert("❌ Tên ngân hàng tối thiểu 2 ký tự.");
    if (!bankNumberValid) return alert("❌ Số tài khoản phải có ít nhất 8 chữ số.");
    if (!bankHolderValid) return alert("❌ Tên chủ tài khoản phải viết HOA toàn bộ và có ít nhất 2 từ.");

    let cart = [];
    try {
      const storedCart = localStorage.getItem("cartItems");
      cart = storedCart ? JSON.parse(storedCart) : [];
      cart = cart.map(item => ({
        ...item,
        quantity: item.quantity || 1
      }));
    } catch (e) {
      console.warn("❌ Lỗi khi parse cartItems:", e);
      cart = [];
    }

    const invoiceData = {
      name,
      phone,
      address,
      method,
      bankInfo: method === "ATM" ? {
        name: bankName,
        number: bankNumber,
        holder: bankHolder
      } : null,
      cart
    };

    localStorage.setItem("invoiceData", JSON.stringify(invoiceData));
    localStorage.removeItem("cartItems");
    alert("✅ Thanh toán thành công!");
    window.location.href = "invoice.html";
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const navLogin = document.querySelector(".nav-link[href*='login.html']");
  const storedName = localStorage.getItem("loggedUsername");

  if (localStorage.getItem("userLoggedIn") === "true" && storedName && navLogin) {
    navLogin.innerText = storedName;
    navLogin.style.backgroundColor = "#90ee90";
    navLogin.style.color = "black"; 

    navLogin.addEventListener("mouseenter", function () {
      navLogin.innerText = "Đăng xuất";
      navLogin.style.cursor = "pointer";
    });

    navLogin.addEventListener("mouseleave", function () {
      navLogin.innerText = storedName;
    });

    navLogin.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("userLoggedIn");
      localStorage.removeItem("loggedUsername");
      window.location.reload();
    });
  }
});