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


// Use passive event listener for better scroll performance
window.addEventListener('scroll', handleScroll, { passive: true });
