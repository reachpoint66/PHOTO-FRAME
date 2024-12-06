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
    const uploadedImage = document.getElementById('uploadedImage');
    const photoFrame = document.getElementById('photoFrame');

    if (uploadedImage.src) {
        // Cipta kanvas untuk menggabungkan gambar
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Tetapkan saiz kanvas mengikut saiz bingkai
        canvas.width = photoFrame.width;
        canvas.height = photoFrame.height;

        // Lukis bingkai dan gambar
        ctx.drawImage(photoFrame, 0, 0, canvas.width, canvas.height);  // Lukis bingkai
        ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);  // Lukis gambar

        // Muat turun gambar gabungan
        const link = document.createElement('a');
        link.href = canvas.toDataURL();  // Ambil imej dari kanvas
        link.download = 'downloaded_image.png';  // Nama fail untuk dimuat turun
        link.click();
    } else {
        alert('No image to download');
    }
});
