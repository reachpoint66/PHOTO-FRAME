// Untuk memuat naik gambar dan meletakkannya pada bingkai
document.getElementById('imageInput').addEventListener('change', function (e) {
    const file = e.target.files[0]; // Ambil fail yang dimuat naik
    const reader = new FileReader();

    reader.onload = function (event) {
        const uploadedImage = document.getElementById('uploadedImage');
        uploadedImage.src = event.target.result; // Letakkan imej yang dimuat naik pada elemen gambar
        uploadedImage.style.display = 'block'; // Tunjukkan gambar selepas dimuat naik
    };

    reader.readAsDataURL(file); // Baca fail imej
});

// Untuk butang muat turun
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

        // Lukis bingkai ke dalam kanvas
        context.drawImage(frame, 0, 0, canvas.width, canvas.height);

        // Sesuaikan gambar supaya muat dalam bingkai
        const imageAspectRatio = uploadedImage.naturalWidth / uploadedImage.naturalHeight;
        const frameAspectRatio = canvas.width / canvas.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        // Menyesuaikan ukuran gambar dengan bingkai
        if (imageAspectRatio > frameAspectRatio) {
            drawHeight = canvas.height;
            drawWidth = drawHeight * imageAspectRatio;
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        } else {
            drawWidth = canvas.width;
            drawHeight = drawWidth / imageAspectRatio;
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        }

        // Lukis gambar yang dimuat naik ke dalam kanvas
        context.drawImage(uploadedImage, offsetX, offsetY, drawWidth, drawHeight);

        // Muat turun gambar sebagai fail PNG
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png', 1.0); // Resolusi tinggi
        link.download = 'photo_with_frame.png';
        link.click();
    } else {
        alert('Sila muat naik gambar terlebih dahulu!');
    }
});
