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
    const image = document.getElementById('uploadedImage');
    const frame = document.getElementById('photoFrame');

    if (image.src) {
        // Create a canvas to combine image and frame
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas size to match frame size
        canvas.width = frame.width;
        canvas.height = frame.height;

        // Draw the frame first
        ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);

        // Draw the uploaded image on top of the frame
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Create a download link for the canvas image
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png'); // Export as PNG
        link.download = 'photo_with_frame.png'; // Set the file name
        link.click();
    } else {
        alert('No image to download');
    }
});
