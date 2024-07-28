const paragraphs = document.querySelectorAll(".heading");
const b = document.querySelectorAll(".m");
const o = document.querySelectorAll(".o");
const c = document.querySelectorAll(".box");

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
    

function isInview(element) { 
    const rect = element.getBoundingClientRect(); 
    return (
         rect.bottom > 0 &&
         rect.top < (window.innerHeight - 150 || document.documentElement.clientHeight - 150) 
    ); 
}

