const allContentContainers = document.querySelectorAll('.content_container')

document.querySelectorAll('.img_container img').forEach(imgElement => {
    imgElement.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        
        for (const CC of allContentContainers){
            if(CC.title !== imgElement.alt) {
                CC.classList.remove('active');
            } 
            else if(CC.title === imgElement.alt ){
                // Check if the container is NOT already active before scrolling
                if (!CC.classList.contains('active')) {
                    setTimeout(() => {
                        // Get element position
                        const rect = CC.getBoundingClientRect();
                        const scrollTop = window.scrollY || document.documentElement.scrollTop;
                        const targetPosition = rect.top + scrollTop - 200; // 100px offset from top

                        // Smooth scroll to element with offset
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }, 400);
                }
                CC.classList.toggle('active');
            }
        }
    });
});


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