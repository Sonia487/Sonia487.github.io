//做票券

// 提交表單的處理函數
function submit2ticket() {
    // 取得表單資料
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const provider = document.getElementById('provider').value;
    const tour = document.getElementById('tour').value;
    const startHourInput = parseInt(document.getElementById('start-hour').value);
    const startMinuteInput = parseInt(document.getElementById('start-minute').value);
    const checkinTimeInput = parseInt(document.getElementById('checkin-time').value);
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

    //取得票券表格資料
    const client = document.getElementById('client');
    const tourdetail = document.getElementById('tour-detail');
    const ttime = document.getElementById('time');
    const tprovider = document.getElementById('t-provider');
    const checkinadd = document.getElementById('checkin-add');
    const ps = document.getElementById('ps');

    // 格式化時間為 24 小時制，保證是兩位數
    function formatTime(hour, minute) {
        return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    }

    // 顯示報到和開始時間的函數
        const startHour = parseInt(startHourInput, 10);
        const startMinute = parseInt(startMinuteInput, 10);
        const checkinTime = parseInt(checkinTimeInput, 10);

        if (isNaN(startHour) || isNaN(startMinute) || isNaN(checkinTime)) {
            // 如果任何輸入欄位的值無效或為空，則不顯示任何內容
            document.getElementById("show").innerText = '';
            return;
        }

        // 計算報到時間
        let checkinHour = startHour;
        let checkinMinute = startMinute - checkinTime;

        // 處理分鐘數小於0的情況
        if (checkinMinute < 0) {
            checkinHour -= 1;
            checkinMinute += 60;
        }

        // 格式化時間顯示
        const formattedCheckinTime = formatTime(checkinHour, checkinMinute);
        const formattedStartTime = formatTime(startHour, startMinute);


    // 顯示人數的函數
        let message = "";
        let peopleCount = [];

        // 判斷是否有輸入大人數量，若有則加入
        if (adults !== "") {
            peopleCount.push(`${adults}大`);
        }

        // 判斷是否有輸入小孩數量，若有則加入
        if (children !== "") {
            peopleCount.push(`${children}小`);
        }

        // 判斷是否有輸入嬰兒數量，若有則加入
        if (infants !== "") {
            peopleCount.push(`${infants}嬰`);
        }

        // 如果有有效的數量，組合顯示；否則不顯示
        if (peopleCount.length > 0) {
            message = `${peopleCount.join("")}`;
        }

    //填入票券表格
    // 旅客/電話
    client.textContent = namePhone;
    // 日期/行程/人數 tour會顯示行程id，要再修改
    tourdetail.textContent = `${date} ${tour} ${message}`;
    // 報到/開始時間
    ttime.textContent = `${formattedCheckinTime}報到/${formattedStartTime}開始`;
    // 行程業者
    tprovider.textContent = provider;
    // 報到地點
    //const checkinadd.textContent = document.getElementById('checkin-add');
    // 備註
    ps.textContent = notes;
}