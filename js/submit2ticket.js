//做票券

// 提交表單的處理函數
function submit2ticket() {
    // 取得表單資料
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const provider = document.getElementById('provider').value;
    const tour = document.getElementById('tour').value;
    const startHour = parseInt(documentdocument.getElementById('start-hour').value);
    const startMinute = parseInt(documentdocument.getElementById('start-minute').value);
    const checkinTime = parseInt(documentdocument.getElementById('checkin-time').value);
    const groupNumber = document.getElementById('group-number').value;
    const namePhone = document.getElementById('name-phone').value;
    const adults = document.getElementById('adults').value;
    const children = document.getElementById('children').value;
    const infants = document.getElementById('infants').value;
    const snorkel = document.getElementById('snorkel').value;
    const canoe = document.getElementById('canoe').value;
    const freestyle = document.getElementById('freestyle').value;
    const motorbike = document.getElementById('motorbike').value;
    const bus = document.getElementById('bus').value;
    const notes = document.getElementById('notes').value;

    // 檢查是否有輸入有效的資料
    if (isNaN(startHour) || isNaN(startMinute) || isNaN(checkinTime)) {
    alert("請輸入有效的時間資料");
    return;
    }

    // 計算起始的時間總分鐘數
    const totalStartMinutes = startHour * 60 + startMinute;

    // 計算新的時間總分鐘數
    const newTotalMinutes = totalStartMinutes - checkinTime;

    // 計算新的小時和分鐘
    let newHour = Math.floor(newTotalMinutes / 60);
    let newMinute = newTotalMinutes % 60;
    
    // 如果新的小時小於0，表示時間跨天，將小時設為24小時制
    if (newHour < 0) {
        newHour += 24; // 如果減去時間後小於0，則將時間調整到前一天的時間
        }

    // 格式化時間：小時和分鐘都要是兩位數
    const formattedHour = newHour.toString().padStart(2, '0');
    const formattedMinute = newMinute.toString().padStart(2, '0');

    // 顯示新的時間
    const newTime = formattedHour + ":" + formattedMinute;
    document.getElementById('new-time').textContent = newTime;

    //取得票券表格資料
    const client = document.getElementById('client').value;
    const tourdetail = document.getElementById('tour-detail').value;
    const time = document.getElementById('time').value;
    const tprovider = document.getElementById('t-provider').value;
    const checkinadd = document.getElementById('checkin-add').value;
    const ps = document.getElementById('ps').value;


    // 計算報到時間 (開始時間 - 報到時間)
    const checkinTimeFormatted = `${startHour}:${startMinute} - ${checkinTime}分鐘`;

    // 旅客/電話
    client = namePhone;

    // 日期/行程/人數
    tourdetail = `${date} ${tour} ${adults}大${children}小${infants}抱`;

    // 報到/開始時間
    const timeCell = document.createElement('td');
    timeCell.textContent = `${checkinTimeFormatted} / ${startHour}:${startMinute}`;
    newRow.appendChild(timeCell);

    // 行程業者
    tprovider = provider;

    // 報到地點
    const checkinAddCell = document.createElement('td');
    checkinAddCell.textContent = providerDetails[provider] || "未知地點";
    newRow.appendChild(checkinAddCell);

    // 備註
    ps = notes;
}