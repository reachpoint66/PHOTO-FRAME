document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const uploadedImage = document.getElementById('uploadedImage');
            uploadedImage.src = e.target.result;
            uploadedImage.style.display = 'block';  // Show the uploaded image
        };
        reader.readAsDataURL(file);
    }
});

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

        // Draw the frame (make sure the frame image is loaded)
        ctx.drawImage(photoFrame, 0, 0, canvas.width, canvas.height);

        // Draw the uploaded image on top of the frame
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Create a downloadable link
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'downloaded_image_with_frame.png';
        link.click();
    } else {
        alert('No image to download');
    }
});
