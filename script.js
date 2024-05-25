document.getElementById('process-button').addEventListener('click', () => {
    const imageUpload = document.getElementById('image-upload').files[0];

    if (imageUpload) {
        // 显示加载提示
        const loadingMessage = document.getElementById('loading-message');
        if (loadingMessage) {
            loadingMessage.style.display = 'block';
        }

        const image = new Image();

        image.onload = () => {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');

            // 获取屏幕的宽度，以便缩放图像
            const screenWidth = window.innerWidth;
            const scaleFactor = screenWidth / image.width;

            const scaledWidth = image.width * scaleFactor;
            const scaledHeight = image.height * scaleFactor;

            canvas.width = scaledWidth;
            canvas.height = scaledHeight;
            ctx.drawImage(image, 0, 0, scaledWidth, scaledHeight);

            const watermark = new Image();
            watermark.src = 'images/watermark.png';  // 固定的水印图片路径

            watermark.onload = () => {
                const watermarkWidth = scaledWidth / 4;
                const watermarkHeight = (watermark.height / watermark.width) * watermarkWidth;
                ctx.globalAlpha = 0.9;
                ctx.drawImage(watermark, scaledWidth - watermarkWidth - 10, scaledHeight - watermarkHeight - 10, watermarkWidth, watermarkHeight);

                // 隐藏加载提示
                if (loadingMessage) {
                    loadingMessage.style.display = 'none';
                }

                // 获取当前日期和时间
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');
                const dateTime = `${year}${month}${day}_${hours}${minutes}${seconds}`;

                // 显示 canvas 和下载链接
                document.getElementById('canvas').style.display = 'block';
                const downloadLink = document.getElementById('download-link');
                downloadLink.style.display = 'block';
                downloadLink.href = canvas.toDataURL();
                downloadLink.download = `watermarked_image_${dateTime}.png`;

                // 清除文件输入字段
                document.getElementById('image-upload').value = '';
            };

            watermark.onerror = () => {
                alert('Failed to load watermark image.');
                if (loadingMessage) {
                    loadingMessage.style.display = 'none';
                }
            };
        };

        image.onerror = () => {
            alert('Failed to load the uploaded image.');
            if (loadingMessage) {
                loadingMessage.style.display = 'none';
            }
        };

        const imageReader = new FileReader();
        imageReader.onload = (e) => {
            image.src = e.target.result;
        };
        imageReader.onerror = () => {
            alert('Failed to read the uploaded image.');
            if (loadingMessage) {
                loadingMessage.style.display = 'none';
            }
        };
        imageReader.readAsDataURL(imageUpload);
    } else {
        alert('Please upload an image.');
    }
});
