const paragraphs = document.querySelectorAll(".heading");
const b = document.querySelectorAll(".m");
const o = document.querySelectorAll(".o");
const c = document.querySelectorAll(".box");

document.addEventListener("DOMContentLoaded", function () {
    const intro = document.querySelector("#intro");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.3 } // Triggers when 30% of the element is visible
    );

    observer.observe(intro);
});


document.addEventListener("scroll", function(){ 
    paragraphs.forEach((paragraph) => { 
        if(isInview(paragraph)){ 
            paragraph.classList.add("heading--visible");
        } 
    });

    b.forEach((element) => {
        if(isInview(element)){
            element.classList.add("m--visible");
        }
    });

    o.forEach((element) => {
        if(isInview(element)){
            element.classList.add("o--visible");
        }
    });
    
// reveling one box at a time does not wk because then we have to scroll again and to
// every single box
    c.forEach((element) => {
        if(isInview(element)){
            element.classList.add("box--visible");
        }
    });

}); 

//Action 
    
document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".banner .slider");
    const items = document.querySelectorAll(".banner .slider .item");

    // Track whether an image is clicked
    let isPaused = false;

    items.forEach(item => {
        item.addEventListener("click", function (event) {
            // Toggle pause class on the slider
            if (!isPaused) {
                slider.classList.add("paused"); // Stop rotation
                item.classList.add("active");  // Pop out the clicked image
                isPaused = true;
            } else {
                slider.classList.remove("paused"); // Resume rotation
                items.forEach(el => el.classList.remove("active")); // Remove pop-out
                isPaused = false;
            }
    

            // Prevent click from propagating to window
            event.stopPropagation();
        });
    });

    // Resume rotation when clicking outside the slider
    document.addEventListener("click", function (event) {
        if (!slider.contains(event.target)) {
            slider.classList.remove("paused");
            items.forEach(el => el.classList.remove("active"));
            isPaused = false;
        }
    });

});

//typing effect


document.addEventListener("DOMContentLoaded", function () {
    const phrases = ["Hi, This is Thanesh", "Programmer", "Web Developer", "APP-Designer", "Freelancer"];
    let index = 0;
    const textElement = document.querySelector(".main p");

    function changeText() {
        textElement.textContent = phrases[index]; // Change text
        index = (index + 1) % phrases.length; // Cycle through phrases
    }

    setInterval(changeText, 4000); // Change text every 4 seconds
});



function isInview(element) { 
    const rect = element.getBoundingClientRect(); 
    return (
         rect.bottom > 0 &&
         rect.top < (window.innerHeight - 150 || document.documentElement.clientHeight - 150) 
    ); 
}
