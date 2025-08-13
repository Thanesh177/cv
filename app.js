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
        { threshold: 0.5 } // Triggers when 30% of the element is visible
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




  document.addEventListener("DOMContentLoaded", () => {
    const line = document.querySelector('.growing-line');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          line.classList.add('animate');
          observer.unobserve(line); // Run only once
        }
      });
    });

    if (line) {
      observer.observe(line);
    }
  });



    document.addEventListener("DOMContentLoaded", () => {
    const textItems = document.querySelectorAll('.text-item');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Optional: animate once
        }
      });
    }, {
      threshold: 0.2 // Adjust if needed
    });

    textItems.forEach(item => {
      observer.observe(item);
    });
  });

  
const repelElements = document.querySelectorAll('.corner');
let draggedEl = null;
let offsetX = 0;
let offsetY = 0;

// Mouse Repel Logic
document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  repelElements.forEach(el => {
    if (el === draggedEl) return; // Skip if dragging

    const rect = el.getBoundingClientRect();
    const elX = rect.left + rect.width / 2;
    const elY = rect.top + rect.height / 2;

    const dx = elX - mouseX;
    const dy = elY - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const repelZone = 200; // More sensitive zone
    const maxOffset = 300; // Max push

    if (distance < repelZone) {
      const angle = Math.atan2(dy, dx);
      const repelStrength = (repelZone - distance) / repelZone;
      const moveX = Math.cos(angle) * repelStrength * maxOffset;
      const moveY = Math.sin(angle) * repelStrength * maxOffset;

      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    } else {
      el.style.transform = 'translate(0, 0)';
    }
  });
});

// Drag logic
repelElements.forEach(el => {
  el.addEventListener('mousedown', (e) => {
    draggedEl = el;
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    el.style.cursor = 'grabbing';
  });
});

document.addEventListener('mouseup', () => {
  if (draggedEl) {
    draggedEl.style.cursor = 'grab';
    draggedEl = null;
  }
});

document.addEventListener('mousemove', (e) => {
  if (draggedEl) {
    e.preventDefault();
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    draggedEl.style.left = `${x}px`;
    draggedEl.style.top = `${y}px`;
    draggedEl.style.right = 'auto';
    draggedEl.style.bottom = 'auto';
    draggedEl.style.transform = 'none'; // Cancel repel during drag
  }
});


  document.querySelectorAll('.box').forEach(box => {
    const video = box.querySelector('.video-bg');
    
    box.addEventListener('mouseenter', () => {
      video.play();
    });

    box.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0; // Optional: reset to start on hover
    });
  });



  const toggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
    toggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    root.setAttribute('data-theme', 'dark');
    toggle.textContent = '☀️';
  }

  toggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    toggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });


  function scrollBoxes(direction) {
    const container = document.querySelector('.scroll-container');
    const scrollAmount = 220; // box width + gap
    container.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  }


    document.addEventListener("DOMContentLoaded", function () {
    const video = document.querySelector('.dark-bg.dark-video');
    if (video) {
      video.playbackRate = 2; // 0.5x speed = half speed (slow motion)
    }
  });