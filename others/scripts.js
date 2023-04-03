var initialPopupY = "-100%";

function onMarkerFound() {
  // 显示图片
  var imageEntity = document.querySelector("#image-entity");
  imageEntity.setAttribute("visible", true);

  // 显示弹窗
  var popup = imageEntity.querySelector(".popup");
  popup.classList.add("open");

  popup.style.bottom = "0%";
  initialPopupY = "0%";

  const slider = popup.querySelector('.banner-slider');
  const indicators = popup.querySelectorAll('.indicator');
  let currentIndex = 0;
  let startTouchX = 0;

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      slider.style.transform = `translateX(-${index * 100}%)`;
      indicators[currentIndex].classList.remove('active');
      currentIndex = index;
      indicators[currentIndex].classList.add('active');
    });
  });

  slider.addEventListener('touchstart', (event) => {
    startTouchX = event.touches[0].clientX;
  });

  slider.addEventListener('touchend', (event) => {
    const endTouchX = event.changedTouches[0].clientX;
    const delta = endTouchX - startTouchX;

    if (delta > 50 && currentIndex > 0) {
      currentIndex--;
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
      indicators[currentIndex + 1].classList.remove('active');
      indicators[currentIndex].classList.add('active');
    } else if (delta < -50 && currentIndex < indicators.length - 1) {
      currentIndex++;
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
      indicators[currentIndex - 1].classList.remove('active');
      indicators[currentIndex].classList.add('active');
    }
  });

  const closePopupButton = popup.querySelector('.close-popup');
  closePopupButton.addEventListener('click', () => {
    popup.classList.remove('open');
  });
}

function onMarkerLost() {
  // 隐藏图片
  var imageEntity = document.querySelector("#image-entity");
  imageEntity.setAttribute("visible", false);

  // 隐藏弹窗
  var popup = imageEntity.querySelector(".popup");
  popup.classList.remove("open");

  popup.style.bottom = initialPopupY;
}
