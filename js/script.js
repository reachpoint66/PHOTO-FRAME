// Fungsi untuk mengendalikan fail gambar yang dimuat naik
document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const uploadedImage = document.getElementById('uploadedImage');
            uploadedImage.src = e.target.result;
            uploadedImage.style.display = 'block';  // Paparkan gambar yang dimuat naik
        };
        reader.readAsDataURL(file);
    }
});

// Fungsi untuk memuat turun gambar yang telah dimuat naik bersama bingkai
document.getElementById('downloadBtn').addEventListener('click', function() {
    const frame = document.getElementById('photoFrame');
    const image = document.getElementById('uploadedImage');

    if (image.src) {
        // Create a canvas to combine the frame and the uploaded image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas size to match the uploaded image
        canvas.width = image.width;
        canvas.height = image.height;

        // Draw the uploaded image
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Draw the photo frame on top
        const frameImage = new Image();
        frameImage.onload = function() {
            ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);
            
            // Download the image as PNG
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'image_with_frame.png';  // Name of the downloaded file
            link.click();
        };
        frameImage.src = frame.src;  // Use the frame image source
    } else {
        alert('No image to download');
    }
});
