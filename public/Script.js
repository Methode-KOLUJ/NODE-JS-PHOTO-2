let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// SECTION ACTIVE SCROLL
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");
    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });
      document
        .querySelector(`header nav a[href*='${id}']`)
        .classList.add("active");
    }
  });
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  // Remove toggle icon and navbar when click navbar link (scroll)
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

// Add click event listener to nav links
navLinks.forEach((link) => {
  link.onclick = () => {
    // Check if the link is "Galerie.html"
    if (link.getAttribute("href").includes("Galerie.html")) {
      navLinks.forEach((nav) => nav.classList.remove("active"));
      link.classList.add("active");
    }
  };
});

// Add click event listener to nav links
navLinks.forEach((link) => {
  link.onclick = () => {
    navLinks.forEach((nav) => nav.classList.remove("active"));
    link.classList.add("active");

    // Check if the link points to an external page
    if (link.getAttribute("href").includes("Galerie.html")) {
      link.classList.add("active");
    }
  };
});

// scroll reveal

ScrollReveal({
  reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(
  ".home-img, .services-container, .portfolio-box, .contact form",
  { origin: "bottom" }
);

ScrollReveal().reveal(".home-content h1, .about-content", { origin: "left" });

ScrollReveal().reveal(".home-content p, .about-img img,", {
  origin: "right",
});

// TEXTES MULTIPLES WITH TYPE JS

const typed = new Typed(".multiple-text", {
  strings: [
    "Le Développement WEB",
    "La prise des photos",
    "Le Design graphique",
  ],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});
