
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

// Parallax effect
const images = document.querySelectorAll('.floating-image');

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight; 

    // Calculate parallax offset / movement for the current mouse position
    images.forEach(image => {
        const speed = parseFloat(image.dataset.speed);
        const x = (mouseX - 0.5) * 1000 * speed;
        const y = (mouseY - 0.5) * 1000 * speed;
        
        image.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Touch support for mobile
document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const mouseX = touch.clientX / window.innerWidth;
    const mouseY = touch.clientY / window.innerHeight;
    
    images.forEach(image => {
        const speed = parseFloat(image.dataset.speed);
        const x = (mouseX - 0.5) * 50 * speed; // Reduced movement for touch
        const y = (mouseY - 0.5) * 50 * speed;
        
        image.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Enhanced hover effects
images.forEach(image => {
    image.addEventListener('mouseleave', () => {
        image.style.zIndex = image.classList.contains('image-1') ? '3' :
                            image.classList.contains('image-2') ? '2' :
                            image.classList.contains('image-3') ? '4' :
                            image.classList.contains('image-4') ? '2' :
                            image.classList.contains('image-5') ? '3' :
                            image.classList.contains('image-6') ? '2' :
                            image.classList.contains('image-7') ? '1' : '5';
    });
});