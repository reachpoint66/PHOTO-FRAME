// Event listener for image upload
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

// Function to combine image and frame
function combineImageWithFrame() {
    const frame = document.getElementById('photoFrame');
    const image = document.getElementById('uploadedImage');

    if (image.src) {
        // Create a canvas to combine the frame and image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size to match frame size
        canvas.width = frame.width;
        canvas.height = frame.height;

        // Draw the uploaded image onto the canvas
        ctx.drawImage(image, 0, 0, frame.width, frame.height);

        // Draw the photo frame onto the canvas
        const frameImg = new Image();
        frameImg.src = frame.src;
        frameImg.onload = function() {
            ctx.drawImage(frameImg, 0, 0, frame.width, frame.height);

            // Create a download link for the combined image
            const combinedImage = canvas.toDataURL('image/png');

            // Set the link to the canvas image for download
            const link = document.getElementById('downloadBtn');
            link.href = combinedImage;
            link.download = 'downloaded_image_with_frame.png';
            link.style.display = 'block';
        };
    } else {
        alert('Please upload an image first.');
    }
}

// Event listener for download button
document.getElementById('downloadBtn').addEventListener('click', function(event) {
    // Only proceed if there's an image to download
    if (!document.getElementById('uploadedImage').src) {
        event.preventDefault();
        alert('No image to download');
    }
});
