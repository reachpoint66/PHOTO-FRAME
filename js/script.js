document.getElementById('downloadBtn').addEventListener('click', function () {
    const uploadedImage = document.getElementById('uploadedImage');
    const photoFrame = document.getElementById('photoFrame');

    if (uploadedImage.src && photoFrame.src) {
        // Buat kanvas
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Tentukan saiz kanvas mengikut saiz bingkai
        canvas.width = photoFrame.naturalWidth;
        canvas.height = photoFrame.naturalHeight;

        // Lukiskan bingkai ke atas kanvas
        context.drawImage(photoFrame, 0, 0, canvas.width, canvas.height);

        // Fitkan gambar yang dimuat naik ke dalam bingkai
        const scaleWidth = canvas.width * 0.8; // Saiz relatif gambar ke bingkai
        const scaleHeight = canvas.height * 0.8;

        const offsetX = (canvas.width - scaleWidth) / 2;
        const offsetY = (canvas.height - scaleHeight) / 2;

        context.drawImage(uploadedImage, offsetX, offsetY, scaleWidth, scaleHeight);

        // Muat turun gambar gabungan
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png', 1.0); // Tingkatkan resolusi
        link.download = 'framed_image.png';
        link.click();
    } else {
        alert('Please upload an image first.');
    }
});
