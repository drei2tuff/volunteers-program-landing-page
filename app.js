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

const storySection = document.querySelector("#why-volunteer");
const storyAmbient = document.querySelector(".why-volunteer__ambient");
const storyEyebrow = document.querySelector(".why-volunteer__eyebrow");
const storyTitle = document.querySelector(".why-volunteer__title");
const storyDescription = document.querySelector(".why-volunteer__intro");
const storyCta = document.querySelector(".why-volunteer__cta");
const storyVisualHeading = document.querySelector(".why-volunteer__visual-heading");
const storyFooter = document.querySelector(".impact-slider__footer");
const impactViewport = document.querySelector(".impact-slider__viewport");
const impactTrack = document.querySelector(".impact-slider__track");
const impactSlides = Array.from(document.querySelectorAll(".impact-slider__slide"));
const impactCards = Array.from(document.querySelectorAll(".impact-slider__card"));
const impactArrows = Array.from(document.querySelectorAll(".impact-slider__arrow"));
const impactCursor = document.querySelector(".impact-slider__cursor");
const impactStatus = document.querySelector(".impact-slider__status");
const impactCurrentCounter = document.querySelector(".why-volunteer__visual-index span");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
let impactIndex = 3;
let impactDragStart = null;
let impactDragOffset = 0;
let impactAnimating = false;
let impactLoopIndex = null;
let storyActive = false;
let storyHasPlayed = false;
let storyReady = false;
let ambientTween;

gsap.registerPlugin(ScrollTrigger);

const partnerGrid = document.querySelector(".partner-grid");
const partnerSection = document.querySelector(".partners");
const partnerCopy = partnerSection.querySelector(".partners__copy");
const partnerTitle = partnerCopy.querySelector("h2");
const partnerDescription = partnerCopy.querySelector("p");
const partnerLogoAssets = [
  { src: "assets/National-Volunteer.svg" },
  { src: "assets/PartnerShip.svg" },
  { src: "assets/Vps-Partner-1 .svg" },
  { src: "assets/Vps-Partner-2 .svg" },
  { src: "assets/Vps-Partner-DSWD.svg" },
  { src: "assets/Vps-Partner-association.svg" },
  { src: "assets/Vps-Partner-gaming.svg" },
  { src: "assets/Vps-Partner-global.svg" },
  { src: "assets/Vps-Partner3 .svg" },
];
const partnerCells = Array.from(partnerGrid.querySelectorAll(".partner-cell"));

function shufflePartnerLogos(logos) {
  const shuffledLogos = [...logos];

  for (let index = shuffledLogos.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffledLogos[index], shuffledLogos[swapIndex]] = [shuffledLogos[swapIndex], shuffledLogos[index]];
  }

  return shuffledLogos;
}

const shuffledPartnerLogos = shufflePartnerLogos(partnerLogoAssets);
const partnerCellStates = partnerCells.map((cell, index) => {
  const currentImage = cell.querySelector(".partner-cell__logo--current");
  const currentLogo = shuffledPartnerLogos[index];
  currentImage.src = currentLogo.src;

  return {
    cell,
    currentImage,
    nextImage: cell.querySelector(".partner-cell__logo--next"),
    currentLogo,
  };
});
const availablePartnerLogos = shuffledPartnerLogos.slice(partnerCells.length);

if (!reduceMotion) {
  partnerGrid.classList.add("is-rotating");

  function rotatePartnerCell(cellState, onComplete) {
    const nextLogo = availablePartnerLogos.shift();
    const outgoingLogo = cellState.currentLogo;
    const travelDistance = cellState.cell.clientHeight;
    cellState.nextImage.src = nextLogo.src;

    gsap.set(cellState.nextImage, { y: travelDistance, autoAlpha: 0 });
    gsap.timeline({
      onComplete: () => {
        const outgoingImage = cellState.currentImage;
        const incomingImage = cellState.nextImage;

        outgoingImage.classList.replace("partner-cell__logo--current", "partner-cell__logo--next");
        incomingImage.classList.replace("partner-cell__logo--next", "partner-cell__logo--current");
        cellState.currentImage = incomingImage;
        cellState.nextImage = outgoingImage;
        cellState.currentLogo = nextLogo;

        gsap.set(cellState.currentImage, { clearProps: "transform,opacity,visibility" });
        gsap.set(cellState.nextImage, { clearProps: "transform,opacity,visibility" });
        availablePartnerLogos.push(outgoingLogo);
        onComplete();
      },
    })
      .to(cellState.currentImage, {
        y: -travelDistance,
        autoAlpha: 0,
        duration: .75,
        ease: "power2.inOut",
      }, 0)
      .to(cellState.nextImage, {
        y: 0,
        autoAlpha: 1,
        duration: .75,
        ease: "power2.inOut",
      }, 0);
  }

  function rotatePartnerGrid() {
    let nextCellIndex = 0;
    let completedCells = 0;

    function scheduleNextCell() {
      if (nextCellIndex === partnerCellStates.length) return;
      if (availablePartnerLogos.length === 0) {
        gsap.delayedCall(.06, scheduleNextCell);
        return;
      }

      const cellState = partnerCellStates[nextCellIndex];
      nextCellIndex += 1;
      rotatePartnerCell(cellState, () => {
        completedCells += 1;
        if (completedCells === partnerCellStates.length) {
          gsap.delayedCall(2.4, rotatePartnerGrid);
        }
      });

      gsap.delayedCall(.12, scheduleNextCell);
    }

    scheduleNextCell();
  }

  gsap.delayedCall(1.8, rotatePartnerGrid);
}

let partnerIntroPlayed = false;

function revealPartnerSection() {
  if (partnerIntroPlayed) return;
  partnerIntroPlayed = true;

  gsap.timeline({ defaults: { ease: "power3.out" } })
    .to(partnerTitle, { autoAlpha: 1, y: 0, duration: .56 }, 0)
    .to(partnerDescription, { autoAlpha: 1, y: 0, duration: .56 }, .13)
    .to(partnerGrid, { autoAlpha: 1, y: 0, duration: .62 }, .27);
}

if (!reduceMotion) {
  gsap.set([partnerTitle, partnerDescription, partnerGrid], { autoAlpha: 0, y: 22 });
  ScrollTrigger.create({
    trigger: partnerSection,
    start: "top 75%",
    onEnter: revealPartnerSection,
    onEnterBack: revealPartnerSection,
  });
}

function getImpactOffset(index) {
  const slide = impactSlides[index];
  return impactViewport.clientWidth / 2 - slide.offsetLeft - slide.offsetWidth / 2;
}

function updateImpactStatus() {
  const photoIndex = ((impactIndex - 3) % 3 + 3) % 3;
  const description = impactSlides[photoIndex + 3].querySelector("img").alt;
  impactCurrentCounter.textContent = `0${photoIndex + 1}`;
  impactStatus.textContent = `Photo ${photoIndex + 1} of 3: ${description}`;
}

function updateImpactCardStates(animate) {
  impactSlides.forEach((slide, index) => {
    const active = index === impactIndex;
    const previous = index === impactIndex - 1;
    const next = index === impactIndex + 1;
    const motion = {
      scale: active ? 1 : .94,
      rotationY: previous ? 5 : next ? -5 : 0,
      duration: animate && !reduceMotion ? .48 : 0,
      ease: "power3.out",
      overwrite: "auto",
    };
    if (storyReady) motion.opacity = active ? 1 : previous || next ? .76 : .45;

    if (animate && !reduceMotion) gsap.to(slide, motion);
    else gsap.set(slide, motion);
  });
}

function setImpactPosition(animate) {
  const targetX = getImpactOffset(impactIndex) + impactDragOffset;
  if (animate && !reduceMotion) {
    gsap.to(impactTrack, { x: targetX, duration: .78, ease: "power3.inOut", overwrite: "auto" });
  } else {
    gsap.set(impactTrack, { x: targetX });
  }
}

function updateImpactSliderStatus() {
  updateImpactStatus();
  updateImpactCardStates(true);
}

function moveImpactSlider(direction) {
  if (impactAnimating) return;

  // Duplicate slides at both ends allow a seamless GSAP loop reset after motion completes.
  let destination = impactIndex + direction;
  impactLoopIndex = null;
  if (destination < 3) {
    destination = 2;
    impactLoopIndex = 5;
  } else if (destination > 5) {
    destination = 6;
    impactLoopIndex = 3;
  }

  impactAnimating = true;
  impactIndex = destination;
  impactDragOffset = 0;
  updateImpactSliderStatus();
  gsap.to(impactTrack, {
    x: getImpactOffset(impactIndex),
    duration: reduceMotion ? 0 : .78,
    ease: "power3.inOut",
    overwrite: "auto",
    onComplete: () => {
      if (impactLoopIndex !== null) {
        impactIndex = impactLoopIndex;
        impactLoopIndex = null;
        gsap.set(impactTrack, { x: getImpactOffset(impactIndex) });
        updateImpactStatus();
        updateImpactCardStates(false);
      }
      impactAnimating = false;
    },
  });
}

function enterStory() {
  if (storyActive) {
    ambientTween?.resume();
    return;
  }
  storyActive = true;
  storySection.classList.add("is-active");
  if (storyHasPlayed) {
    ambientTween?.resume();
    return;
  }
  storyHasPlayed = true;
  storyReady = false;
  gsap.set(impactTrack, { x: getImpactOffset(impactIndex) });

  if (reduceMotion) {
    storyReady = true;
    gsap.set([storyEyebrow, storyTitle, storyDescription, storyCta, storyVisualHeading, storyFooter], { autoAlpha: 1, y: 0 });
    gsap.set(impactSlides, { autoAlpha: 1, y: 0 });
    updateImpactCardStates(false);
    return;
  }

  gsap.set(impactSlides, { autoAlpha: 0, y: 48 });
  // The intro timeline reveals the copy first, then lifts the photo cards in one-by-one.
  const introTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
  introTimeline
    .fromTo(storyEyebrow, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: .5 }, 0)
    .fromTo(storyTitle, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: .68 }, .12)
    .fromTo(storyDescription, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .62 }, .27)
    .fromTo(storyCta, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: .5 }, .46)
    .fromTo(storyVisualHeading, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: .5 }, .34)
    .fromTo(impactSlides, { autoAlpha: 0, y: 48 }, { autoAlpha: 1, y: 0, duration: .72, stagger: .11 }, .5)
    .fromTo(storyFooter, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: .45 }, .92)
    .add(() => {
      storyReady = true;
      updateImpactCardStates(true);
    });

  // Keep the color field drifting only while the fixed story overlay is active.
  ambientTween = gsap.to(storyAmbient, {
    xPercent: -7,
    yPercent: 4,
    scale: 1.04,
    duration: 12,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}

function leaveStory() {
  storyActive = false;
  ambientTween?.pause();
}

ScrollTrigger.create({
  trigger: storySection,
  start: "top 75%",
  end: "bottom 25%",
  onEnter: enterStory,
  onEnterBack: enterStory,
  onLeave: leaveStory,
  onLeaveBack: leaveStory,
});

window.addEventListener("pageshow", () => ScrollTrigger.refresh());

impactViewport.addEventListener("pointerdown", (event) => {
  if (event.button !== 0 || impactAnimating) return;
  impactDragStart = event.clientX;
  impactDragOffset = 0;
  impactViewport.setPointerCapture(event.pointerId);
  impactViewport.classList.add("is-dragging");
  gsap.killTweensOf(impactTrack);
});

impactViewport.addEventListener("pointermove", (event) => {
  if (event.pointerType === "mouse" && finePointer) {
    const bounds = impactViewport.getBoundingClientRect();
    // The DRAG label follows the pointer while GSAP translates the track during a gesture.
    gsap.to(impactCursor, {
      x: event.clientX - bounds.left - 42,
      y: event.clientY - bounds.top - 42,
      autoAlpha: 1,
      scale: 1,
      duration: reduceMotion ? 0 : .2,
      ease: "power2.out",
      overwrite: "auto",
    });
  }

  if (impactDragStart === null) return;
  impactDragOffset = event.clientX - impactDragStart;
  gsap.set(impactTrack, { x: getImpactOffset(impactIndex) + impactDragOffset });
});

function finishImpactDrag() {
  if (impactDragStart === null) return;
  const distance = impactDragOffset;
  impactDragStart = null;
  impactDragOffset = 0;
  impactViewport.classList.remove("is-dragging");
  if (Math.abs(distance) > 45) moveImpactSlider(distance < 0 ? 1 : -1);
  else setImpactPosition(true);
}

impactViewport.addEventListener("pointerup", finishImpactDrag);
impactViewport.addEventListener("pointercancel", finishImpactDrag);
impactViewport.addEventListener("pointerleave", () => {
  if (!reduceMotion) gsap.to(impactCursor, { autoAlpha: 0, scale: .85, duration: .18, overwrite: "auto" });
});
impactViewport.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    moveImpactSlider(event.key === "ArrowLeft" ? -1 : 1);
  }
});

document.querySelector(".impact-slider__arrow--previous").addEventListener("click", () => moveImpactSlider(-1));
document.querySelector(".impact-slider__arrow--next").addEventListener("click", () => moveImpactSlider(1));

impactCards.forEach((card) => {
  // Hover lifts each photo and adds a restrained Bayanihang-blue glow.
  card.addEventListener("pointerenter", () => {
    if (!reduceMotion) gsap.to(card, { scale: 1.035, boxShadow: "0 22px 46px rgba(0, 78, 201, .23)", duration: .32, ease: "power3.out", overwrite: "auto" });
  });
  card.addEventListener("pointerleave", () => {
    gsap.to(card, { scale: 1, boxShadow: "0 14px 34px rgba(33, 55, 74, .13)", duration: reduceMotion ? 0 : .32, ease: "power3.out", overwrite: "auto" });
  });
});

impactArrows.forEach((arrow) => {
  // Arrow hover and focus states use GSAP so the slider has no competing CSS transitions.
  const setArrowState = (active) => {
    gsap.to(arrow, {
      backgroundColor: active ? "#064a9b" : "rgba(255, 255, 255, .38)",
      color: active ? "#fff" : "#064a9b",
      boxShadow: active ? "0 0 0 5px rgba(0, 78, 201, .13)" : "0 0 0 0 rgba(0, 78, 201, 0)",
      duration: reduceMotion ? 0 : .2,
      overwrite: "auto",
    });
  };
  arrow.addEventListener("pointerenter", () => setArrowState(true));
  arrow.addEventListener("pointerleave", () => setArrowState(false));
  arrow.addEventListener("focus", () => setArrowState(true));
  arrow.addEventListener("blur", () => setArrowState(false));
});

// Match the card glow on the primary action while keeping hover motion in GSAP.
storyCta.addEventListener("pointerenter", () => {
  if (!reduceMotion) gsap.to(storyCta, { y: -3, boxShadow: "0 15px 32px rgba(0, 78, 201, .24)", duration: .24, overwrite: "auto" });
});
storyCta.addEventListener("pointerleave", () => {
  gsap.to(storyCta, { y: 0, boxShadow: "0 10px 24px rgba(0, 78, 201, .18)", duration: reduceMotion ? 0 : .24, overwrite: "auto" });
});

window.addEventListener("resize", () => {
  gsap.killTweensOf(impactTrack);
  if (impactLoopIndex !== null) {
    impactIndex = impactLoopIndex;
    impactLoopIndex = null;
    updateImpactStatus();
    updateImpactCardStates(false);
  }
  impactAnimating = false;
  impactDragOffset = 0;
  gsap.set(impactTrack, { x: getImpactOffset(impactIndex) });
  ScrollTrigger.refresh();
});
