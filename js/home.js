
document.addEventListener("DOMContentLoaded", function () {
  const productMappings = {
    "BÚP BÊ NHỰA": {
      title: "Búp bê nhựa Mỹ ver1",
      price: "150.000đ",
      img: "img/bupbe1.jpg",
      ratingSold: "⭐ 4.3 | Đã bán: 2.1k"
    },
    "CAPOO": {
      title: "Capoo cảm xúc",
      price: "120.000đ",
      img: "../img/capoo1.jpg",
      ratingSold: "⭐ 4.0 | Đã bán: 5k"
    },
    "CINNAMOROLL": {
      title: "Cinnamoroll tai thỏ",
      price: "160.000đ",
      img: "../img/cinna1.jpg",
      ratingSold: "⭐ 4.5 | Đã bán: 2.3k"

    },
    "BÚP BÊ VẢI": {
      title: "Búp bê vải Phainon",
      price: "130.000đ",
      img: "../img/doll1.png",
      ratingSold: "⭐ 5.0 | Đã bán: 7.2k"

    },
    "BÚP BÊ NHẬT": {
      title: "Búp bê nhựa Rose",
      price: "155.000đ",
      img: "../img/japan1.jpg",
      ratingSold: "⭐ 4.1 | Đã bán: 3.8k"

    },
    "KUROMI": {
      title: "Kuromi tím mộng mơ",
      price: "140.000đ",
      img: "../img/kuro1.jpg",
      ratingSold: "⭐ 4.2 | Đã bán: 2.1k"

    },
    "MY MELODY": {
      title: "My Melody kẹp nơ",
      price: "145.000đ",
      img: "../img/melody1.jpg",
      ratingSold: "⭐ 4.0 | Đã bán: 1.3k"

    },
    "MÈO NHỒI BÔNG": {
      title: "Mèo nâu",
      price: "135.000đ",
      img: "../img/meobeo1.jpg",
      ratingSold: "⭐ 4.7 | Đã bán: 3.2k"

    }
  };

  document.querySelectorAll(".card-button").forEach((btn) => {
    btn.addEventListener("click", function () {
      const card = this.closest(".card");
      const name = card.querySelector(".card-title").textContent.trim();
      const product = productMappings[name];
      if (product) {
        localStorage.setItem("productDetail", JSON.stringify(product));
        window.location.href = "html/products-detail.html";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Xử lý form chính
  const mainForm = document.getElementById("subscribeForm");
  const mainEmail = document.getElementById("subscribeEmail");

  mainForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = mainEmail.value.trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (re.test(email)) {
      const modal = new bootstrap.Modal(document.getElementById("thankModal"));
      modal.show();
      mainForm.reset();
    } else {
      mainEmail.classList.add("is-invalid");
      if (!mainEmail.nextElementSibling || !mainEmail.nextElementSibling.classList.contains("invalid-feedback")) {
        const error = document.createElement("div");
        error.className = "invalid-feedback";
        error.innerText = "Vui lòng nhập email hợp lệ.";
        mainEmail.parentNode.insertBefore(error, mainEmail.nextSibling);
      }
    }
  });

  mainEmail.addEventListener("input", function () {
    mainEmail.classList.remove("is-invalid");
    const error = mainEmail.parentNode.querySelector(".invalid-feedback");
    if (error) error.remove();
  });

  // Xử lý form ở footer
  const footerForm = document.getElementById("footerSubscribeForm");
  const footerEmail = document.getElementById("footerSubscribeEmail");

  footerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = footerEmail.value.trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (re.test(email)) {
      const modal = new bootstrap.Modal(document.getElementById("footerThankModal"));
      modal.show();
      footerForm.reset();
    } else {
      footerEmail.classList.add("is-invalid");
      if (!footerEmail.nextElementSibling || !footerEmail.nextElementSibling.classList.contains("invalid-feedback")) {
        const error = document.createElement("div");
        error.className = "invalid-feedback";
        error.innerText = "Vui lòng nhập email hợp lệ.";
        footerEmail.parentNode.insertBefore(error, footerEmail.nextSibling);
      }
    }
  });

  footerEmail.addEventListener("input", function () {
    footerEmail.classList.remove("is-invalid");
    const error = footerEmail.parentNode.querySelector(".invalid-feedback");
    if (error) error.remove();
  });

  // Slide sản phẩm
  const track = document.querySelector('.flip-carousel-track');
  const btnLeft = document.querySelector('.carousel-btn.left-btn');
  const btnRight = document.querySelector('.carousel-btn.right-btn');

  let currentSlide = 0;

  const updateSlide = () => {
    const slideWidth = track.querySelector('.flip-card-slide').offsetWidth;
    track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    track.style.transition = 'transform 0.5s ease';
  };

  btnLeft.addEventListener('click', () => {
    const totalSlides = track.querySelectorAll('.flip-card-slide').length;
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlide();
  });

  btnRight.addEventListener('click', () => {
    const totalSlides = track.querySelectorAll('.flip-card-slide').length;
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlide();
  });

  

  // Tự động check checkbox 
  const urlParams = new URLSearchParams(window.location.search);
  const cat = urlParams.get("cat");
  const checkboxMap = {
    "bbnhua": "type1",
    "bbvai": "type2",
    "thubong": "type3"
  };
  if (checkboxMap[cat]) {
    const cb = document.getElementById(checkboxMap[cat]);
    if (cb) {
      cb.checked = true;
      cb.dispatchEvent(new Event('change'));
    }
  }
});
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
