document.getElementById('imageInput').addEventListener('change', function (event) {
    const uploadedImage = document.getElementById('uploadedImage');
    const reader = new FileReader();

    reader.onload = function () {
        uploadedImage.src = reader.result; // Set image source
        uploadedImage.style.display = 'block'; // Show the image
    };

    if (event.target.files.length > 0) {
        reader.readAsDataURL(event.target.files[0]); // Read selected file
    }
});

document.getElementById('downloadBtn').addEventListener('click', function () {
    const frame = document.getElementById('photoFrame');
    const uploadedImage = document.getElementById('uploadedImage');

    if (uploadedImage.src) {
        // Create a canvas to combine image and frame
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Set canvas size to match the frame size
        canvas.width = frame.width;
        canvas.height = frame.height;

        // Draw frame onto canvas
        context.drawImage(frame, 0, 0, canvas.width, canvas.height);

        // Fit image into the frame
        const imageAspectRatio = uploadedImage.naturalWidth / uploadedImage.naturalHeight;
        const frameAspectRatio = canvas.width / canvas.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        // Adjust image size to fit into the frame
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

        // Draw uploaded image into canvas
        context.drawImage(uploadedImage, offsetX, offsetY, drawWidth, drawHeight);

        // Download image as PNG
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png', 1.0); // High resolution
        link.download = 'photo_with_frame.png';
        link.click();
    } else {
        alert('Please upload an image first!');
    }
});
