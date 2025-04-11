// Vimeo Player SDK
import Player from "@vimeo/player";

// Video IDs for each player
const VIMEO_VIDEO_IDS = {
  pitch: "1074583104", // Replace with your actual pitch video ID
  about: "1074594102", // Replace with your actual about me video ID
};

// State Management
const players = {};
let modalPlayer = null;

// Check if we're on desktop
function isDesktop() {
  return window.innerWidth >= 1024;
}

// Initialize Vimeo Players
document.addEventListener("DOMContentLoaded", async () => {
  // Only initialize iframes on desktop
  if (isDesktop()) {
    // Initialize each player
    for (const [playerId, videoId] of Object.entries(VIMEO_VIDEO_IDS)) {
      const iframe = document.getElementById(playerId);

      if (iframe) {
        // Set the iframe source with specific parameters
        iframe.src = `https://player.vimeo.com/video/${videoId}?background=0&autopause=0&transparent=0&autoplay=0&loop=0&title=0&byline=0&portrait=0&quality=1080p&dnt=1&controls=1&cc=false&texttrack=false&playsinline=1&pip=0&speed=0&share=0&collections=0&quality=0&transcript=0&airplay=0`;

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
            quality: false,
            dnt: 1,
            cc: false,
            texttrack: false,
            pip: false,
            speed: false,
            share: false,
            collections: false,
            transcript: false,
            airplay: false,
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
  } else {
    // On mobile, remove the iframe src to prevent loading
    for (const playerId of Object.keys(VIMEO_VIDEO_IDS)) {
      const iframe = document.getElementById(playerId);
      if (iframe) {
        iframe.removeAttribute("src");
      }
    }
  }

  // Initialize modal functionality
  initModal();
});

// Handle window resize
window.addEventListener("resize", () => {
  // If we're resizing from mobile to desktop, initialize the players
  if (isDesktop() && Object.keys(players).length === 0) {
    initializePlayers();
  }
});

// Function to initialize players
async function initializePlayers() {
  for (const [playerId, videoId] of Object.entries(VIMEO_VIDEO_IDS)) {
    const iframe = document.getElementById(playerId);

    if (iframe && !iframe.src) {
      // Set the iframe source with specific parameters
      iframe.src = `https://player.vimeo.com/video/${videoId}?background=0&autopause=0&transparent=0&autoplay=0&loop=0&title=0&byline=0&portrait=0&quality=1080p&dnt=1&controls=1&cc=false&texttrack=false&playsinline=1&pip=0&speed=0&share=0&collections=0&quality=0&transcript=0&airplay=0`;

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
          quality: false,
          dnt: 1,
          cc: false,
          texttrack: false,
          pip: false,
          speed: false,
          share: false,
          collections: false,
          transcript: false,
          airplay: false,
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
}

// Modal functionality
function initModal() {
  const modal = document.getElementById("videoModal");
  const modalClose = modal.querySelector(".modal-close");
  const modalVideo = document.getElementById("modalVideo");
  const thumbnails = document.querySelectorAll(".video-thumbnail");

  // Open modal when thumbnail is clicked
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      const videoId = thumbnail.getAttribute("data-video-id");
      const vimeoId = VIMEO_VIDEO_IDS[videoId];

      // Set the modal iframe source
      modalVideo.src = `https://player.vimeo.com/video/${vimeoId}?background=0&autopause=0&transparent=0&autoplay=1&loop=0&title=0&byline=0&portrait=0&quality=1080p&dnt=1&controls=1&cc=false&texttrack=false&playsinline=1&pip=0&speed=0&share=0&collections=0&quality=0&transcript=0&airplay=0`;

      // Show the modal
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Close modal when close button is clicked
  modalClose.addEventListener("click", () => {
    closeModal();
  });

  // Close modal when clicking outside the video
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // Function to close the modal
  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";

    // Clear the iframe source
    modalVideo.src = "";
  }
}
