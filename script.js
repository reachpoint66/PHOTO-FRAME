document.getElementById('downloadBtn').addEventListener('click', function() {
    const image = document.getElementById('uploadedImage');
    const photoFrame = document.getElementById('photoFrame');

    if (image.src) {
        // Create a canvas to combine image and frame
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas size equal to the frame size
        canvas.width = photoFrame.width;
        canvas.height = photoFrame.height;

        // Make sure the frame image is loaded before drawing it
        const frameImage = new Image();
        frameImage.src = photoFrame.src;
        frameImage.onload = function() {
            // Draw the frame first
            ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);

            // Draw the uploaded image on top of the frame, resize if necessary
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            // Create a downloadable link
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'downloaded_image_with_frame.png';
            link.click();
        };
    } else {
        alert('No image to download');
    }
});
