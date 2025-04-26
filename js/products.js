function checkLoginBeforeAddToCart(product) {
  console.log("⚡ Gọi hàm addToCart từ products.html", product);
  const isLoggedIn = localStorage.getItem("userLoggedIn");
  if (!isLoggedIn) {
    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.tabIndex = -1;
    modal.innerHTML = `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body text-center p-4">
            <h5 class="mb-3">Bạn cần đăng nhập để thêm vào giỏ hàng!</h5>
            <a href="login.html" class="btn btn-primary">Đăng nhập</a>
          </div>
        </div>
      </div>`;
    document.body.appendChild(modal);
    new bootstrap.Modal(modal).show();
  } else {
    if (product && product.title && product.price) {
      const price = typeof product.price === 'number' ? product.price : parseInt((product.price + '').replace(/\D/g, ""));
      const added = {
        title: product.title,
        price: price,
        img: product.img || "",
        quantity: 1
      };
      console.log("🛒 Thêm sản phẩm:", added);
      addToCart(added);
      alert("✅ Đã thêm vào giỏ hàng!");
    } else {
      console.warn("⚠️ Dữ liệu sản phẩm không hợp lệ:", product);
    }
  }
}

// Bộ lọc sản phẩm

document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const allProductGroups = document.querySelectorAll(".product-group");
  const container = document.querySelector(".col-md-9");

  checkboxes.forEach(cb => {
    cb.addEventListener("change", applyFilters);
  });

  function applyFilters() {
    const typeFilters = [];
    const priceFilters = [];

    if (document.getElementById("type1").checked) typeFilters.push("Búp bê nhựa");
    if (document.getElementById("type2").checked) typeFilters.push("Búp bê vải");
    const filterThuBong = document.getElementById("type3").checked;

    if (document.getElementById("price1").checked) priceFilters.push({ min: 0, max: 100000 });
    if (document.getElementById("price2").checked) priceFilters.push({ min: 100000, max: 300000 });
    if (document.getElementById("price3").checked) priceFilters.push({ min: 300000, max: Infinity });

    allProductGroups.forEach(g => g.style.display = "none");

    const filteredContainer = document.createElement("div");
    filteredContainer.className = "product-group filtered";
    const filteredRow = document.createElement("div");
    filteredRow.className = "product-row d-flex flex-wrap gap-4 justify-content-start";

    const addedTitles = new Set();

document.querySelectorAll(".product-group .col").forEach(product => {
  const name = product.querySelector(".card-title")?.innerText || "";
  const priceText = product.querySelector(".card-text")?.innerText || "";
  const rawPrice = parseInt(priceText.replace(/\D/g, ""));

  const matchType = typeFilters.length === 0 && !filterThuBong
    || typeFilters.some(type => name.includes(type))
    || (filterThuBong && !name.includes("Búp bê vải") && !name.includes("Búp bê nhựa"));

  const matchPrice = priceFilters.length === 0 || priceFilters.some(range => rawPrice >= range.min && rawPrice <= range.max);

  if (matchType && matchPrice && !addedTitles.has(name)) {
    const clone = product.cloneNode(true);
    filteredRow.appendChild(clone);
    addedTitles.add(name);
  }
});


    filteredContainer.appendChild(filteredRow);

    const oldFiltered = document.querySelector(".product-group.filtered");
    if (oldFiltered) oldFiltered.remove();

    if (filteredRow.children.length > 0) {
      container.appendChild(filteredContainer);
    }
  }

  // Tự động tick 
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat");
  if (cat === "bbnhua") document.getElementById("type1").checked = true;
  if (cat === "bbvai") document.getElementById("type2").checked = true;
  if (cat === "thubong") document.getElementById("type3").checked = true;
  if (cat) applyFilters();
});

