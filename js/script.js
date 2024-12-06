document.getElementById('downloadBtn').addEventListener('click', function () {
    const frame = document.getElementById('photoFrame');
    const uploadedImage = document.getElementById('uploadedImage');

    if (uploadedImage.src) {
        // Buat kanvas untuk menggabungkan gambar dan bingkai
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Tetapkan saiz kanvas sama dengan saiz bingkai
        canvas.width = frame.width;
        canvas.height = frame.height;

        // Lukis gambar ke dalam kanvas
        context.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);

        // Lukis bingkai ke dalam kanvas
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

document.getElementById('imageInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const uploadedImage = document.getElementById('uploadedImage');
        uploadedImage.src = e.target.result;
        uploadedImage.style.display = 'block'; // Menunjukkan gambar yang dimuat naik
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});
