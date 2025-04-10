// Vimeo Player SDK
import Player from "@vimeo/player";

// Constants
const VIMEO_VIDEO_ID = "1072643347"; // This can be changed per page as needed

// State Management
let player = null;

// Initialize Vimeo Player
document.addEventListener("DOMContentLoaded", async () => {
  // DOM Elements
  const iframe = document.getElementById("vimeo-player");
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuClose = document.querySelector(".mobile-menu-close");
  const mobileMenuItems = document.querySelectorAll(".mobile-menu li");

  // Initialize Vimeo Player if iframe exists
  if (iframe) {
    // Set the iframe source with specific parameters
    iframe.src = `https://player.vimeo.com/video/${VIMEO_VIDEO_ID}?background=0&autopause=0&transparent=0&autoplay=0&loop=0&title=0&byline=0&portrait=0&quality=1080p&dnt=1&controls=1&cc=false&texttrack=false`;

    // Show the iframe immediately
    iframe.style.display = "block";

    // Initialize the player
    player = new Player(iframe, {
      id: VIMEO_VIDEO_ID,
      width: "100%",
      height: "100%",
      responsive: true,
      autoplay: false,
      controls: true,
      title: false,
      byline: false,
      portrait: false,
      playsinline: true,
      background: false,
      quality: "1080p",
      dnt: 1,
      cc: false,
      texttrack: false,
    });

    try {
      await player.ready();
      console.log("Vimeo player initialized successfully");
    } catch (error) {
      console.error("Error initializing Vimeo player:", error);
    }
  }

  // Mobile Menu Functionality
  if (mobileMenuButton && mobileMenu && mobileMenuClose) {
    // Toggle mobile menu
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.add("active");
      document.body.classList.add("no-scroll");
      mobileMenuButton.setAttribute("aria-expanded", "true");
    });

    // Close mobile menu
    mobileMenuClose.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      document.body.classList.remove("no-scroll");
      mobileMenuButton.setAttribute("aria-expanded", "false");
    });

    // Handle menu item clicks
    mobileMenuItems.forEach((item) => {
      item.addEventListener("click", () => {
        // Get the href from the data attribute or use a default
        const href = item.getAttribute("data-href") || "#";

        // Close the menu
        mobileMenu.classList.remove("active");
        document.body.classList.remove("no-scroll");
        mobileMenuButton.setAttribute("aria-expanded", "false");

        // Navigate to the page
        if (href !== "#") {
          window.location.href = href;
        }
      });
    });
  }
});
