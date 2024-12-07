document.getElementById('downloadBtn').addEventListener('click', function () {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const frame = document.getElementById('photoFrame');
    const uploadedCanvas = document.getElementById('uploadedCanvas');

    // Dapatkan lebar dan tinggi imej yang dimuat naik
    const imgWidth = uploadedCanvas.width;
    const imgHeight = uploadedCanvas.height;

    // Tetapkan saiz canvas mengikut saiz gambar yang sebenar
    canvas.width = imgWidth;
    canvas.height = imgHeight;

    const frameImg = new Image();
    frameImg.onload = function () {
        // Lukis imej pada canvas dengan saiz yang betul
        ctx.drawImage(uploadedCanvas, 0, 0, imgWidth, imgHeight);
        ctx.drawImage(frameImg, 0, 0, imgWidth, imgHeight);

        // Buatkan pautan untuk memuat turun imej dalam kualiti tinggi
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png', 1.0);  // Gunakan kualiti terbaik (1.0)
        link.download = 'photo_with_frame.png';
        link.click();
    };
    frameImg.src = frame.src;
});
