// Vimeo Player SDK
import Player from "@vimeo/player";

// DEMO MODE: Set to true to disable video playback and show placeholder text
const DEMO_MODE = true;

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
  // If in demo mode, skip video initialization
  if (DEMO_MODE) {
    console.log("Demo mode enabled - video playback disabled");
    // Remove iframes and show placeholder content
    for (const playerId of Object.keys(VIMEO_VIDEO_IDS)) {
      const iframe = document.getElementById(playerId);
      if (iframe) {
        iframe.style.display = "none";
      }
    }
    // Enable modal with placeholder content for demo mode
    enableModalInDemoMode();
    return;
  }

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

// Enable modal functionality in demo mode with placeholder content
function enableModalInDemoMode() {
  const modal = document.getElementById("videoModal");
  const modalClose = modal?.querySelector(".modal-close");
  const modalVideo = document.getElementById("modalVideo");
  const thumbnails = document.querySelectorAll(".video-thumbnail");

  if (!modal || !modalClose || !modalVideo) return;

  // Open modal when thumbnail is clicked
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      const videoId = thumbnail.getAttribute("data-video-id");

      // Hide the iframe and show placeholder content
      modalVideo.style.display = "none";

      // Create placeholder content in modal
      let placeholderDiv = modal.querySelector(".modal-placeholder");
      if (!placeholderDiv) {
        placeholderDiv = document.createElement("div");
        placeholderDiv.className = "modal-placeholder";
        placeholderDiv.style.cssText = "position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: #1a1a1a;";
        modalVideo.parentElement.appendChild(placeholderDiv);
      }

      // Set placeholder content based on video ID
      const videoInfo = {
        pitch: {
          title: "My Pitch Video",
          description: "This was a 2-minute pitch video explaining my interest in working with Boot.dev as a marketing engineer.",
          thumbnail: "/pitch-thumbnail.webp"
        },
        about: {
          title: "About Me Video",
          description: "This was a 3-minute introduction video about my background in marketing, engineering, and media production.",
          thumbnail: "/about-thumbnail.webp"
        }
      };

      const info = videoInfo[videoId];
      placeholderDiv.innerHTML = `
        <div style="text-align: center; max-width: 600px; padding: 2rem;">
          <img src="${info.thumbnail}" alt="${info.title}" style="width: 100%; max-width: 500px; border-radius: 8px; margin-bottom: 1.5rem;" />
          <h3 style="color: #aaa; margin-bottom: 1rem; font-size: 1.5rem;">${info.title}</h3>
          <p style="color: #888; font-size: 1rem; line-height: 1.6;">${info.description}</p>
          <p style="color: #666; font-size: 0.9rem; margin-top: 1rem;">Video functionality remains in the codebase for demonstration purposes.</p>
        </div>
      `;

      placeholderDiv.style.display = "flex";

      // Show the modal
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Close modal when close button is clicked
  modalClose.addEventListener("click", () => {
    closeModalInDemoMode();
  });

  // Close modal when clicking outside the content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModalInDemoMode();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModalInDemoMode();
    }
  });

  function closeModalInDemoMode() {
    modal.classList.remove("active");
    document.body.style.overflow = "";

    const placeholderDiv = modal.querySelector(".modal-placeholder");
    if (placeholderDiv) {
      placeholderDiv.style.display = "none";
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
