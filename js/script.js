document.getElementById('imageInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const canvas = document.getElementById('uploadedCanvas');
    const ctx = canvas.getContext('2d');

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                const frame = document.querySelector('.frame');
                const frameWidth = frame.offsetWidth; // Saiz lebar frame semasa
                const frameHeight = frame.offsetHeight; // Saiz tinggi frame semasa

                canvas.width = frameWidth;
                canvas.height = frameHeight;

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

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('frameSelector').addEventListener('change', function () {
    const selectedFrame = this.value;
    const frameElement = document.getElementById('photoFrame');
    frameElement.src = selectedFrame;
});

document.getElementById('downloadBtn').addEventListener('click', function () {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const frame = document.getElementById('photoFrame');
    const uploadedCanvas = document.getElementById('uploadedCanvas');

    const frameElement = document.querySelector('.frame');
    const frameWidth = frameElement.offsetWidth;
    const frameHeight = frameElement.offsetHeight;

    canvas.width = frameWidth;
    canvas.height = frameHeight;

    const frameImg = new Image();
    frameImg.onload = function () {
        ctx.drawImage(uploadedCanvas, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png', 1.0);
        link.download = 'photo_with_frame.png';
        link.click();
    };
    frameImg.src = frame.src;
});

// Pastikan canvas disesuaikan dengan bingkai pada resize skrin
window.addEventListener('resize', function () {
    const frame = document.querySelector('.frame');
    const canvas = document.getElementById('uploadedCanvas');

    const frameWidth = frame.offsetWidth;
    const frameHeight = frame.offsetHeight;

    canvas.width = frameWidth;
    canvas.height = frameHeight;
});

// Panggil fungsi resize semasa laman dimuat
window.dispatchEvent(new Event('resize'));
