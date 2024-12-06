// Fungsi untuk mengendalikan fail gambar yang dimuat naik
document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const uploadedImage = document.getElementById('uploadedImage');
            uploadedImage.src = e.target.result;

            uploadedImage.style.display = 'block';  // Paparkan gambar yang dimuat naik

            // Sesuaikan gambar dengan bingkai
            uploadedImage.onload = function() {
                fitImageInFrame(uploadedImage);
            };
        };
        reader.readAsDataURL(file);
    }
});

// Fungsi untuk memuat turun gambar yang telah dimuat naik
document.getElementById('downloadBtn').addEventListener('click', function() {
    const image = document.getElementById('uploadedImage');
    if (image.src) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Ambil saiz bingkai dan gambar
        const frame = document.getElementById('photoFrame');
        const frameWidth = frame.width;
        const frameHeight = frame.height;

        canvas.width = frameWidth;
        canvas.height = frameHeight;

        // Lukis bingkai dan gambar ke dalam kanvas
        ctx.drawImage(frame, 0, 0, frameWidth, frameHeight);
        ctx.drawImage(image, 0, 0, frameWidth, frameHeight);

        // Muat turun gambar yang disertakan dengan bingkai
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'downloaded_image_with_frame.png';  // Nama fail untuk dimuat turun
        link.click();
    } else {
        alert('No image to download');
    }
});

// Fungsi untuk sesuaikan gambar dalam bingkai
function fitImageInFrame(img) {
    const frame = document.getElementById('photoFrame');
    const frameAspectRatio = frame.width / frame.height;
    const imageAspectRatio = img.width / img.height;

    if (imageAspectRatio > frameAspectRatio) {
        img.style.width = '100%';
        img.style.height = 'auto';
    } else {
        img.style.width = 'auto';
        img.style.height = '100%';
    }
}
