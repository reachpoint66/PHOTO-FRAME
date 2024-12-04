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
    const uploadedImage = document.getElementById('uploadedImage');
    const photoFrame = document.getElementById('photoFrame');

    if (uploadedImage.src) {
        // Create a canvas to draw the image and frame
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas dimensions to the size of the frame
        const width = photoFrame.width;   // Width of the frame
        const height = photoFrame.height; // Height of the frame
        canvas.width = width;
        canvas.height = height;

        // First, draw the frame on the canvas
        ctx.drawImage(photoFrame, 0, 0, width, height);

        // Then, draw the uploaded image on top of the frame
        ctx.drawImage(uploadedImage, 0, 0, width, height);

        // Create a data URL of the canvas image
        const imageData = canvas.toDataURL('image/png');

        // Create a download link
        const link = document.createElement('a');
        link.href = imageData;
        link.download = 'downloaded_image_with_frame.png';
        link.click();
    } else {
        alert('No image to download');
    }
});
