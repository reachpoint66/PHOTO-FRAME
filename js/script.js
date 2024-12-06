document.getElementById('downloadBtn').addEventListener('click', function () {
    const image = document.getElementById('uploadedImage');
    const photoFrame = document.getElementById('photoFrame');

    if (image.src) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Pastikan kanvas adalah bersaiz dengan frame
        canvas.width = photoFrame.naturalWidth || photoFrame.width;
        canvas.height = photoFrame.naturalHeight || photoFrame.height;

        const frameImage = new Image();
        frameImage.src = photoFrame.src;
        frameImage.onload = function () {
            // Lukis frame pada kanvas
            ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);

            // Lukis gambar yang di-upload pada kanvas
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

            // Cipta pautan untuk muat turun
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'downloaded_image_with_frame.png';
            link.click();
        };
    } else {
        alert('No image to download');
    }
});
