// ---------------------------------------------------
// Portfolio data — swap or add entries here to update the site.
// category must match one of: fetes, artist, carnival, sports
// ---------------------------------------------------
const WORKS = [
  { file: "zulu-traffic-jam.jpg", title: "Traffic Jam Day Parties", client: "Zulu Lounge", category: "fetes" },
  { file: "aktivate-save-the-date.jpg", title: "Aktivate — Save the Date", client: "Bacchanal Chasers", category: "fetes" },
  { file: "sunset-empire-state-of-mind.jpg", title: "Sunset: Empire State of Mind", client: "DJ Tero Entertainment", category: "fetes" },
  { file: "sunset-outback-mirage.jpg", title: "Sunset: Outback Mirage", client: "DJ Tero Entertainment", category: "fetes" },
  { file: "crates-ole-skool-beach-party.jpg", title: "Crates — Ole Skool Beach Party", client: "The Dock Beach Club", category: "fetes" },
  { file: "revive-scooby-mystery-bay.jpg", title: "Revive: Scooby Mystery Bay", client: "DJ Tero Entertainment", category: "fetes" },
  { file: "zu-and-friends-year-5.jpg", title: "Zu & Friends — Year 5", client: "Sky Ultra Lounge", category: "fetes" },
  { file: "tequila-thursday.jpg", title: "Tequila Thursday", client: "Last Lap Bar", category: "fetes" },
  { file: "pto-turns-5.jpg", title: "PTO Turns 5", client: "Party Tun Ova", category: "fetes" },
  { file: "jahsii-show-dates.jpg", title: "Jahsii — Show Dates", client: "Protocol Entertainment", category: "artist" },
  { file: "dejour-shades-of-love.jpg", title: "Shades of Love", client: "Dejour · Gangwayy Records", category: "artist" },
  { file: "the-tennis-club.jpg", title: "The Tennis Club — Sugar Mas Open", client: "Excess", category: "carnival" },
  { file: "big-six-cricket.jpg", title: "Big Six T20 Cricket Tournament", client: "Warner Park Sporting Complex", category: "sports" },
  { file: "fifa-world-cup-2026.jpg", title: "FIFA World Cup 2026 — Match Schedule", client: "Carambola Beach Club × Taittinger", category: "sports" },
];

const IMG_PATH = "images_web/";

const grid = document.getElementById("grid");

function renderGrid() {
  WORKS.forEach((work, i) => {
    const card = document.createElement("button");
    card.className = "card";
    card.dataset.category = work.category;
    card.setAttribute("aria-label", `${work.title} — view larger`);
    card.style.transitionDelay = `${(i % 6) * 60}ms`;

    card.innerHTML = `
      <img src="${IMG_PATH}${work.file}" alt="${work.title} flyer design" loading="lazy">
      <div class="card-info">
        <p class="card-title">${work.title}</p>
        <p class="card-tag">${work.client}</p>
      </div>
    `;

    card.addEventListener("click", () => openLightbox(work));
    grid.appendChild(card);
  });
}
renderGrid();

// ---------------- filters ----------------
const wristbands = document.querySelectorAll(".wristband");
wristbands.forEach((btn) => {
  btn.addEventListener("click", () => {
    wristbands.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".card").forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !show);
    });
  });
});

// ---------------- scroll reveal ----------------
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".card").forEach((card) => observer.observe(card));

// ---------------- lightbox ----------------
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

function openLightbox(work) {
  lightboxImg.src = IMG_PATH + work.file;
  lightboxImg.alt = work.title + " flyer design";
  lightboxCaption.textContent = `${work.title} — ${work.client}`;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  lightboxClose.focus();
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
});

// ---------------- footer year ----------------
document.getElementById("year").textContent = new Date().getFullYear();
