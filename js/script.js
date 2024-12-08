// Event Listener for Image Input
document.getElementById('imageInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const canvas = document.getElementById('uploadedCanvas');
    const ctx = canvas.getContext('2d');

    // Set Canvas Dimensions (Responsive)
    canvas.width = 1080;  // Width of the canvas
    canvas.height = 1080; // Height of the canvas

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                const imageAspectRatio = img.width / img.height;
                const canvasAspectRatio = canvas.width / canvas.height;
                let drawWidth, drawHeight, offsetX, offsetY;

                // Adjust Aspect Ratio for Responsive Preview
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

                // Clear and Redraw the Image on Canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Event Listener for Frame Selection
document.getElementById('frameSelector').addEventListener('change', function () {
    const selectedFrame = this.value;
    const frameElement = document.getElementById('photoFrame');
    frameElement.src = selectedFrame;
});

// Event Listener for Download Button
document.getElementById('downloadBtn').addEventListener('click', function () {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const frame = document.getElementById('photoFrame');
    const uploadedCanvas = document.getElementById('uploadedCanvas');

    // Set Canvas Dimensions for Download
    canvas.width = 1080;  // Width of the final image
    canvas.height = 1080; // Height of the final image

    const frameImg = new Image();
    frameImg.onload = function () {
        // Draw Uploaded Image First
        ctx.drawImage(uploadedCanvas, 0, 0, canvas.width, canvas.height);

        // Overlay Frame on Top
        ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);

        // Download as PNG
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png', 1.0); // Best quality
        link.download = 'photo_with_frame.png';
        link.click();
    };
    frameImg.src = frame.src;
});
