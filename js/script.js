const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const img = new Image();

let textX = canvas.width / 2;
let textY = 468;
let isDragging = false;
let offsetX, offsetY;

img.src = "./src/澎美免稅卡02.jpg"; // ← 換成你的圖片路徑
img.onload = () => {
  drawText();
};

function drawText() {
  const text = document.getElementById("userText").value;
  const fontSize = document.getElementById("fontSize").value;
  const fontColor = document.getElementById("fontColor").value;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = fontColor;
  ctx.textAlign = "center";

  const lines = text.split("\n");
  lines.forEach((line, index) => {
    ctx.fillText(line, textX, textY + index * (parseInt(fontSize) + 10));
  });
}

// === 拖曳功能 ===
canvas.addEventListener("mousedown", startDrag);
canvas.addEventListener("mousemove", onDrag);
canvas.addEventListener("mouseup", stopDrag);

canvas.addEventListener("touchstart", startDrag, { passive: false });
canvas.addEventListener("touchmove", onDrag, { passive: false });
canvas.addEventListener("touchend", stopDrag);

function startDrag(e) {
  e.preventDefault();
  const pos = getPos(e);
  if (isOnText(pos.x, pos.y)) {
    isDragging = true;
    offsetX = pos.x - textX;
    offsetY = pos.y - textY;
  }
}

function onDrag(e) {
  if (!isDragging) return;
  e.preventDefault();
  const pos = getPos(e);
  textX = pos.x - offsetX;
  textY = pos.y - offsetY;
  drawText();
}

function stopDrag() {
  isDragging = false;
}

function getPos(e) {
  if (e.touches && e.touches.length > 0) {
    return {
      x: e.touches[0].clientX - canvas.getBoundingClientRect().left,
      y: e.touches[0].clientY - canvas.getBoundingClientRect().top
    };
  }
  return {
    x: e.clientX - canvas.getBoundingClientRect().left,
    y: e.clientY - canvas.getBoundingClientRect().top
  };
}

function isOnText(x, y) {
  const text = document.getElementById("userText").value;
  const fontSize = document.getElementById("fontSize").value;
  const lines = text.split("\n");
  const textHeight = lines.length * (parseInt(fontSize) + 10);
  return (
    x > textX - 100 &&
    x < textX + 100 &&
    y > textY - 50 &&
    y < textY + textHeight
  );
}

// === 下載 ===
function downloadImage() {
  const link = document.createElement("a");
  link.download = "custom-image.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

// === 複製到剪貼簿 ===
async function copyToClipboard() {
  try {
    const blob = await new Promise(resolve =>
      canvas.toBlob(resolve, "image/png")
    );
    await navigator.clipboard.write([
      new ClipboardItem({ "image/png": blob })
    ]);
    alert("已複製到剪貼簿 ✅");
  } catch (err) {
    alert("此瀏覽器不支援直接複製，請長按圖片另存。");
  }
}

// === 控制板收合 ===
function togglePanel() {
  const panel = document.getElementById("controlPanel");
  panel.classList.toggle("closed");
  panel.classList.toggle("open");
}

// === 事件監聽 ===
document.getElementById("userText").addEventListener("input", drawText);
document.getElementById("fontSize").addEventListener("input", drawText);
document.getElementById("fontColor").addEventListener("input", drawText);
