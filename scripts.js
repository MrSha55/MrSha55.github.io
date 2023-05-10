
function navigateToScanPage() {
  window.location.href = "others/scanner.html"; // 跳转扫描页
}

function openModal() {
  document.getElementById("modal").style.display = "block";
  localStorage.removeItem('goImg')
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

let goImg = JSON.parse(localStorage.getItem('goImg'))
if (goImg === 1) {
  openModal()
}