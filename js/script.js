document.getElementById('imageInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const uploadedImage = document.getElementById('uploadedImage');
            uploadedImage.src = e.target.result;
            uploadedImage.style.display = 'block';  // Paparkan gambar yang dimuat naik
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

        // Tentukan saiz kanvas untuk menampung gambar dan bingkai
        canvas.width = frame.naturalWidth;  // Lebar bingkai sebenar
        canvas.height = frame.naturalHeight; // Ketinggian bingkai sebenar

        // Lukis bingkai ke dalam kanvas
        context.drawImage(frame, 0, 0, canvas.width, canvas.height);

        // Fitkan gambar ke dalam bingkai
        const imageAspectRatio = uploadedImage.naturalWidth / uploadedImage.naturalHeight;
        const frameAspectRatio = canvas.width / canvas.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        // Tentukan saiz dan kedudukan gambar supaya ia sesuai dengan bingkai
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

        // Muat turun gambar sebagai fail PNG dengan resolusi tinggi
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png', 1.0); // Gunakan resolusi tinggi
        link.download = 'photo_with_frame.png';
        link.click();
    } else {
        alert('Please upload an image first!');
    }
});
