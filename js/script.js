"use strict";

// Opening and closing the mobile navigation

const headerEl = document.querySelector(".header");
const MobilebntEl = document.querySelector(".btn-mobile-nav");

MobilebntEl.addEventListener("click", () => {
  headerEl.classList.toggle("nav-open");
  document.body.classList.toggle("fixed-body");
});

//*********************Smooth scrolling***************

//helper function
const ScrollElIntoView = El => {
  El.scrollIntoView({
    behavior: "smooth",
  });
};

//Smooth scrolling for navigation
const mainNavEl = document.querySelector(".main-nav");

mainNavEl.addEventListener("click", e => {
  e.preventDefault();

  //if mobile menu is open close it , and enable scrolling
  if (headerEl.classList.contains("nav-open")) {
    headerEl.classList.remove("nav-open");
    document.body.classList.remove("fixed-body");
  }
  /****************************************** */
  // get the href to use it as an id
  const ELhref = e.target.getAttribute("href");

  // If the href attribute is null it means it's not the link
  if (!ELhref) return;
  console.log(ELhref);
  ScrollElIntoView(document.querySelector(ELhref));
});

//Smooth scrolling for buttons and logos
//buttons

const btns = document.querySelectorAll(".btn[href]");
btns.forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();

    if (!e.currentTarget.getAttribute("href")) return;
    ScrollElIntoView(
      document.querySelector(e.currentTarget.getAttribute("href"))
    );
  });
});

//icons
const logos = document.querySelectorAll(".logo[href]");

logos.forEach(logo => {
  logo.addEventListener("click", e => {
    e.preventDefault();

    if (!e.currentTarget.getAttribute("href")) return;
    ScrollElIntoView(
      document.querySelector(e.currentTarget.getAttribute("href"))
    );
  });
});

//*********************Sticky Navigation***************

const NavObsererCallback = (entries, _) => {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    /* to avoid layout jumping we add the height of the header to the hero section before it gets out of the stack*/
    entry.target.style.marginTop = `${headerEl.offsetHeight}px`;

    headerEl.classList.add("sticky-header");
  } else {
    headerEl.classList.remove("sticky-header");
    entry.target.style.marginTop = "0px";
  }
};
const NavObsererOptions = {
  root: null,
  threshold: [0],
};

const NavObserer = new IntersectionObserver(
  NavObsererCallback,
  NavObsererOptions
);

NavObserer.observe(document.querySelector(".section-hero"));

//*********************Revealing Steps on Scroll***************

const stepsEl = document.querySelectorAll(".step");

const stepObserverCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("hidden-step");
      observer.unobserve(entry.target);
    }
  });
};

const stepObserverOptions = {
  root: null,
  threshold: 0.3,
};

const stepObserver = new IntersectionObserver(
  stepObserverCallback,
  stepObserverOptions
);

stepsEl.forEach(step => {
  stepObserver.observe(step);
});

//*********************Revealing plan head on Scroll***************

const planHeads = document.querySelectorAll(".plan-head");

const planObserverCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("plan-head-hidden");
      observer.unobserve(entry.target);
    }
  });
};

const planObserverOptions = {
  root: null,
  threshold: 1,
};

const planObserver = new IntersectionObserver(
  planObserverCallback,
  planObserverOptions
);

planHeads.forEach(step => {
  planObserver.observe(step);
});

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
