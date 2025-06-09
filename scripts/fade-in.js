window.onload = function(){
    setTimeout(function(){
      document.getElementById("fadein").remove();
    },1000);
};

// document.addEventListener("DOMContentLoaded", function() {
//         const fadeElements = document.querySelectorAll('.fade-in');
        
//         function checkVisibility() {
//           fadeElements.forEach(element => {
//             const elementTop = element.getBoundingClientRect().top;
//             const elementVisible = 150; // How many pixels from the viewport edge to trigger
            
//             if (elementTop < window.innerHeight - elementVisible) {
//               element.classList.add("visible");
//             }
//           });
//         }
        
//         // Check visibility on load
//         checkVisibility();
        
//         // Check visibility on scroll
//         window.addEventListener("scroll", checkVisibility);
//   });