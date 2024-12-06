document.getElementById('imageInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const canvas = document.getElementById('uploadedCanvas');
    const ctx = canvas.getContext('2d');

    // Pastikan saiz canvas sama dengan bingkai
    canvas.width = 1200;
    canvas.height = 1200;

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                // Fit gambar dalam canvas
                const imageAspectRatio = img.width / img.height;
                const canvasAspectRatio = canvas.width / canvas.height;

                let drawWidth, drawHeight, offsetX, offsetY;

                if (imageAspectRatio > canvasAspectRatio) {
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

                ctx.clearRect(0, 0, canvas.width, canvas.height); // Kosongkan canvas
                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Tukar bingkai berdasarkan pilihan pengguna
document.getElementById('frameSelector').addEventListener('change', function () {
    const selectedFrame = this.value;
    const frameElement = document.getElementById('photoFrame');
    frameElement.src = selectedFrame; // Tukar bingkai
});

// Muat turun gambar
document.getElementById('downloadBtn').addEventListener('click', function () {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const frame = document.getElementById('photoFrame');
    const uploadedCanvas = document.getElementById('uploadedCanvas');

    // Set saiz canvas untuk muat bingkai
    canvas.width = 1200;
    canvas.height = 1200;

    // Lukis bingkai ke dalam canvas baru
    const frameImg = new Image();
    frameImg.onload = function () {
        ctx.drawImage(uploadedCanvas, 0, 0, canvas.width, canvas.height); // Gambar dimuat naik
        ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height); // Bingkai

        // Muat turun gambar
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png', 1.0); // Resolusi tinggi
        link.download = 'photo_with_frame.png';
        link.click();
    };
    frameImg.src = frame.src;
});
