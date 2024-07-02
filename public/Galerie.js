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

// TEXTES MULTIPLES WITH TYPE JS

const typed = new Typed(".multiple-text", {
  strings: [
    "Nos meilleures photos",
    "Nos meilleurs design graphiques",
    "Nos héros dans l'ombre !",
  ],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

// STYLE & PROPRIETES PROPRES A LA GALERIE

document.addEventListener("DOMContentLoaded", () => {
  const galleryDiv = document.querySelector(".gallery");
  const modal = document.getElementById("myModal");
  const modalImage = document.getElementById("modalImage");
  const modalDownload = document.getElementById("modalDownload");
  const span = document.getElementsByClassName("close")[0];

  // Faites une requête AJAX pour récupérer les noms des images du serveur
  fetch("/images")
    .then((response) => response.json())
    .then((data) => {
      data
        .forEach((imageName) => {
          const imgContainer = document.createElement("div");
          imgContainer.classList.add("img-container");

          const img = document.createElement("img");
          img.src = `/images/${imageName}`;
          img.alt = imageName;

          const downloadLink = document.createElement("a");
          downloadLink.href = `/images/${imageName}`;
          downloadLink.download = imageName;
          downloadLink.textContent = "Télécharger";
          downloadLink.classList.add("download-button");

          imgContainer.appendChild(img);
          imgContainer.appendChild(downloadLink);
          galleryDiv.appendChild(imgContainer);

          // Ajout d'un événement clic sur l'image pour ouvrir la boîte modale
          img.addEventListener("click", () => {
            modal.style.display = "block";
            modalImage.src = img.src;
            modalDownload.href = downloadLink.href;
            modalDownload.download = downloadLink.download;
          });
        })
        .catch((error) =>
          console.error("Erreur lors du chargement des images:", error)
        );
    });
});

// Lorsque l'utilisateur clique sur (x), fermer la boîte modale
span.onclick = function () {
  modal.style.display = "none";
};

// Lorsque l'utilisateur clique n'importe où en dehors de la boîte modale, la fermer
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  let currentUrl = window.location.href;
  let navliens = document.querySelectorAll("nav ul li a");

  navliens.forEach(function (link) {
    if (link.href === currentUrl) {
      link.classList.add("actif");
    }
  });
});

function toggleMenu() {
  const nav = document.querySelector("nav");
  nav.classList.toggle("open");
  const hamburger = document.querySelector(".hamburger");
  hamburger.classList.toggle("change");

  if (nav.classList.contains("open")) {
    document.addEventListener("click", closeMenuOutside);
  } else {
    document.removeEventListener("click", closeMenuOutside);
  }
}

function closeMenuOutside(event) {
  const nav = document.querySelector("nav");
  const hamburger = document.querySelector(".hamburger");

  if (!nav.contains(event.target) && !hamburger.contains(event.target)) {
    nav.classList.remove("open");
    hamburger.classList.remove("change");
    document.removeEventListener("click", closeMenuOutside);
  }
}
