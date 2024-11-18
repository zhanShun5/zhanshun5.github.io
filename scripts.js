document.querySelectorAll('.item img').forEach(item => {
    item.addEventListener('click', function(e) {
        e.stopPropagation();  // stops multiple 'propergation'/calls of the same event from occurring


        // Get the text container within this item
        const item = this.parentElement;
        const textContainer = item.querySelector('.item-container');
        
        // Toggle the active class on the clicked item's text container
        textContainer.classList.toggle('active');
        
        // Close other text containers
        document.querySelectorAll('.item-container').forEach(container => {
            if (container !== textContainer) {
                container.classList.remove('active');
            }
        });
    });
})



// Get the button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Show button when user scrolls down 100px from top
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.classList.add("visible");
    } else {
        scrollToTopBtn.classList.remove("visible");
    }
};

// Scroll to top when button is clicked
scrollToTopBtn.addEventListener("click", function() {
    // For smooth scrolling
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// Modular 
const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modal-content');

function openModal(imgSrc) {
    modal.classList.add('active');
    modalImg.src = imgSrc;
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    setTimeout(() => {
        modalImg.src = ''; // Clear the source after animation
    }, 300);
}

// Close modal with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// Prevent modal from closing when clicking the image
modalImg.addEventListener('click', (e) => {
    e.stopPropagation();
});




// Create an Intersection Observer to handle scroll-based animations
const createScrollFadeAnimation = () => {
    const observerOptions = {
        root: null, // use viewport as root
        threshold: [0.2, 0.9], // trigger at both 10% and 90% visibility
        rootMargin: '-10% 0px' // slightly adjust when animations trigger
    };

    const handleScrollAnimation = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Initial fade in
            if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(5vh)';
                
                // Trigger fade-in animation
                requestAnimationFrame(() => {
                    entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                });
            } 
            // Fade out when element leaves viewport
            else if (!entry.isIntersecting && entry.intersectionRatio <= 0.2) {
                // Trigger fade-out animation
                requestAnimationFrame(() => {
                    entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(-5vh)';
                });
            }
        });
    }, observerOptions);

    // Observe all image items
    document.querySelectorAll('.image-item').forEach(item => {
        // Set initial styles
        item.style.opacity = '0';
        handleScrollAnimation.observe(item);
    });
};

// Initialize the animation when DOM is loaded
document.addEventListener('DOMContentLoaded', createScrollFadeAnimation);