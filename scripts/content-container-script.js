// Constants
const SCROLL_OFFSET = 200;
const SCROLL_DELAY = 150;


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

//  KEEP it so the whole button activates the content, instead of only image, for accesibility and ease.
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        content.classList.toggle("active");
        if (this.classList.contains('active')){
            setTimeout(() => scrollToElement(content), SCROLL_DELAY);
        }
    });
}



// // Ensure script runs after DOM is fully loaded
// document.addEventListener('DOMContentLoaded', initContentContainerScript);

// // Optional: Reinitialize on page show (helps with browser navigation)
// window.addEventListener('pageshow', (event) => {
//     if (event.persisted) {
//         initContentContainerScript();
//     }
// });

// // Function to initialize event listeners and setup
// const initContentContainerScript = () => {
//     // Cache DOM elements
//     const allContentContainers = document.querySelectorAll('.content-container');
//     const allCImages = document.querySelectorAll('.img-container img');

//     // Helper function for scrolling to element
//     const scrollToElement = (element) => {
//         const rect = element.getBoundingClientRect();
//         const scrollTop = window.scrollY || document.documentElement.scrollTop;
//         const targetPosition = rect.top + scrollTop - SCROLL_OFFSET;

//         window.scrollTo({
//             top: targetPosition,
//             behavior: 'smooth'
//         });
//     };

//     var coll = document.getElementsByClassName("collapsible");
//     var i;
    
//     for (i = 0; i < coll.length; i++) {
//         coll[i].addEventListener("click", function() {
//             this.classList.toggle("active");
//             var content = this.nextElementSibling;
//             content.classList.toggle("active");
//             if (this.classList.contains('active')){
//                 setTimeout(() => scrollToElement(content), SCROLL_DELAY);
//             }
//       });
//     }
// };



 