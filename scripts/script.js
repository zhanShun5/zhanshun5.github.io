// -----------------------------------  Better Nav "Scroll to" --------------------------
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Get the target element's ID
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Scroll to the element
            targetElement.scrollIntoView({ behavior: 'smooth' });
            
            // Remove the hash from the URL
            history.replaceState(null, '', window.location.pathname);
        }
    });
});

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

    // ----------------------------------- Handle Content button - Collapsable ------------------ 
// Constants
const SCROLL_OFFSET = 200;
const SCROLL_DELAY = 150;


// Cache DOM elements
const allContentContainers = document.querySelectorAll('.content-container');

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

//  KEEP it so the whole button activates the content, instead of only image, for accesibility and ease.
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        content.classList.toggle("active");
        if (this.classList.contains('active')){
            setTimeout(() => content.scrollIntoView(), SCROLL_DELAY);
        }
    });
}


// -----------------------------------  Sidebarbutton --------------------------

// For the Sideprojects
function openLink(evt, contentName) {
    var i, x, tablinks;
  
    x = document.getElementsByClassName("projected-content");
    for (i = 0; i < x.length; i++) {  //make all projected-content invisible
      x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
  
    for (i = 0; i < x.length; i++) {  //Make other tabs inactive / not active
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
      // set the selected conent visible.
          //just changing it's display is enough to activate the animation.
    document.getElementById(contentName).style.display = "block"; 
    evt.currentTarget.className += " active"; //Make selected tab active
}

const sidebarOpenBtn = document.getElementById("sidebar-open-button");

function openSidebar() {
    document.getElementById("sidebar-contact").style.display = "block";
    sidebarOpenBtn.style.display = "none"
}
function closeSidebar() {
    document.getElementById("sidebar-contact").style.display = "none";
    sidebarOpenBtn.style.display = "block"
}

// scrolltotopbutton and sidebaropenbutton appear at spezific scroll level.
function handleScroll() {
    const scrolled = document.documentElement.scrollTop > 100;
    scrollToTopBtn.classList.toggle("visible", scrolled);
    sidebarOpenBtn.classList.toggle("visible", scrolled);
}

// Use passive event listener for better scroll performance
window.addEventListener('scroll', handleScroll, { passive: true });

// Add click event listener using the new scroll function
scrollToTopBtn.addEventListener("click", scrollToTop);
