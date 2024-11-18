// Store containers reference for better performance
const allContainers = document.querySelectorAll('.item-container');

// Select all images within items
document.querySelectorAll('.item img').forEach(imgElement => {
    imgElement.addEventListener('click', function(e) {
        e.stopPropagation();  // stops multiple propagation/calls of the same event from occurring
        e.preventDefault();
        // Get the text container within this item
        const parentItem = this.parentElement;
        const textContainer = parentItem.querySelector('.item-container');
        
        
        // Close other text containers using cached selector
        // allContainers.forEach(container => {
        //     if (container !== textContainer) {
        //         container.classList.remove('active');
        //     }
        // });

        // Wait for any CSS transitions to complete (adjust timeout as needed)
        setTimeout(() => {
            // Safely scroll to target element if it exists
            imgElement.scrollIntoView(true, { behavior: "auto"});
            // Toggle the active class on the clicked item's text container
        }, 300);// Adjust this delay to match your CSS transition duration
        textContainer.classList.toggle('active');
    });
});


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


// Modular  (Image window)
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


