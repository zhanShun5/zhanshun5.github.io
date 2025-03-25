// -----------------------------------  Handle Image Modal --------------------------
const initImageModal = () => {
    // Get the modal elements
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("modal-caption");
    const span = document.querySelector(".close");

    // Ensure all elements exist before proceeding
    if (!modal || !modalImg || !captionText || !span) {
        console.error('One or more modal elements are missing');
        return;
    }

    // Function to open modal
    const openModal = (img) => {
        try {
            modal.style.display = "block";
            modalImg.src = img.src;
            captionText.innerHTML = img.alt || 'Image';
            
            // Disable scroll
            document.body.style.overflow = 'hidden';
        } catch (error) {
            console.error('Error opening modal:', error);
        }
    };

    // Function to close modal
    const closeModal = () => {
        try {
            modal.style.display = "none";
            
            // Re-enable scroll
            document.body.style.overflow = 'auto';
        } catch (error) {
            console.error('Error closing modal:', error);
        }
    };

    // Remove previous event listeners to prevent duplicates
    const imgas = document.querySelectorAll(".image-container-img");
    imgas.forEach(function(img) {
        // Remove existing listeners first
        img.removeEventListener('click', () => openModal(img));
        
        // Add new listener
        img.addEventListener('click', () => openModal(img));
    });

    // Close modal when clicking span (x)
    span.removeEventListener('click', closeModal);
    span.addEventListener('click', closeModal);

    // Close modal on Escape key
    document.removeEventListener('keydown', handleEscapeKey);
    document.addEventListener('keydown', handleEscapeKey);

    // Separate function for Escape key to allow removal
    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    }

    // Optional: Close modal when clicking outside the image
    modal.removeEventListener('click', handleOutsideClick);
    modal.addEventListener('click', handleOutsideClick);

    function handleOutsideClick(e) {
        if (e.target === modal) {
            closeModal();
        }
    }
};

// Ensure script runs after DOM is fully loaded
document.addEventListener('DOMContentLoaded', initImageModal);

// Reinitialize on page show (helps with browser navigation)
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        initImageModal();
    }
});


    // ----------------------------------- Handle Disable Scroll 
function disableScroll() {
    document.body.style.overflow = "hidden";
    document.body.style.userSelect = "none";
}

function enableScroll() {
    document.body.style.overflow = "auto";
    document.body.style.userSelect = "auto";
}   


// -----------------------------------  Scroll to the top button --------------------------
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Check if smooth scroll is supported
const isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;

// Scroll to top function with fallback
function scrollToTop() {
    if (isSmoothScrollSupported) {
        // Use smooth scrolling for supported browsers
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    } else {
        // Fallback for browsers without smooth scrolling support
        window.scrollTo(0, 0);
    }
}

// Optimized scroll handler
function handleScroll() {
    const scrolled = document.documentElement.scrollTop > 100;
    scrollToTopBtn.classList.toggle("visible", scrolled);
}

// Use passive event listener for better scroll performance
window.addEventListener('scroll', handleScroll, { passive: true });

// Add click event listener using the new scroll function
scrollToTopBtn.addEventListener("click", scrollToTop);




// // On click fullscreen
// document.querySelectorAll('CCVideo').addEventListener('click', function() {
//     if (this.requestFullscreen) {
//       this.requestFullscreen();
//     } else if (this.webkitRequestFullscreen) { /* Safari */
//       this.webkitRequestFullscreen();
//     } else if (this.msRequestFullscreen) { /* IE11 */
//       this.msRequestFullscreen();
//     }
// });

