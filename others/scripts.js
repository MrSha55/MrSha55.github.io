
function onMarkerFound() {
  // 显示图片
  var imageEntity = document.querySelector("#image-entity-1");
  imageEntity.setAttribute("visible", true);

  // 显示弹窗
  var popup = document.querySelector(".popup");
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

}

function onMarkerLost() {
  console.log("Marker lost");
  // 隐藏图片
  var imageEntity = document.querySelector("#image-entity-1");
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
});