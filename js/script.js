// Fungsi untuk memuat naik imej dan melukisnya pada kanvas
document.getElementById('imageInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const canvas = document.getElementById('uploadedCanvas');
    const ctx = canvas.getContext('2d');

    // Tetapkan saiz tetap kanvas
    canvas.width = 1080;
    canvas.height = 1080;

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                // Kira skala untuk imej agar sesuai sepenuhnya pada kanvas
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan kanvas
                const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                const x = (canvas.width / 2) - (img.width / 2) * scale;
                const y = (canvas.height / 2) - (img.height / 2) * scale;

                ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Fungsi untuk menukar bingkai
document.getElementById('frameSelector').addEventListener('change', function () {
    const selectedFrame = this.value;
    const frameElement = document.getElementById('photoFrame');
    frameElement.src = selectedFrame;
});

// Fungsi untuk memuat turun imej gabungan
document.getElementById('downloadBtn').addEventListener('click', function () {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const frame = document.getElementById('photoFrame');
    const uploadedCanvas = document.getElementById('uploadedCanvas');

    // Tetapkan saiz tetap untuk muat turun
    canvas.width = 1080;
    canvas.height = 1080;

    const frameImg = new Image();
    frameImg.onload = function () {
        // Gabungkan imej yang dimuat naik dan bingkai
        ctx.drawImage(uploadedCanvas, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);

        // Muat turun imej
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png', 1.0); // Kualiti tinggi
        link.download = 'photo_with_frame.png';
        link.click();
    };
    frameImg.src = frame.src;
});
