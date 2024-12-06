document.getElementById('imageInput').addEventListener('change', function (event) {
    const uploadedImage = document.getElementById('uploadedImage');
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            uploadedImage.src = e.target.result; // Set gambar yang dimuat naik
            uploadedImage.style.display = 'block'; // Paparkan gambar
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('downloadBtn').addEventListener('click', function () {
    const frame = document.getElementById('photoFrame');
    const uploadedImage = document.getElementById('uploadedImage');

    if (uploadedImage.src) {
        // Buat kanvas untuk menggabungkan gambar dan bingkai
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Tetapkan saiz kanvas kepada 1200x1200
        canvas.width = 1200;
        canvas.height = 1200;

        // Lukis gambar yang dimuat naik di belakang
        context.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);

        // Lukis bingkai di atas gambar
        context.drawImage(frame, 0, 0, canvas.width, canvas.height);

        // Muat turun gambar sebagai fail PNG
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png', 1.0); // Resolusi tinggi
        link.download = 'photo_with_frame.png';
        link.click();
    } else {
        alert('Please upload an image first!');
    }
});
