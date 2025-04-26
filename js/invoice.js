//login
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
document.addEventListener("DOMContentLoaded", function () {
  const checkoutForm = document.getElementById("checkoutForm");

  if (!checkoutForm) return;

  checkoutForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const method = document.querySelector("input[name='paymentMethod']:checked").value;

    const bankName = document.getElementById("bankName").value.trim();
    const bankNumber = document.getElementById("bankNumber").value.trim();
    const bankHolder = document.getElementById("bankHolder").value.trim();

    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

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
    const invoiceData = JSON.parse(localStorage.getItem("invoiceData"));
    const invoiceContent = document.getElementById("invoiceContent");

    if (!invoiceData) {
      invoiceContent.innerHTML = "<p class='text-center text-danger'>Không có dữ liệu hóa đơn!</p>";
      return;
    }

    const { name, phone, address, method, bankInfo, cart } = invoiceData;
    let total = 0;

    let html = `
      <p><strong>Họ và tên:</strong> ${name}</p>
      <p><strong>Số điện thoại:</strong> ${phone}</p>
      <p><strong>Địa chỉ:</strong> ${address}</p>
      <p><strong>Phương thức thanh toán:</strong> ${method}</p>
    `;

    if (method === "ATM" && bankInfo) {
      html += `
        <p><strong>Tên ngân hàng:</strong> ${bankInfo.name}</p>
        <p><strong>Số tài khoản:</strong> ${bankInfo.number}</p>
        <p><strong>Chủ tài khoản:</strong> ${bankInfo.holder}</p>
      `;
    }

    html += "<hr/><h5>Chi tiết sản phẩm:</h5><table class='table'><thead><tr><th>Tên sản phẩm</th><th>Số lượng</th><th>Đơn giá</th><th>Thành tiền</th></tr></thead><tbody>";

    cart.forEach(item => {
      const price = typeof item.price === "number" ? item.price : parseInt((item.price + "").replace(/\D/g, ""));
      const lineTotal = price * item.quantity;
      total += lineTotal;
      html += `
        <tr>
          <td>${item.title}</td>
          <td>${item.quantity}</td>
          <td>${price.toLocaleString()}đ</td>
          <td>${lineTotal.toLocaleString()}đ</td>
        </tr>
      `;
    });

    html += `</tbody></table><p class='text-end fw-bold'>Tổng cộng: ${total.toLocaleString()}đ</p>`;
    invoiceContent.innerHTML = html;
  });