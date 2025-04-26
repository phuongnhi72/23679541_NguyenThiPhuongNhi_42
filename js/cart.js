// login
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

// Thêm sản phẩm vào giỏ hàng
function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Tìm xem sản phẩm đã có trong giỏ chưa
  const existing = cart.find(item => item.title === product.title);
  if (existing) {
    existing.quantity += product.quantity || 1;
  } else {
    cart.push({ ...product, quantity: product.quantity || 1 });
  }

  localStorage.setItem("cartItems", JSON.stringify(cart));
}

// Cập nhật giỏ hàng
function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  const tbody = document.querySelector("tbody");
  let total = 0;
  tbody.innerHTML = "";

  cart.forEach(item => {
    const row = document.createElement("tr");
const price = typeof item.price === 'number' ? item.price : parseInt(item.price.replace(/\D/g, ''));
    total += item.quantity * price;

    row.innerHTML = `
      <td>${item.title}</td>
      <td>${item.quantity}</td>
      <td>${price.toLocaleString()}đ</td>
      <td><button class="btn btn-sm btn-danger" onclick="removeFromCart('${item.title}')">X</button></td>
    `;
    tbody.appendChild(row);
  });

  if (cart.length > 0) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td colspan="2" class="text-end fw-bold">Thành tiền:</td>
      <td class="fw-bold">${total.toLocaleString()}đ</td>
      <td></td>
    `;
    tbody.appendChild(row);
  }
}

function removeFromCart(title) {
  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  cart = cart.filter(item => item.title !== title);
  localStorage.setItem("cartItems", JSON.stringify(cart));
  renderCart();
}

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("cart.html")) {
    renderCart();
  }
});