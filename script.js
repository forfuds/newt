document.getElementById('process-button').addEventListener('click', () => {
    const imageUpload = document.getElementById('image-upload').files[0];

    if (imageUpload) {
        const image = new Image();
        const watermark = new Image();
        watermark.src = 'images/watermark.png';  // 固定的水印图片路径

        image.onload = () => {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);

            watermark.onload = () => {
                const watermarkWidth = image.width / 4;
                const watermarkHeight = (watermark.height / watermark.width) * watermarkWidth;
                ctx.globalAlpha = 0.5;
                ctx.drawImage(watermark, image.width - watermarkWidth - 10, image.height - watermarkHeight - 10, watermarkWidth, watermarkHeight);

                document.getElementById('download-link').style.display = 'block';
                document.getElementById('download-link').href = canvas.toDataURL();
                document.getElementById('download-link').download = 'watermarked-image.png';
            };
        };

        const imageReader = new FileReader();
        imageReader.onload = (e) => {
            image.src = e.target.result;
        };
        imageReader.readAsDataURL(imageUpload);
    } else {
        alert('Please upload an image.');
    }
});
