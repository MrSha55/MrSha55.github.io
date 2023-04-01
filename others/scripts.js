// 检测到 marker 的事件处理器
function onMarkerFound() {
  // 显示图片
  var imageEntity = document.querySelector("#image-entity");
  imageEntity.setAttribute("visible", true);

  // 显示弹窗
  var popup = document.querySelector(".popup");
  popup.classList.add("open");
}

// 丢失 marker 的事件处理器
function onMarkerLost() {
  // 隐藏图片
  var imageEntity = document.querySelector("#image-entity");
  imageEntity.setAttribute("visible", false);

  // 隐藏弹窗
  var popup = document.querySelector(".popup");
  popup.classList.remove("open");
}
//下划事件
function onTouchStart(event) {
  initialTouchY = event.touches[0].clientY;
}

function onTouchEnd(event) {
  var finalTouchY = event.changedTouches[0].clientY;
  // 判断下滑操作
  if (finalTouchY - initialTouchY > 50) {
    onMarkerLost();
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
  popup.addEventListener("touchend", onTouchEnd);
});
