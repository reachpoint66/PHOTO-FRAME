// Fungsi untuk mengendalikan fail gambar yang dimuat naik
document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const uploadedImage = document.getElementById('uploadedImage');
            uploadedImage.src = 'asset/' + e.target.result;
            uploadedImage.style.display = 'block';  // Paparkan gambar yang dimuat naik
        };
        reader.readAsDataURL(file);
    }
});

// Fungsi untuk memuat turun gambar yang telah dimuat naik
document.getElementById('downloadBtn').addEventListener('click', function() {
    const image = document.getElementById('uploadedImage');
    if (image.src) {
        const link = document.createElement('a');
        link.href = image.src;
        link.download = 'downloaded_image.png';  // Nama fail untuk dimuat turun
        link.click();
    } else {
        alert('No image to download');  // Jika tiada gambar, beri amaran
    }
});
