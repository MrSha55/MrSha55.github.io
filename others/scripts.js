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

  const slider = document.querySelector(".slideshow-container");
  let startX = 0;
  let endX = 0;
  let diffX = 0;

  slider.addEventListener("touchstart", (event) => {
    startX = event.changedTouches[0].clientX;
  });

  slider.addEventListener("touchmove", (event) => {
    endX = event.changedTouches[0].clientX;
    diffX = endX - startX;
    slider.style.transform = `translateX(${diffX}px)`;
  });

  slider.addEventListener("touchend", () => {
    slider.style.transition = "transform 0.3s";
    if (diffX < -50) {
      slider.style.transform = "translateX(-100%)";
    } else if (diffX > 50) {
      slider.style.transform = "translateX(0%)";
    } else {
      slider.style.transform = "translateX(0%)";
    }
    setTimeout(() => {
      slider.style.transition = "none";
    }, 300);
  });

});

