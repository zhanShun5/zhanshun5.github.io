// Constants
const SCROLL_OFFSET = 200;
const SCROLL_DELAY = 150;

// Function to initialize event listeners and setup
const initContentContainerScript = () => {
    // Cache DOM elements
    const allContentContainers = document.querySelectorAll('.content-container');
    const allCImages = document.querySelectorAll('.img-container img');

    // Helper function for scrolling to element
    const scrollToElement = (element) => {
        const rect = element.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop - SCROLL_OFFSET;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    };

    // Helper function to toggle content containers
    const toggleContentContainer = (clickedImageAlt) => {
        allContentContainers.forEach(container => {
            if (container.title === clickedImageAlt) {
                const wasInactive = !container.classList.contains('active');
                container.classList.toggle('active');
                
                if (wasInactive) {
                    setTimeout(() => scrollToElement(container), SCROLL_DELAY);
                }
            }
        });
    };

    // Event handler for image clicks
    const handleImageClick = (e) => {
        try {
            e.preventDefault();
            e.stopPropagation();
            
            const imgElement = e.currentTarget;
            console.log('Clicked image alt:', imgElement.alt);
            toggleContentContainer(imgElement.alt);
        } catch (error) {
            console.error('Error handling image click:', error);
        }
    };

    // Remove previous event listeners to prevent multiple attachments
    allCImages.forEach(img => {
        img.removeEventListener('click', handleImageClick);
        img.addEventListener('click', handleImageClick);
    });
};

// Ensure script runs after DOM is fully loaded
document.addEventListener('DOMContentLoaded', initContentContainerScript);

// Optional: Reinitialize on page show (helps with browser navigation)
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        initContentContainerScript();
    }
});


 