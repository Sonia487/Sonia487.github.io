document.getElementById("batchGenerate").addEventListener("click", async () => {
    const fileInput = document.getElementById("excelUpload");
    if (!fileInput.files.length) {
        alert("請先選擇 Excel 檔案");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // 取得第一個 Sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // 確保解析範圍 (A~F 欄)，檢查是否能正確提取最後一行
        const ref = worksheet['!ref'];  // 例如 "A1:F10"
        const range = ref.split(':');
        const lastRow = range[1] ? range[1].match(/\d+/) : [1];  // 取得最後一行數字
        const lastRowNum = lastRow ? parseInt(lastRow[0]) : 1;

        // 指定範圍為 A~F 欄，這樣只會讀取 A~F 欄位的資料
        const filteredRange = { s: { r: 0, c: 0 }, e: { r: lastRowNum - 1, c: 5 } };
        const filteredWorksheet = XLSX.utils.sheet_to_json(worksheet, { range: filteredRange });

        if (filteredWorksheet.length === 0) {
            alert("Excel 檔案內容為空");
            return;
        }

        console.log("解析 Excel：", filteredWorksheet);
        await generateTickets(filteredWorksheet);
    };

    reader.readAsArrayBuffer(file);

    // 批量下載部份
    async function generateTickets(data) {
        const zip = new JSZip();
        const ticketContainer = document.getElementById("myTable");
    
        for (let i = 0; i < data.length; i++) {
            const row = data[i];
    
            // 填充表單內容，處理換行符號
            document.getElementById("client").innerHTML = formatText(row["旅客/電話"] || "");
            document.getElementById("tour-detail").innerHTML = formatText(row["日期/行程/人數"] || "");
            document.getElementById("time").innerHTML = formatText(row["報到/開始時間"] || "");
            document.getElementById("t-provider").innerHTML = formatText(row["行程業者"] || "");
            document.getElementById("checkin-add").innerHTML = formatText(row["報到地點"] || "");
            document.getElementById("ps").innerHTML = formatText(row["備註"] || "");
    
            // 等待內容更新
            await new Promise(resolve => setTimeout(resolve, 500));
    
            // 使用旅客名字作為檔名，並處理換行符號
            const clientName = getClientName(row["旅客/電話"]);
            const ticketFileName = `${clientName}_ticket.png`;
    
            // 設定生成圖片時的寬高
            const nodeWidth = ticketContainer.offsetWidth * 4; // 放大四倍
            const nodeHeight = ticketContainer.offsetHeight * 4; // 放大四倍
    
            // 使用 dom-to-image 生成圖片，並設置更高的解析度（scale）
            const dataUrl = await new Promise((resolve, reject) => {
                domtoimage.toPng(ticketContainer, {
                    width: nodeWidth,
                    height: nodeHeight,
                    style: {
                        'transform': 'scale(4)',
                        'transform-origin': 'top left'
                    }
                }).then(function(dataUrl) {
                    resolve(dataUrl);
                }).catch(function(error) {
                    reject(error);
                });
            });
    
            // 將圖片加入 ZIP
            zip.file(ticketFileName, dataUrl.split(",")[1], { base64: true });
        }
    
        // 生成 ZIP 並下載
        zip.generateAsync({ type: "blob" }).then((content) => {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(content);
            a.download = "tickets.zip";
            a.click();
        });
    }

    // 將換行符號轉換為 HTML <br> 標籤
    function formatText(text) {
        if (!text) return "";
        return text.replace(/\n/g, "<br>"); // 將 Excel 中的換行符號替換成 <br>
    }

    // 根據姓名和電話號碼取得檔名，處理空格或斜線（/）分隔符
    function getClientName(clientInfo) {
        if (!clientInfo) return `ticket_${Math.random().toString(36).substring(2, 9)}`; // 若沒有資料則生成隨機檔名
        // 使用正規表達式處理空格或斜線（/）分隔符
        const parts = clientInfo.split(/[\s\/]+/); // 用空格或斜線作為分隔符
        const clientName = parts[0].trim(); // 取第一部分作為名字
        return clientName || `ticket_${Math.random().toString(36).substring(2, 9)}`; // 若沒找到名字，使用隨機名稱
    }
});
