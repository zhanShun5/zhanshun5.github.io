// -----------------------------------  Handle Image Modal --------------------------
// Get the modal
const modal = document.getElementById("myModal");
const modalImg = document.getElementById("img01");
const captionText = document.getElementById("modal-caption");

// Get the image and insert it inside the modal - use its "alt" text as a caption
const imgas = document.querySelectorAll(".image-container-img");
imgas.forEach(function(img) {
    img.addEventListener('click' ,function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
        disableScroll()
      })
});


// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.addEventListener('click', () => {
    modal.style.display = "none";
    enableScroll();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') 
        modal.style.display = "none";
        enableScroll();
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




// On click fullscreen
document.querySelectorAll('CCVideo').addEventListener('click', function() {
    if (this.requestFullscreen) {
      this.requestFullscreen();
    } else if (this.webkitRequestFullscreen) { /* Safari */
      this.webkitRequestFullscreen();
    } else if (this.msRequestFullscreen) { /* IE11 */
      this.msRequestFullscreen();
    }
});
