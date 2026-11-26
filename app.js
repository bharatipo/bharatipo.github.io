const body = document.body;
const toast = document.querySelector("#toast");
const searchInput = document.querySelector("#company-search");
const demoProfile = document.querySelector("#demo-profile");
const nav = document.querySelector(".main-nav");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3000);
}

function openDemo() {
  demoProfile.hidden = false;
  document.querySelector("#open-demo").setAttribute("aria-expanded", "true");
  demoProfile.scrollIntoView({ behavior: "smooth", block: "center" });
}

function runSearch(query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    searchInput.focus();
    return;
  }
  if (["example", "demo", "sample", "fictional"].some((word) => normalized.includes(word))) {
    openDemo();
    showToast("Showing a fictional profile for layout demonstration.");
    return;
  }
  if (/(risk|source|method|research|filing|valuation|financial|company|ipo)/.test(normalized)) {
    const target = /(method|source|filing|risk)/.test(normalized) ? "methodology" : "research";
    document.querySelector(`#${target}`).scrollIntoView({ behavior: "smooth" });
    showToast("This is a framework preview; company and IPO records are not connected yet.");
    return;
  }
  showToast("No verified company or IPO records are connected yet.");
}

document.querySelector("#search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  runSearch(searchInput.value);
});

document.querySelectorAll(".quick-search").forEach((button) => {
  button.addEventListener("click", () => {
    searchInput.value = button.dataset.query;
    runSearch(button.dataset.query);
  });
});

document.querySelectorAll(".market-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".market-tab").forEach((item) => {
      const selected = item === tab;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-selected", String(selected));
    });
    showToast("IPO status data will appear when verified sources are connected.");
  });
});

document.querySelector("#open-demo").addEventListener("click", openDemo);
document.querySelector(".close-profile").addEventListener("click", () => {
  demoProfile.hidden = true;
  document.querySelector("#open-demo").setAttribute("aria-expanded", "false");
  document.querySelector("#company-demo").scrollIntoView({ behavior: "smooth", block: "center" });
});

document.querySelector(".theme-toggle").addEventListener("click", () => {
  const nextTheme = body.dataset.theme === "dark" ? "light" : "dark";
  body.dataset.theme = nextTheme;
  localStorage.setItem("bharat-ipo-theme", nextTheme);
  document.querySelector(".theme-toggle").setAttribute("aria-label", `Switch to ${nextTheme === "dark" ? "light" : "dark"} theme`);
});

const savedTheme = localStorage.getItem("bharat-ipo-theme");
if (savedTheme === "dark") body.dataset.theme = "dark";

document.querySelector(".menu-toggle").addEventListener("click", (event) => {
  const isOpen = nav.classList.toggle("is-open");
  event.currentTarget.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    document.querySelector(".menu-toggle").setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === "Escape" && !demoProfile.hidden) {
    demoProfile.hidden = true;
    document.querySelector("#open-demo").setAttribute("aria-expanded", "false");
  }
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  const current = visible.target.dataset.section;
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.page === current || (current === "company-demo" && link.dataset.page === "research"));
  });
}, { rootMargin: "-25% 0px -60% 0px", threshold: [0, .15, .4] });

document.querySelectorAll("[data-section]").forEach((section) => sectionObserver.observe(section));

document.querySelector("#methodology-link").addEventListener("click", (event) => {
  event.preventDefault();
  showToast("Methodology details are being added before research publication.");
});

document.querySelector("#disclaimer-link").addEventListener("click", (event) => {
  event.preventDefault();
  showToast("Research and education only. This site does not provide investment advice.");
});

document.querySelector("#privacy-link").addEventListener("click", (event) => {
  event.preventDefault();
  showToast("Privacy details will be published before any account or data collection is added.");
});
