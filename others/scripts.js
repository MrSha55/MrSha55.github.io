function onMarkerFound(popupContentId, imageEntityId) {
  // initializePopupSwipe();

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




  const popupHeader = document.querySelector('.popup-header');
let startY = 0;
let isTouching = false;
let popupPosition = 'middle';
let lastMoveTime = 0;
let lastMoveY = 0;

marker1.addEventListener('markerFound', () => {
  popup.style.display = 'block';
});

popupHeader.addEventListener('touchstart', (e) => {
  startY = e.touches[0].clientY;
  isTouching = true;
  lastMoveTime = new Date().getTime();
  lastMoveY = startY;
});

popupHeader.addEventListener('touchmove', (e) => {
  e.preventDefault();
  if (!isTouching) return;

  const diffY = e.touches[0].clientY - startY;

  requestAnimationFrame(() => {
    updatePopupHeight(diffY);
  });

  lastMoveY = e.touches[0].clientY;
  lastMoveTime = new Date().getTime();
});

function updatePopupHeight(diffY) {
  let newHeight;

  if (popupPosition === 'middle') {
    newHeight = 422 - diffY;
  } else if (popupPosition === 'bottom') {
    newHeight = 84 + diffY;
  }

  newHeight = Math.max(Math.min(newHeight, 422), 84);
  popup.style.height = `${newHeight}px`;
}

popupHeader.addEventListener('touchend', () => {
  isTouching = false;
  const currentHeight = parseInt(popup.style.height, 10);
  const threshold = 20;
  const now = new Date().getTime();
  const velocity = (lastMoveY - startY) / (now - lastMoveTime);

  if (popupPosition === 'middle' && (currentHeight <= 84 + threshold || velocity < -0.5)) {
    popup.style.height = '84px';
    popupPosition = 'bottom';
  } else if (popupPosition === 'bottom' && (currentHeight >= 422 - threshold || velocity > 0.5)) {
    popup.style.height = '422px';
    popupPosition = 'middle';
  } else {
    popup.style.height = popupPosition === 'middle' ? '422px' : '84px';
  }
});

});