let startY = 0;
let initialTransformY = 0;
let startTime = 0;
let endTime = 0;
let velocityThreshold = 0.1; // 可以调整这个值来改变速度阈值
var popup = document.querySelector(".popup");
let fixed = document.querySelector('.fixed');
let timeOut = ''
let imgArray = JSON.parse(localStorage.getItem('imgArr')) || []
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
    if (timeOut) {
      clearTimeout(timeOut)
    }
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
    }, false);
  });

  slider.addEventListener("touchstart", (event) => {
    event.stopPropagation()
    startTouchX = event.touches[0].clientX;
  }, false);
  slider.addEventListener("touchMove", (event) => {
    event.stopPropagation()
  }, false);

  slider.addEventListener("touchend", (event) => {
    event.stopPropagation()
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
  }, false);
}

function onMarkerLost(imageEntityId) {
  console.log("Marker lost");
  // 隐藏图片
  var imageEntity = document.querySelector(imageEntityId);
  imageEntity.setAttribute("visible", false);

  // 隐藏弹窗
  // var popup = document.querySelector(".popup");
  popup.classList.remove("open");

  popup.style.bottom = "-100%";
  initialPopupY = "-100%";
}

function touchStart(event) {
      startTime = new Date().getTime(); // 记录触摸开始时间
      startY = event.touches[0].clientY;
      initialTransformY = parseFloat(popup.style.transform.match(/translateY\((.*?)%\)/)[1]);
    }

function touchMove(event) {
  // console.log(event.touches[0].clientY)
  // console.log(popup.offsetHeight)
  // console.log(window.innerHeight) // 844
    let deltaY = event.touches[0].clientY - startY;
    console.log(deltaY)
    let newTransformY = ((initialTransformY + deltaY) / popup.offsetHeight) * 100;
    // console.log(newTransformY)
      if (newTransformY > 0 && newTransformY < 80) {
      popup.style.transform = `translateY(${newTransformY}%)`;
    }
  }
function touchEnd() {
    let currentTransformY = parseFloat(popup.style.transform.match(/translateY\((.*?)%\)/)[1]);
    endTime = new Date().getTime(); // 记录触摸结束时间
    let timeElapsed = endTime - startTime; // 计算触摸持续时间（毫秒）
    let deltaY = parseFloat(popup.style.transform.match(/translateY\((.*?)%\)/)[1]) - initialTransformY;
    let velocity = Math.abs(deltaY) / timeElapsed; // 计算滑动速度（相对百分比/毫秒）

    // 如果速度超过阈值，根据滑动方向判断是否展开或收缩弹窗
    if (velocity > velocityThreshold) {
      if (deltaY > 0) {
        popup.style.transform = "translateY(80%)";
      } else {
        popup.style.transform = "translateY(0%)";
      }
    } else {
      // 原有的触摸结束逻辑
      if (currentTransformY > 30) {
        if (currentTransformY < 5) {
          popup.style.transform = "translateY(0%)";
        } else {
          popup.style.transform = "translateY(80%)";
        }
      } else {
        if (currentTransformY < 65) {
          popup.style.transform = "translateY(0%)";
        } else {
          popup.style.transform = "translateY(80%)";
        }
      }
    }
}

let imgNum = -1
let imgArr = ['egg', 'd', '2', '3']
let setImgSrc = () => {
  let eggImg = document.querySelector('#eggImg')
  console.log(imgNum)
  eggImg.src = 'http://webar-carbon.gitee.io/mrsha55.github.io/others/' + imgArr[imgNum] + '.png'
}
let eggShow = () => {
  popupTop.style.display = 'none'
  let num = Math.round(Math.random() * 10);
    console.log(num)
    let arr = [1, 3, 9]
    if (arr.indexOf(num) > -1 && imgArray.indexOf(imgArr[imgNum]) === -1) {
      fixed.style.display = 'block'
    }
}






// DOM 加载完成后执行
document.addEventListener("DOMContentLoaded", function () {

// let popup = document.querySelector(".popup-header");
// let startY = 0;
// let initialTransformY = 0;
// let startTime = 0;
// let endTime = 0;
// let velocityThreshold = 0.1; // 可以调整这个值来改变速度阈值

 var popup = document.querySelector(".popup");

  // 为 marker1 绑定事件
  var marker1 = document.querySelector("#marker1");
  marker1.addEventListener("markerFound", function (e) {
    imgNum = 0
    setImgSrc()
    eggShow()
    onMarkerFound("popupContent1", "#image-entity-1");
    popup.style.display = "block";
      setTimeout(() => {
        popup.style.transform = "translateY(0%)";
      }, 100);
      console.log(123)
      popup.addEventListener("touchstart", touchStart, false);
      popup.addEventListener("touchmove", touchMove, false);
      popup.addEventListener("touchend", touchEnd, false);
  });
  marker1.addEventListener("markerLost", function (e) {
    onMarkerLost("#image-entity-1");
    popup.style.transform = "translateY(100%)";
      setTimeout(() => {
        popup.style.display = "none";
      }, 300);
      popup.removeEventListener("touchstart", touchStart);
      popup.removeEventListener("touchmove", touchMove);
      popup.removeEventListener("touchend", touchEnd);
  });

  // 为 marker2 绑定事件
  var marker2 = document.querySelector("#marker2");
  marker2.addEventListener("markerFound", function () {
    imgNum = 1
    setImgSrc()
    eggShow()
    onMarkerFound("popupContent2", "#image-entity-2");  });
  marker2.addEventListener("markerLost", function () {
    onMarkerLost("#image-entity-2");
  });

});


// setImgSrc()
let popupTop = document.querySelector('.popupTop')
let buttonFix = document.querySelector('.buttonFix')
buttonFix.onclick = () => {
  imgArray.push(imgArr[imgNum])
  localStorage.setItem('imgArr', JSON.stringify(imgArray))
  fixed.style.display = 'none'
  popupTop.style.display = 'block'
  if (popupTop.style.display === 'block') {
    timeOut = setTimeout(() => {
      popupTop.style.display = 'none'
    }, 5000)
  }
  
}

popupTop.onclick = () => {
  // localStorage.setItem('goImg', JSON.stringify(1))
  // window.location.href = "../index.html";
  openModal()
}
let setImgBg = () => {
      let imgArray = JSON.parse(localStorage.getItem('imgArr')) || []
      for (let i = 0; i < imgArray.length; i++) {
        let dom = document.querySelector('#img' + (i + 1))
        dom.src = './' + imgArray[i] + '.png'
      }
    }

function openModal() {
  document.getElementById("modal").style.display = "block";
  setImgBg()
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

    