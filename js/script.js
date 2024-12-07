document.getElementById('imageInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const canvas = document.getElementById('uploadedCanvas');
    const ctx = canvas.getContext('2d');

    // Tentukan saiz canvas mengikut lebar yang sesuai untuk peranti
    canvas.width = window.innerWidth < 1080 ? window.innerWidth : 1080;  // Setelkan lebar mengikut skrin
    canvas.height = canvas.width;  // Setkan ketinggian mengikut lebar untuk memastikan aspek nisbah 1:1

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
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

    // Tentukan saiz canvas mengikut lebar yang sesuai untuk peranti
    canvas.width = window.innerWidth < 1080 ? window.innerWidth : 1080;  // Setelkan lebar mengikut skrin
    canvas.height = canvas.width;  // Setkan ketinggian mengikut lebar untuk memastikan aspek nisbah 1:1

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
