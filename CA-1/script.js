let images = document.querySelectorAll('.gallery img');
let lightbox = document.getElementById('lightbox');
let lightboxImg = document.getElementById('lightbox-img');
let currentIndex = 0;

// Open Lightbox
images.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentIndex = index;
        showImage();
        lightbox.style.display = 'flex';
    });
});

function showImage() {
    lightboxImg.src = images[currentIndex].src;
}

function closeLightbox() {
    lightbox.style.display = 'none';
}

function changeImage(direction) {
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    showImage();
}

// Filter Images (Bonus Feature)
function filterImages(category) {
    let allImages = document.querySelectorAll('.image');

    allImages.forEach(img => {
        if (category === 'all') {
            img.style.display = "block";
        } else {
            img.style.display = img.classList.contains(category) ? "block" : "none";
        }
    });
}