document.getElementById('downloadBtn').addEventListener('click', function() {
    const frame = document.getElementById('photoFrame');
    const uploadedImage = document.getElementById('uploadedImage');

    if (!uploadedImage.src) {
        alert('Sila muat naik gambar dahulu.');
        return;
    }

    // Gabungkan frame dan gambar
    const canvas = document.createElement('canvas');
    canvas.width = frame.width;
    canvas.height = frame.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(frame, 0, 0, canvas.width, canvas.height); // Lukis frame
    ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height); // Lukis gambar

    // Buat muat turun
    const link = document.createElement('a');
    link.download = 'photo_with_frame.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});
