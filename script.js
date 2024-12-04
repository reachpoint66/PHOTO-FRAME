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
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const frame = document.getElementById('photoFrame');
    const uploadedImage = document.getElementById('uploadedImage');

    canvas.width = frame.width;
    canvas.height = frame.height;

    ctx.drawImage(frame, 0, 0, frame.width, frame.height); // Draw frame
    ctx.drawImage(uploadedImage, 0, 0, uploadedImage.width, uploadedImage.height); // Draw uploaded image

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'downloaded_image.png';
    link.click();
});
