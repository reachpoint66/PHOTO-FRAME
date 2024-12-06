document.getElementById('imageInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const uploadedImage = document.getElementById('uploadedImage');
            uploadedImage.src = e.target.result;
            uploadedImage.style.display = 'block'; // Paparkan gambar yang dimuat naik
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('downloadBtn').addEventListener('click', function () {
    const frame = document.getElementById('photoFrame');
    const uploadedImage = document.getElementById('uploadedImage');

    if (uploadedImage.src) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Tunggu gambar dimuat sepenuhnya
        uploadedImage.onload = function () {
            // Tentukan saiz kanvas berdasarkan saiz bingkai
            canvas.width = frame.naturalWidth;
            canvas.height = frame.naturalHeight;

            // Tentukan saiz gambar untuk memastikan gambar muat dalam bingkai
            const imageAspectRatio = uploadedImage.naturalWidth / uploadedImage.naturalHeight;
            const frameAspectRatio = canvas.width / canvas.height;

            let drawWidth, drawHeight, offsetX, offsetY;

            // Sesuaikan gambar dengan bingkai tanpa mengubah rasio aspek
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

            // Lukis bingkai ke dalam kanvas
            context.drawImage(frame, 0, 0, canvas.width, canvas.height);

            // Lukis gambar yang dimuat naik ke dalam kanvas
            context.drawImage(uploadedImage, offsetX, offsetY, drawWidth, drawHeight);

            // Muat turun gambar sebagai fail PNG dengan resolusi tinggi
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png', 1.0); // Resolusi tinggi
            link.download = 'photo_with_frame.png';
            link.click();
        };

        uploadedImage.src = uploadedImage.src; // Force image reload to trigger onload
    } else {
        alert('Please upload an image first!');
    }
});
