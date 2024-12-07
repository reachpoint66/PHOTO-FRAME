function adjustCanvasSize() {
    const frameElement = document.querySelector('.frame');
    const canvas = document.getElementById('uploadedCanvas');

    canvas.width = frameElement.offsetWidth;
    canvas.height = frameElement.offsetHeight;
}

function updatePreviewCanvas(file) {
    const previewCanvas = document.getElementById('previewCanvas');
    const ctx = previewCanvas.getContext('2d');
    const frameElement = document.getElementById('previewFrame');

    previewCanvas.width = frameElement.offsetWidth;
    previewCanvas.height = frameElement.offsetHeight;

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
                ctx.drawImage(img, 0, 0, previewCanvas.width, previewCanvas.height);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

document.getElementById('imageInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const canvas = document.getElementById('uploadedCanvas');
    const ctx = canvas.getContext('2d');

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    updatePreviewCanvas(file);
});

document.getElementById('frameSelector').addEventListener('change', function () {
    const selectedFrame = this.value;
    document.getElementById('photoFrame').src = selectedFrame;
    document.getElementById('previewFrame').src = selectedFrame;
});

document.getElementById('downloadBtn').addEventListener('click', function () {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const frame = document.getElementById('photoFrame');
    const uploadedCanvas = document.getElementById('uploadedCanvas');

    canvas.width = uploadedCanvas.width;
    canvas.height = uploadedCanvas.height;

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

window.addEventListener('resize', adjustCanvasSize);
adjustCanvasSize();
