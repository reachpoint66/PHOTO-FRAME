document.getElementById('downloadBtn').addEventListener('click', function () {
    const frame = document.getElementById('photoFrame');
    const uploadedImage = document.getElementById('uploadedImage');

    if (uploadedImage.src) {
        // Tetapkan resolusi kanvas ke 1200x1200
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 1200;
        canvas.height = 1200;

        // Lukis bingkai foto pada kanvas
        context.drawImage(frame, 0, 0, canvas.width, canvas.height);

        // Hitung skala gambar untuk muat dalam bingkai
        const imageAspectRatio = uploadedImage.naturalWidth / uploadedImage.naturalHeight;
        const frameAspectRatio = canvas.width / canvas.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (imageAspectRatio > frameAspectRatio) {
            drawHeight = canvas.height;
            drawWidth = drawHeight * imageAspectRatio;
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        } else {
            drawWidth = canvas.width;
            drawHeight = drawWidth / imageAspectRatio;
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        }

        // Lukis gambar yang dimuat naik di belakang bingkai
        context.drawImage(uploadedImage, offsetX, offsetY, drawWidth, drawHeight);

        // Muat turun gambar yang telah digabungkan
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png', 1.0); // Resolusi tinggi
        link.download = 'photo_with_frame.png';
        link.click();
    } else {
        alert('Sila muat naik gambar terlebih dahulu!');
    }
});
