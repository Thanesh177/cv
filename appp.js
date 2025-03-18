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

  setInterval(autoScroll, 20);

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
