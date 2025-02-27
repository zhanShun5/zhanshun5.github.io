// Constants
const SCROLL_OFFSET = 200;
const SCROLL_DELAY = 150;

// Cache DOM elements
const allContentContainers = document.querySelectorAll('.content-container');
const allCImages = document.querySelectorAll('.img-container img');

// Helper functions
const scrollToElement = (element) => {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const targetPosition = rect.top + scrollTop - SCROLL_OFFSET;

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
};

const toggleContentContainer = (clickedImageAlt) => {
    allContentContainers.forEach(container => {
        if (container.title === clickedImageAlt) {
            const wasInactive = !container.classList.contains('active');
            container.classList.toggle('active');
            
            if (wasInactive) {
                setTimeout(() => scrollToElement(container), SCROLL_DELAY);
            }
        } 
        // else {
        //     container.classList.remove('active');
        // }
    });
};

// Event handlers
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

// Event listeners
allCImages.forEach(img => img.addEventListener('click', handleImageClick));

