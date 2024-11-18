// Cache frequently used DOM elements
const allContainers = document.querySelectorAll('.item-container');
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modal-content');

// Image click handler with improved performance
document.querySelectorAll('.item img').forEach(imgElement => {
    imgElement.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const textContainer = this.closest('.item').querySelector('.item-container');
        
        // Toggle active class
        textContainer.classList.toggle('active');
        
        // Close other containers
        // allContainers.forEach(container => {
        //     if (container !== textContainer) {
        //         container.classList.remove('active');
        //     }
        // });

        // Smooth scroll with slight delay for transition
        setTimeout(() => {
            this.scrollIntoView({ behavior: "smooth" });
        }, 300);
    });
});

// Optimized scroll handler
function handleScroll() {
    const scrolled = document.documentElement.scrollTop > 100;
    scrollToTopBtn.classList.toggle("visible", scrolled);
}

// Use passive event listener for better scroll performance
window.addEventListener('scroll', handleScroll, { passive: true });

// Scroll to top with smooth behavior
scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Modal functions with improved error handling
function openModal(imgSrc) {
    if (!imgSrc) return;
    modal.classList.add('active');
    modalImg.src = imgSrc;
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => modalImg.src = '', 300);
}

// Event listeners for modal
modal.addEventListener('click', closeModal);
modalImg.addEventListener('click', e => e.stopPropagation());
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});