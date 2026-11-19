const menuToggle = document.querySelector(".menu-toggle");
const navigationMenu = document.querySelector(".navigation__menu");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  navigationMenu.classList.toggle("is-open", !isExpanded);
});

navigationMenu.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    navigationMenu.classList.remove("is-open");
  }
});

const programTabs = document.querySelectorAll(".program-tab");
const eventCards = document.querySelectorAll(".event-card");

programTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.filter;

    programTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    eventCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.program !== filter;
    });
  });
});

const galleryImages = [
  document.querySelector(".photo-stack__image--front"),
  document.querySelector(".photo-stack__image--middle"),
  document.querySelector(".photo-stack__image--back"),
];
const gallerySources = ["assets/a3e50.png", "assets/af4fd.png", "assets/089d3.png"];
let activePhoto = 0;

function showNextPhoto(direction) {
  activePhoto = (activePhoto + direction + gallerySources.length) % gallerySources.length;
  galleryImages.forEach((image, index) => {
    const sourceIndex = (activePhoto + index) % gallerySources.length;
    image.src = gallerySources[sourceIndex];
    image.className = `photo-stack__image photo-stack__image--${["front", "middle", "back"][index]}`;
  });
  document.querySelector(".gallery-progress span").style.transform = `translateX(${activePhoto * 100}%)`;
}

document.querySelector(".gallery-arrow--previous").addEventListener("click", () => showNextPhoto(-1));
document.querySelector(".gallery-arrow--next").addEventListener("click", () => showNextPhoto(1));

const departmentLogos = document.querySelector(".department-logos");
document.querySelectorAll(".department-arrow").forEach((button, index) => {
  button.addEventListener("click", () => {
    departmentLogos.scrollBy({
      left: index === 0 ? -180 : 180,
      behavior: "smooth",
    });
  });
});
