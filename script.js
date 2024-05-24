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

            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);

            const watermark = new Image();
            watermark.src = 'images/watermark.png';  // 固定的水印图片路径

            watermark.onload = () => {
                const watermarkWidth = image.width / 4;
                const watermarkHeight = (watermark.height / watermark.width) * watermarkWidth;
                ctx.globalAlpha = 0.5;
                ctx.drawImage(watermark, image.width - watermarkWidth - 10, image.height - watermarkHeight - 10, watermarkWidth, watermarkHeight);

                // 隐藏加载提示
                if (loadingMessage) {
                    loadingMessage.style.display = 'none';
                }

                // 显示 canvas 和下载链接
                document.getElementById('canvas').style.display = 'block';
                document.getElementById('download-link').style.display = 'block';
                document.getElementById('download-link').href = canvas.toDataURL();
                document.getElementById('download-link').download = 'watermarked-image.png';

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
