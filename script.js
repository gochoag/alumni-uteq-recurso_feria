document.documentElement.classList.add("js");

const quickFacts = [
  "La experiencia de los graduados con nuevas oportunidades.",
  "El talento UTEQ con empresas que buscan profesionales.",
  "La comunidad alumni con eventos, grupos y espacios de colaboración.",
  "La retroalimentación profesional con la mejora académica.",
  "Los productos y servicios de graduados con una vitrina pública.",
  "La información institucional con decisiones respaldadas por datos.",
];

const siteHeader = document.getElementById("siteHeader");
const rotatingFact = document.getElementById("rotatingFact");
const revealElements = document.querySelectorAll(".reveal");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const anchorLinks = [...document.querySelectorAll('a[href^="#"]')];
const navSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

let factIndex = 0;

function updateHeader() {
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 16);
}

function updateFact() {
  rotatingFact.classList.add("is-changing");

  window.setTimeout(() => {
    factIndex = (factIndex + 1) % quickFacts.length;
    rotatingFact.textContent = quickFacts[factIndex];
    rotatingFact.classList.remove("is-changing");
  }, 220);
}

function setActiveNav(sectionId) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${sectionId}`;

    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function scrollToSection(event) {
  const target = document.querySelector(event.currentTarget.getAttribute("href"));

  if (!target) return;

  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

anchorLinks.forEach((link) => link.addEventListener("click", scrollToSection));

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.12,
    },
  );

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveNav(entry.target.id);
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0,
    },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
  navSections.forEach((section) => navObserver.observe(section));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

window.addEventListener("scroll", updateHeader, { passive: true });
window.setInterval(updateFact, 3000);

updateHeader();
setActiveNav("inicio");
