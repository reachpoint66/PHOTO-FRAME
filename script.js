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

    if (uploadedImage.src && photoFrame.src) {
        // Create a canvas to combine both images
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size to match the frame
        canvas.width = photoFrame.width;
        canvas.height = photoFrame.height;
        
        // Draw the photo frame first
        ctx.drawImage(photoFrame, 0, 0, canvas.width, canvas.height);

        // Draw the uploaded image on top of the frame
        const image = new Image();
        image.src = uploadedImage.src;
        image.onload = function() {
            const imageWidth = canvas.width;
            const imageHeight = canvas.height;
            
            // Resize the image to fit the frame
            ctx.drawImage(image, 0, 0, imageWidth, imageHeight);

            // Now trigger download with the merged image
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'downloaded_image_with_frame.png';
            link.click();
        };
    } else {
        alert('No image to download');
    }
});
