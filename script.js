document.getElementById('uploadImage').addEventListener('change', handleImageUpload);
document.getElementById('downloadBtn').addEventListener('click', downloadImage);

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const img = new Image();
        img.onload = function () {
            // Display the uploaded image
            document.getElementById('uploadedImage').src = img.src;

            // Prepare the canvas to combine image and frame
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');

            // Set canvas size to match the image size
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the uploaded image first
            ctx.drawImage(img, 0, 0);

            // Now draw the frame
            const frame = document.getElementById('frame');
            ctx.drawImage(frame, 0, 0, img.width, img.height);

            // Show the canvas (optional)
            // canvas.style.display = 'block';
        }
        img.src = URL.createObjectURL(file);
    }
}

function downloadImage() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'photo_with_frame.png';
    link.click();
}
