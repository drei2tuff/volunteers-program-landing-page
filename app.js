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

const impactViewport = document.querySelector(".impact-slider__viewport");
const impactTrack = document.querySelector(".impact-slider__track");
const impactSlides = Array.from(document.querySelectorAll(".impact-slider__slide"));
const impactStatus = document.querySelector(".impact-slider__status");
const impactCursor = document.querySelector(".impact-slider__cursor");
const impactDescriptions = [
  "Volunteers organizing materials for a community program",
  "A volunteer helping with community work",
  "Community members working together",
];
let impactIndex = 3;
let impactDragStart = null;
let impactDragOffset = 0;
let impactLoopIndex = null;

function updateImpactSlider(animate) {
  const activeSlide = impactSlides[impactIndex];
  const offset = impactViewport.clientWidth / 2 - (activeSlide.offsetLeft + activeSlide.offsetWidth / 2) + impactDragOffset;
  impactTrack.style.transition = animate ? "" : "none";
  impactTrack.style.transform = `translate3d(${offset}px, 0, 0)`;

  impactSlides.forEach((slide, index) => {
    slide.classList.toggle("is-active", index === impactIndex);
    slide.classList.toggle("is-previous", index === impactIndex - 1);
    slide.classList.toggle("is-next", index === impactIndex + 1);
  });

  const photoIndex = impactIndex % impactDescriptions.length;
  impactStatus.textContent = `Photo ${photoIndex + 1} of 3: ${impactDescriptions[photoIndex]}`;
}

function moveImpactSlider(direction) {
  if (impactLoopIndex !== null) return;
  impactIndex += direction;
  if (impactIndex < 3) impactLoopIndex = 5;
  if (impactIndex > 5) impactLoopIndex = 3;
  impactDragOffset = 0;
  updateImpactSlider(true);
}

impactViewport.addEventListener("pointerdown", (event) => {
  if (event.button !== 0) return;
  impactDragStart = event.clientX;
  impactDragOffset = 0;
  impactViewport.setPointerCapture(event.pointerId);
  impactViewport.classList.add("is-dragging");
});

impactViewport.addEventListener("pointermove", (event) => {
  const viewportBounds = impactViewport.getBoundingClientRect();
  impactCursor.style.left = `${event.clientX - viewportBounds.left}px`;
  impactCursor.style.top = `${event.clientY - viewportBounds.top}px`;
  if (impactDragStart === null) return;
  impactDragOffset = event.clientX - impactDragStart;
  updateImpactSlider(false);
});

function finishImpactDrag() {
  if (impactDragStart === null) return;
  const distance = impactDragOffset;
  impactDragStart = null;
  impactDragOffset = 0;
  impactViewport.classList.remove("is-dragging");
  if (Math.abs(distance) > 45) {
    moveImpactSlider(distance < 0 ? 1 : -1);
  } else {
    updateImpactSlider(true);
  }
}

impactViewport.addEventListener("pointerup", finishImpactDrag);
impactViewport.addEventListener("pointercancel", finishImpactDrag);
impactTrack.addEventListener("transitionend", () => {
  if (impactLoopIndex === null) return;
  impactIndex = impactLoopIndex;
  impactLoopIndex = null;
  updateImpactSlider(false);
});

document.querySelector(".impact-slider__arrow--previous").addEventListener("click", () => moveImpactSlider(-1));
document.querySelector(".impact-slider__arrow--next").addEventListener("click", () => moveImpactSlider(1));
impactViewport.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    moveImpactSlider(event.key === "ArrowLeft" ? -1 : 1);
  }
});

window.addEventListener("resize", () => updateImpactSlider(false));
updateImpactSlider(false);
