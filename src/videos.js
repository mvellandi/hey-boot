// Vimeo Player SDK
import Player from "@vimeo/player";

// Video IDs for each player
const VIMEO_VIDEO_IDS = {
  pitch: "1074583104", // Replace with your actual pitch video ID
  about: "1074594102", // Replace with your actual about me video ID
};

// State Management
const players = {};

// Initialize Vimeo Players
document.addEventListener("DOMContentLoaded", async () => {
  // DOM Elements for mobile menu
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuClose = document.querySelector(".mobile-menu-close");
  const mobileMenuItems = document.querySelectorAll(".mobile-menu li");

  // Initialize each player
  for (const [playerId, videoId] of Object.entries(VIMEO_VIDEO_IDS)) {
    const iframe = document.getElementById(playerId);

    if (iframe) {
      // Set the iframe source with specific parameters
      iframe.src = `https://player.vimeo.com/video/${videoId}?background=0&autopause=0&transparent=0&autoplay=0&loop=0&title=0&byline=0&portrait=0&quality=1080p&dnt=1&controls=1&cc=false&texttrack=false`;

      // Show the iframe immediately
      iframe.style.display = "block";

      try {
        // Initialize the player
        const player = new Player(iframe, {
          id: videoId,
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

        // Store the player instance
        players[playerId] = player;

        // Wait for player to be ready
        await player.ready();
      } catch (error) {
        console.error(`Error initializing player ${playerId}:`, error);
      }
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
