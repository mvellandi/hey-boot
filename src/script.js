// Initialize Mobile Menu
document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuClose = document.querySelector(".mobile-menu-close");
  const mobileMenuItems = document.querySelectorAll(".mobile-menu li");

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
