//convert table to image            
function convertToImage() {
var resultDiv = document.getElementById("result");
html2canvas(document.getElementById("myTable"), {
    onrendered: function(canvas) {
        var img = canvas.toDataURL("image/png");
        result.innerHTML = '<a download="test.jpeg" href="'+img+'">test</a>';
        }
});
}        
//click event
var convertBtn = document.getElementById("convert");
convertBtn.addEventListener('click', convertToImage);


//AI寫的功能
// script.js

document.getElementById('run').addEventListener('click', function() {
    // 顯示表單和背景
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
});

document.getElementById('close-form').addEventListener('click', function() {
    // 關閉表單和背景
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
});

// 點擊背景關閉表單
document.getElementById('overlay').addEventListener('click', function(event) {
    // 檢查是否點擊背景區域，而非表單
    if (event.target === this) {
        document.getElementById('form-container').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    }
});

// 模擬業者和行程的選擇資料
const vendors = {
    category1: ['業者A', '業者B'],
    category2: ['業者C', '業者D']
};

const itineraries = {
    category1: ['行程1', '行程2'],
    category2: ['行程3', '行程4']
};

// 當類別選擇變動時更新業者和行程
document.getElementById('category').addEventListener('change', function() {
    const category = this.value;
    const vendorSelect = document.getElementById('vendor');
    const itinerarySelect = document.getElementById('itinerary');
    
    // 更新業者選單
    vendorSelect.innerHTML = '<option value="">請選擇</option>';
    if (category && vendors[category]) {
        vendors[category].forEach(function(vendor) {
            const option = document.createElement('option');
            option.value = vendor;
            option.textContent = vendor;
            vendorSelect.appendChild(option);
        });
    }

    // 更新行程選單
    itinerarySelect.innerHTML = '<option value="">請選擇</option>';
    if (category && itineraries[category]) {
        itineraries[category].forEach(function(itinerary) {
            const option = document.createElement('option');
            option.value = itinerary;
            option.textContent = itinerary;
            itinerarySelect.appendChild(option);
        });
    }
});
