
function onMarkerFound(popupContentId, imageEntityId) {


  // 显示图片
  var imageEntity = document.querySelector(imageEntityId);
  imageEntity.setAttribute("visible", true);

   // 隐藏其他图片
  var imageEntities = document.querySelectorAll("a-image");
  imageEntities.forEach(function (img) {
    if (img.getAttribute("id") !== imageEntityId.slice(1)) {
      img.setAttribute("visible", false);
    }
  });

const popupContent = document.getElementById(popupContentId);
  initializeSlider(popupContent);
  
  setTimeout(function () {

}, 1000);

 // 显示对应的弹窗内容
  var popupContents = document.getElementsByClassName("popup-contents");
  for (var i = 0; i < popupContents.length; i++) {
    if (popupContents[i].id === popupContentId) {
      popupContents[i].style.display = "block";
    } else {
      popupContents[i].style.display = "none";
    }
  }

  // 显示弹窗
  var popup = document.querySelector(".popup");
  if (!popup.classList.contains("open")) {
    popup.classList.add("open");
    popup.style.bottom = "0%";
    initialPopupY = "0%";
  }
}

function initializePopupSwipe() {
  const popup = document.querySelector(".popup");
  const popupHeaders = document.querySelectorAll(".popup-header");
  let startY = 0;
  let startTouchX = 0; // 新增变量
  let initialPopupY = "0%";

  for (let header of popupHeaders) {
    header.addEventListener("touchstart", (event) => {
      startY = event.touches[0].clientY;
      startTouchX = event.touches[0].clientX; // 设置触摸开始时的水平坐标
    });

    header.addEventListener("touchmove", (event) => {
      const currentY = event.touches[0].clientY;
      const currentX = event.touches[0].clientX;
      const deltaY = currentY - startY;
      const deltaX = currentX - startTouchX;

      // 只有当垂直滑动距离大于水平滑动距离时，才触发垂直滑动
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        if (deltaY > 0) {
          // 向下滑动
          popup.style.bottom = `calc(${initialPopupY} - ${deltaY}px)`;
        }
      }
    });

    header.addEventListener("touchend", (event) => {
      const endY = event.changedTouches[0].clientY;
      const endTouchX = event.changedTouches[0].clientX;
      const deltaY = endY - startY;
      const deltaX = endTouchX - startTouchX;

      // 只有当垂直滑动距离大于水平滑动距离时，才触发垂直滑动
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        if (deltaY > window.innerHeight / 4) {
          // 如果向下滑动距离超过屏幕高度的1/4，将弹窗附着在屏幕底部
          popup.style.bottom = "-90%";
          initialPopupY = "-90%";
        } else {
          // 否则弹窗回到初始位置
          popup.style.bottom = initialPopupY;
        }
      }
    });
  }
}



function initializeSlider(popupContent) {
  const slider = popupContent.querySelector(".banner-slider");
  const indicators = popupContent.querySelectorAll(".indicator");
  let currentIndex = 0;
  let startTouchX = 0;

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      slider.style.transform = `translateX(-${index * 100}%)`;
      indicators[currentIndex].classList.remove("active");
      currentIndex = index;
      indicators[currentIndex].classList.add("active");
    });
  });

  slider.addEventListener("touchstart", (event) => {
    startTouchX = event.touches[0].clientX;
  });

  slider.addEventListener("touchend", (event) => {
    const endTouchX = event.changedTouches[0].clientX;
    const delta = endTouchX - startTouchX;

    if (delta > 50 && currentIndex > 0) {
      currentIndex--;
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
      indicators[currentIndex + 1].classList.remove("active");
      indicators[currentIndex].classList.add("active");
    } else if (delta < -50 && currentIndex < indicators.length - 1) {
      currentIndex++;
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
      indicators[currentIndex - 1].classList.remove("active");
      indicators[currentIndex].classList.add("active");
    }
  });
}

function onMarkerLost(imageEntityId) {
  console.log("Marker lost");
  // 隐藏图片
  var imageEntity = document.querySelector(imageEntityId);
  imageEntity.setAttribute("visible", false);

  // 隐藏弹窗
  var popup = document.querySelector(".popup");
  popup.classList.remove("open");

  popup.style.bottom = "-100%";
  initialPopupY = "-100%";
}

// DOM 加载完成后执行
document.addEventListener("DOMContentLoaded", function () {
    initializePopupSwipe();
 var popup = document.querySelector(".popup");
  // 为 marker1 绑定事件
  var marker1 = document.querySelector("#marker1");
  marker1.addEventListener("markerFound", function () {
    onMarkerFound("popupContent1", "#image-entity-1");
  });
  marker1.addEventListener("markerLost", function () {
    onMarkerLost("#image-entity-1");
  });

  // 为 marker2 绑定事件
  var marker2 = document.querySelector("#marker2");
  marker2.addEventListener("markerFound", function () {
    onMarkerFound("popupContent2", "#image-entity-2");  });
  marker2.addEventListener("markerLost", function () {
    onMarkerLost("#image-entity-2");
  });


});


