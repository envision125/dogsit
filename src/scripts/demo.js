const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
let menuOpen = false;

mobileMenuButton.addEventListener("click", () => {
  menuOpen = !menuOpen;
  if (menuOpen) {
    mobileMenu.classList.add("open");
    mobileMenuButton.innerHTML = '<i class="fas fa-times text-2xl"></i>';
  } else {
    mobileMenu.classList.remove("open");
    mobileMenuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
  }
});

// Close mobile menu when clicking a link
const mobileLinks = document.querySelectorAll("#mobile-menu a");
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    mobileMenuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
    menuOpen = false;
  });
});

// Add active link highlight based on current page
const navLinks = document.querySelectorAll(".nav-link");
const currentPath = window.location.pathname.split("/").pop() || "index.html";

navLinks.forEach((link) => {
  if (link.getAttribute("href").includes(currentPath)) {
    link.classList.add("text-blue-500");
    link.classList.remove("text-gray-800");
    const afterStyle = link.querySelector("::after");
    if (afterStyle) {
      afterStyle.style.width = "100%";
    }
  }
});
