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


// Load regulator-hosted IPO offer-document links into the tracker.
(async function loadOfficialFilings(){
  const section = document.querySelector('#ipos');
  if (!section) return;
  try {
    const response = await fetch('./data/ipo-filings.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Filing list could not be loaded');
    const data = await response.json();
    const records = Array.isArray(data.filings) ? data.filings : [];
    section.replaceChildren();
    const wrap = document.createElement('div');
    wrap.className = 'filings-live';
    wrap.innerHTML = '<div class="section-heading"><div><div class="eyebrow section-eyebrow">OFFICIAL FILINGS <span class="eyebrow-line"></span> <span id="filings-date"></span></div><h2>IPO documents, <span>with a source trail.</span></h2></div><a class="text-link" href="https://www.sebi.gov.in/filings/public-issues.html" target="_blank" rel="noopener noreferrer">Browse SEBI filings ↗</a></div><p class="filings-intro">Recent offer-document filings checked against SEBI. Open a filing to read the original document and disclosures before making your own decision.</p><div class="market-tabs" role="tablist" aria-label="Filter IPO filings"><button class="market-tab is-active" data-kind="all">All <span></span></button><button class="market-tab" data-kind="draft">Drafts <span></span></button><button class="market-tab" data-kind="rhp">Red herring <span></span></button><button class="market-tab" data-kind="prospectus">Final prospectuses <span></span></button></div><label class="filing-search-label" for="filing-search">Search companies</label><input id="filing-search" type="search" placeholder="Company name..." autocomplete="off"><p class="filings-count"></p><div class="filing-list" aria-live="polite"></div><p class="filings-note">Source: SEBI Public Issues. This is a recent starter list, not a complete history or live exchange feed. Dates and offer terms can change; always read the latest official filing. Research and education only — not investment advice.</p><nav class="official-source-links" aria-label="Official market sources"><a href="https://www.sebi.gov.in/filings/public-issues.html" target="_blank" rel="noopener noreferrer">SEBI ↗</a><a href="https://www.nseindia.com/market-data/all-upcoming-issues-ipo" target="_blank" rel="noopener noreferrer">NSE IPO issues ↗</a><a href="https://www.bseindia.com/markets/publicIssues/" target="_blank" rel="noopener noreferrer">BSE public issues ↗</a></nav>';
    section.append(wrap);
    const date = new Date(String(data.asOf || '').slice(0,10) + 'T00:00:00Z');
    wrap.querySelector('#filings-date').textContent = Number.isNaN(date.getTime()) ? 'SOURCE-CHECKED' : 'CHECKED ' + date.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric',timeZone:'UTC'}).toUpperCase();
    const list = wrap.querySelector('.filing-list');
    const search = wrap.querySelector('#filing-search');
    const count = wrap.querySelector('.filings-count');
    let kind = 'all';
    const render = () => {
      const q = search.value.trim().toLowerCase();
      const shown = records.filter(item => (kind === 'all' || item.category === kind) && String(item.issuer || '').toLowerCase().includes(q));
      count.textContent = shown.length + ' official filing links';
      list.replaceChildren();
      if (!shown.length) { const empty = document.createElement('p'); empty.textContent = 'No filings match your search.'; list.append(empty); return; }
      shown.forEach(item => {
        const card = document.createElement('article'); card.className = 'filing-card';
        const heading = document.createElement('h3'); heading.textContent = item.issuer || 'Issuer';
        const detail = document.createElement('p'); detail.textContent = (item.document || 'Offer document') + ' · ' + (item.date || 'Date not shown');
        const link = document.createElement('a'); link.href = item.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = 'Open official SEBI filing ↗';
        card.append(heading, detail, link); list.append(card);
      });
    };
    wrap.querySelectorAll('[data-kind]').forEach(button => button.addEventListener('click', () => { kind = button.dataset.kind; wrap.querySelectorAll('[data-kind]').forEach(tab => { const active = tab === button; tab.classList.toggle('is-active',active); tab.setAttribute('aria-selected',String(active)); }); render(); }));
    search.addEventListener('input', render);
    wrap.querySelectorAll('[data-kind]').forEach(button => button.setAttribute('role','tab'));
    render();
  } catch (error) {
    const note = document.createElement('p'); note.textContent = 'The official filing list could not load right now. Visit SEBI public issue filings directly.';
    section.append(note);
  }
})();
