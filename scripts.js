const allContentContainers = document.querySelectorAll('.content_container')

document.querySelectorAll('.img_container img').forEach(imgElement => {
    imgElement.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        
        for (const CC of allContentContainers){
            if(CC.title === imgElement.alt ){
                CC.classList.toggle('active');

                // Smooth scroll with slight delay for transition
                setTimeout(() => {
                    CC.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 100);

            }
        }
    });
});


// -----------------------------------  Scroll to the top button --------------------------
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

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