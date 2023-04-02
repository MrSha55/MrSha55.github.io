// 检测到 marker 的事件处理器
function onMarkerFound() {
  // 显示图片
  var imageEntity = document.querySelector("#image-entity");
  imageEntity.setAttribute("visible", true);

  // 显示弹窗
  var popup = document.querySelector(".popup");
  popup.classList.add("open");

  popup.style.bottom = "0%";
  initialPopupY = "0%";
}


// 丢失 marker 的事件处理器
function onMarkerLost() {
  // 隐藏图片
  var imageEntity = document.querySelector("#image-entity");
  imageEntity.setAttribute("visible", false);

  // 隐藏弹窗
  var popup = document.querySelector(".popup");
  popup.classList.remove("open");

  popup.style.bottom = "-100%";
  initialPopupY = "-100%";
}


// DOM 加载完成后执行
document.addEventListener("DOMContentLoaded", function () {
  // 为 marker 绑定事件
  var marker = document.querySelector("a-marker");
  marker.addEventListener("markerFound", onMarkerFound);
  marker.addEventListener("markerLost", onMarkerLost);

  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  function goToSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(currentSlide);
  }

  // Add swipe event handling
  let touchstartX = 0;
  let touchendX = 0;

  const slider = document.querySelector('.slideshow-container');

  slider.addEventListener('touchstart', (event) => {
    touchstartX = event.changedTouches[0].screenX;
  });

  slider.addEventListener('touchend', (event) => {
    touchendX = event.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchendX < touchstartX) {
      nextSlide();
    }
    if (touchendX > touchstartX) {
      prevSlide();
    }
  }

  goToSlide(0);


});

