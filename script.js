// Fungsi untuk muat naik gambar
document.getElementById('imageInput').addEventListener('change', function (event) {
    const file = event.target.files[0]; // Dapatkan fail yang dimuat naik
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const uploadedImage = document.getElementById('uploadedImage');
            uploadedImage.src = e.target.result; // Tetapkan sumber gambar
            uploadedImage.style.display = 'block'; // Tunjukkan gambar
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select an image to upload.');
    }
});

// Fungsi untuk muat turun gambar
document.getElementById('downloadBtn').addEventListener('click', function () {
    const image = document.getElementById('uploadedImage');
    const photoFrame = document.getElementById('photoFrame');

    if (image.src) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Saiz kanvas sama dengan frame
        canvas.width = photoFrame.naturalWidth || photoFrame.width;
        canvas.height = photoFrame.naturalHeight || photoFrame.height;

        const frameImage = new Image();
        frameImage.src = photoFrame.src;
        frameImage.onload = function () {
            // Lukis frame dan gambar
            ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);

            const imgAspectRatio = image.naturalWidth / image.naturalHeight;
            const frameAspectRatio = canvas.width / canvas.height;

            let drawWidth, drawHeight;
            if (imgAspectRatio > frameAspectRatio) {
                drawWidth = canvas.width;
                drawHeight = canvas.width / imgAspectRatio;
            } else {
                drawHeight = canvas.height;
                drawWidth = canvas.height * imgAspectRatio;
            }

            const xOffset = (canvas.width - drawWidth) / 2;
            const yOffset = (canvas.height - drawHeight) / 2;

            ctx.drawImage(image, xOffset, yOffset, drawWidth, drawHeight);

            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'downloaded_image_with_frame.png';
            link.click();
        };
    } else {
        alert('No image to download');
    }
});
