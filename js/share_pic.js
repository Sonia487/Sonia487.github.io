document.getElementById("share_pic").addEventListener("click", function () {
    let target = document.getElementById("myTable"); // 你的 table 容器

    domtoimage.toBlob(target).then(function (blob) {
        let file = new File([blob], "ticket.png", { type: "image/png" });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            // 使用 Web Share API 分享
            navigator.share({
                files: [file],
                title: "電子票券",
                text: "這是你的電子票券，請查收。",
            }).catch(console.error);
        } else {
            // Web Share API 不支持時，使用 LINE intent 分享
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
                let base64data = reader.result.split(",")[1]; // 取出 base64 部分
                let lineUrl = `https://social-plugins.line.me/lineit/share?url=data:image/png;base64,${base64data}`;
                window.open(lineUrl, "_blank");
            };
        }
    });
});
