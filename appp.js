document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("image-track");

  // Initialize data attributes for tracking
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = "0";
  track.dataset.percentage = "0";

  // Variables to control smooth dragging
  let targetPercentage = 0;
  let currentPercentage = 0;

  // Functions to handle drag and touch events
  const handleOnDown = (e) => {
    track.dataset.mouseDownAt = e.clientX;
  };

  const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
  };

  const handleOnMove = (e) => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth / 2;
    const percentage = (mouseDelta / maxDelta) * -100;
    const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage || 0) + percentage;

    // Calculate maximum scroll percentage (based on content width)
    const trackWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;
    const maxScrollPercentage = -((trackWidth - viewportWidth) / trackWidth) * 170;

    // Constrain the new percentage so it doesn't exceed boundaries
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), maxScrollPercentage);
    track.dataset.percentage = nextPercentage;
    targetPercentage = nextPercentage;
  };

  // Add mouse and touch event listeners
  track.addEventListener("mousedown", handleOnDown);
  track.addEventListener("mouseup", handleOnUp);
  track.addEventListener("mousemove", handleOnMove);
  track.addEventListener("touchstart", (e) => handleOnDown(e.touches[0]));
  track.addEventListener("touchend", handleOnUp);
  track.addEventListener("touchmove", (e) => {
    e.preventDefault();
    handleOnMove(e.touches[0]);
  });

  // Auto-scroll functionality
  let autoScrollActive = true;
  const scrollSpeed = 0.1;
  const maxScrollPercentage = -100;

  const autoScroll = () => {
    if (autoScrollActive) {
      targetPercentage -= scrollSpeed;
      if (targetPercentage <= maxScrollPercentage) {
        targetPercentage = 0;
      }
    }
  };

  // Toggle auto-scroll on track interaction
  track.addEventListener("click", () => {
    autoScrollActive = false;
  });
  track.addEventListener("mouseleave", () => {
    autoScrollActive = true;
  });

  setInterval(autoScroll, 40);

  // Smooth update function using requestAnimationFrame
  const updatePosition = () => {
    // Smoothly approach the target percentage (adjust the 0.1 factor to control smoothness)
    currentPercentage += (targetPercentage - currentPercentage) * 0.1;
    track.style.transform = `translateX(${currentPercentage}%)`;
    for (const image of track.getElementsByClassName("image")) {
      image.style.objectPosition = `${100 + currentPercentage}% center`;
    }
    requestAnimationFrame(updatePosition);
  };

  updatePosition();
});

//intro

document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro');
  if (!intro) return;

  const obs = new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
      intro.classList.add('visible');
      observer.unobserve(intro);
    }
  }, { threshold: 0.3 });

  obs.observe(intro);
});

//timeline
document.addEventListener('DOMContentLoaded', () => {
  const tl = document.querySelector('.timeline');
  if (!tl) return;

  const obs = new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
      tl.classList.add('visible');
      observer.unobserve(tl);
    }
  }, { threshold: 0.2 });

  obs.observe(tl);
});

 
//fadeup animation
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.fadeup');
  if (!items.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        // element has entered view (from either direction)
        entry.target.classList.add('visible');
      } else {
        // element has left view (above or below)
        entry.target.classList.remove('visible');
      }
    });
  }, {
    threshold: 1  // fire when 15% of the element is visible
  });

  items.forEach(el => io.observe(el));
});

document.addEventListener('DOMContentLoaded', () => {
  const boxes = document.querySelectorAll('.box.fadeup');
  if (!boxes.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.7
  });

  boxes.forEach(box => io.observe(box));
});
