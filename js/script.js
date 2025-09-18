const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const img = new Image();

let textX = canvas.width / 2;
let textY = 660;
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
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  const blob = await new Promise(resolve =>
    canvas.toBlob(resolve, "image/png")
  );

  if (isIOS) {
    // iOS 不支援複製圖片 → 顯示可長按的 <img>
    const imgURL = URL.createObjectURL(blob);

    let preview = document.getElementById("iosPreview");
    if (!preview) {
      preview = document.createElement("div");
      preview.id = "iosPreview";
      preview.style.position = "fixed";
      preview.style.top = "0";
      preview.style.left = "0";
      preview.style.width = "100%";
      preview.style.height = "100%";
      preview.style.background = "rgba(0,0,0,0.8)";
      preview.style.display = "flex";
      preview.style.alignItems = "center";
      preview.style.justifyContent = "center";
      preview.style.zIndex = "9999";
      preview.innerHTML = `
        <div style="text-align:center; color:white">
          <p>📌 長按圖片即可存圖/複製</p>
          <img src="${imgURL}" style="max-width:90%; border:3px solid white; border-radius:10px">
          <br>
          <button onclick="document.getElementById('iosPreview').remove()" 
            style="margin-top:10px; padding:8px 16px; border:none; border-radius:8px; background:#fff; color:#000;">
            關閉
          </button>
        </div>
      `;
      document.body.appendChild(preview);
    } else {
      preview.querySelector("img").src = imgURL;
      preview.style.display = "flex";
    }
  } else {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob })
      ]);
      alert("圖片已複製到剪貼簿 ✅");
    } catch (err) {
      console.error(err);
      alert("複製失敗，請改用下載或長按圖片存檔");
    }
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
