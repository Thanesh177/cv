const track = document.getElementById("image-track");

const handleOnDown = (e) => {
  track.dataset.mouseDownAt = e.clientX;  // Store the initial mouse position
};

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  // Reset when mouse is released
  track.dataset.prevPercentage = track.dataset.percentage;  // Save the last scroll position
};

const handleOnMove = (e) => {
  if (track.dataset.mouseDownAt === "0") return;  // If no mouse down, don't move

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;  // Calculate movement
  const maxDelta = window.innerWidth / 2;  // Maximum movement based on half the window width

  const percentage = (mouseDelta / maxDelta) * -100;  // Convert movement to percentage of track
  const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage || 0) + percentage;  // Calculate the new percentage

  // Calculate the max scroll percentage based on the track's width and viewport
  const trackWidth = track.scrollWidth;
  const viewportWidth = window.innerWidth;
  const maxScrollPercentage = -((trackWidth - viewportWidth) / trackWidth) * 170;

  // Constrain the percentage to prevent scrolling past the edges
  const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), maxScrollPercentage);

  track.dataset.percentage = nextPercentage;  // Store the current percentage

  // Apply horizontal translation to the track
  track.style.transform = `translateX(${nextPercentage}%)`;

  // Adjust the object position of the images to ensure they move with the track
  for (const image of track.getElementsByClassName("image")) {
    image.style.objectPosition = `${100 + nextPercentage}% center`;
  }
};

// Add event listeners for mouse and touch events
const addEventListeners = () => {
  track.addEventListener("mousedown", handleOnDown);  // Mouse down event to start tracking
  track.addEventListener("mouseup", handleOnUp);  // Mouse up event to stop tracking
  track.addEventListener("mousemove", handleOnMove);  // Mouse move event to update position

  track.addEventListener("touchstart", (e) => handleOnDown(e.touches[0]));  // Touch start for mobile
  track.addEventListener("touchend", handleOnUp);  // Touch end for mobile
  track.addEventListener("touchmove", (e) => {
    e.preventDefault();  // Prevent default scrolling behavior on touch
    handleOnMove(e.touches[0]);  // Move the track based on touch
  });
};

// Initialize event listeners
addEventListeners();

let nextPercentage = 0;
const scrollSpeed = 0.1;  // Speed of scrolling
const maxScrollPercentage = -100;  // Maximum scroll percentage (ends after last image)
let isScrolling = true;  // Track if scrolling is active

// Function to handle automatic scrolling
const autoScroll = () => {
  if (!isScrolling) return; // If scrolling is paused, do nothing

  nextPercentage -= scrollSpeed;

  // If the percentage reaches the max (end of first set of images), reset to 0 (start)
  if (nextPercentage <= maxScrollPercentage) {
    nextPercentage = 0; // Reset to the start of the first set of images
  }

  // Apply the calculated percentage to translate the track horizontally
  track.style.transform = `translateX(${nextPercentage}%)`;

  // Adjust the object position of the images to ensure they follow the scroll
  for (const image of track.getElementsByClassName("image")) {
    image.style.objectPosition = `${100 + nextPercentage}% center`;  // Keep images centered horizontally
  }
};

// Event listener for mouse hover to stop the scrolling
track.addEventListener("click", () => {
  isScrolling = false; // Stop scrolling when mouse enters the track
});

// Event listener for mouse leave to resume the scrolling
track.addEventListener("mouseleave", () => {
  isScrolling = true; // Resume scrolling when mouse leaves the track
});



// Call autoScroll every 20 milliseconds for smooth, continuous scrolling
setInterval(autoScroll, 20);
