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