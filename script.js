document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const uploadedImage = document.getElementById('uploadedImage');
            uploadedImage.src = e.target.result;
            uploadedImage.style.display = 'block'; // Papar gambar
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('downloadBtn').addEventListener('click', function() {
    const frame = document.getElementById('photoFrame');
    const uploadedImage = document.getElementById('uploadedImage');

    if (!uploadedImage.src) {
        alert('Sila muat naik gambar dahulu.');
        return;
    }

    // Cipta kanvas dengan saiz sama seperti frame
    const canvas = document.createElement('canvas');
    canvas.width = frame.naturalWidth;
    canvas.height = frame.naturalHeight;

    const ctx = canvas.getContext('2d');

    // Lukis gambar dan frame pada kanvas
    ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height); // Lukis gambar
    ctx.drawImage(frame, 0, 0, canvas.width, canvas.height); // Lukis frame

    // Muat turun sebagai imej
    const link = document.createElement('a');
    link.download = 'photo_with_frame.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});
