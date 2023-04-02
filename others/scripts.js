// 检测到 marker 的事件处理器
function onMarkerFound() {
  // 显示图片
  var imageEntity = document.querySelector("#image-entity");
  imageEntity.setAttribute("visible", true);

  // 显示弹窗
  var popup = document.querySelector(".popup");
  popup.classList.add("open");

  popup.style.bottom = "0%";
  initialPopupY = 0;
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
  initialPopupY = -100;
}

//下划事件

var initialPopupY;

// 添加触摸事件处理器
function onTouchStart(event) {
  initialTouchY = event.touches[0].clientY;
}

function onTouchMove(event) {
  var currentTouchY = event.touches[0].clientY;
  var deltaY = initialTouchY - currentTouchY;

  if (deltaY < 0) { // 如果手指向下滑动
    var newPopupY = initialPopupY - deltaY;
    popup.style.bottom = newPopupY + "px";
  }
}

function onTouchEnd(event) {
  var finalTouchY = event.changedTouches[0].clientY;
  var deltaY = initialTouchY - finalTouchY;

  if (deltaY < -100) { // 下滑超过100像素
    onMarkerLost();
  } else { // 否则，弹窗返回初始位置
    popup.style.bottom = initialPopupY + "px";
  }
}


// DOM 加载完成后执行
document.addEventListener("DOMContentLoaded", function () {
  // 为 marker 绑定事件
  var marker = document.querySelector("a-marker");
  marker.addEventListener("markerFound", onMarkerFound);
  marker.addEventListener("markerLost", onMarkerLost);

  // 添加触摸事件监听器
  var popup = document.querySelector(".popup");
  popup.addEventListener("touchstart", onTouchStart);
  popup.addEventListener("touchmove", onTouchMove);
  popup.addEventListener("touchend", onTouchEnd);

});

