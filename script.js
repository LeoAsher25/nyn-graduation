const CONFIG = {
  fullName: "Nguyễn Yến Nhi",
  firstName: "Yến Nhi",
  year: "2026",
  date: "20.09.2026",
  time: "09:00 AM",
  venue: "Foreign Trade University · 91 Chùa Láng, Hà Nội",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Foreign+Trade+University+91+Chua+Lang+Hanoi",
  calendarUrl: "#",
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [
  ...scope.querySelectorAll(selector),
];

function bindContent() {
  $$("[data-bind]").forEach((el) => {
    const key = el.dataset.bind;
    if (key in CONFIG) el.textContent = CONFIG[key];
  });

  $$("[data-bind-href]").forEach((el) => {
    const key = el.dataset.bindHref;
    if (key in CONFIG) el.href = CONFIG[key];
  });

  document.title = `${CONFIG.fullName} · Graduation Invitation`;
}

function setupOpening() {
  const opening = $("#opening");
  const card = $("#openingCard");
  const audio = $("#bgMusic");
  const soundBtn = $("#soundToggle");
  const soundLabel = $(".sound-label", soundBtn);

  document.body.classList.add("locked");

  const open = async () => {
    // Tự bật nhạc khi mở thiệp
    try {
      audio.volume = 0.6;
      await audio.play();

      soundBtn.classList.add("is-on");
      soundLabel.textContent = "SOUND ON";
    } catch (err) {
      console.log("Audio autoplay blocked:", err);
    }

    opening.classList.add("is-open");
    document.body.classList.remove("locked");

    setTimeout(() => {
      opening.remove();
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }, 800);
  };

  card.addEventListener("click", open);

  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      open();
    }
  });
}

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  $$(".reveal").forEach((el) => observer.observe(el));
}

function setupParallax() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const items = $$(".parallax-media");

  const update = () => {
    const y = window.scrollY;
    items.forEach((el) => {
      const rect = el.parentElement.getBoundingClientRect();
      const speed = Number(el.dataset.speed || 0.05);
      const offset = (window.innerHeight - rect.top) * speed;
      el.style.transform = `scale(1.06) translate3d(0, ${offset + 15}px, 0)`;
    });
  };

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true },
  );

  update();
}

function setupTilt() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  $$(".tilt-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      const base = getComputedStyle(card).transform === "none" ? "" : "";
      card.style.transform = `perspective(900px) rotateX(${py * -5}deg) rotateY(${px * 6}deg) translateZ(0)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function setupMagnetic() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  $$(".magnetic").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
}

function setupCursor() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const dot = $(".cursor-dot");
  const ring = $(".cursor-ring");
  let mouseX = 0,
    mouseY = 0;
  let ringX = 0,
    ringY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  const loop = () => {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(loop);
  };
  loop();

  $$("a, button, .opening-card, .tilt-card").forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("is-hovering"));
    el.addEventListener("mouseleave", () =>
      ring.classList.remove("is-hovering"),
    );
  });
}

function setupSound() {
  const audio = $("#bgMusic");
  const btn = $("#soundToggle");
  const label = $(".sound-label", btn);

  btn.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play();
        btn.classList.add("is-on");
        label.textContent = "SOUND ON";
      } else {
        audio.pause();
        btn.classList.remove("is-on");
        label.textContent = "SOUND OFF";
      }
    } catch {
      label.textContent = "ADD AUDIO FILE";
      setTimeout(() => (label.textContent = "SOUND OFF"), 1800);
    }
  });
}

function setupRSVP() {
  const toast = $("#toast");
  const showToast = (text) => {
    $("span", toast).textContent = text;
    toast.classList.add("show");
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(
      () => toast.classList.remove("show"),
      3200,
    );
  };

  $$(".rsvp-choice").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.answer === "yes") {
        showToast("See you at FTU. Don't forget our photo. 🤍");
      } else {
        showToast("Mình giữ một chỗ trong tấm ảnh nhé 🥹");
      }
    });
  });

  $("#messageForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = $("#guestName").value.trim();
    const message = $("#guestMessage").value.trim();

    if (!name && !message) {
      showToast("Viết cho mình một lời nhắn nhỏ nhé ✦");
      return;
    }

    const guestbook = JSON.parse(
      localStorage.getItem("ftu-demo-guestbook") || "[]",
    );
    guestbook.push({
      name: name || "Anonymous",
      message,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("ftu-demo-guestbook", JSON.stringify(guestbook));

    e.currentTarget.reset();
    showToast("Đã lưu lời nhắn trên trình duyệt này 🤍");
  });
}

function setupCalendar() {
  const link = $('[data-bind-href="calendarUrl"]');
  if (!link) return;

  link.addEventListener("click", (e) => {
    if (CONFIG.calendarUrl !== "#") return;
    e.preventDefault();

    const title = encodeURIComponent(`${CONFIG.fullName} — Graduation Day`);
    const details = encodeURIComponent(
      "Graduation Ceremony · Foreign Trade University",
    );
    const location = encodeURIComponent(CONFIG.venue);

    // Demo date from CONFIG.date: DD.MM.YYYY
    const [dd, mm, yyyy] = CONFIG.date.split(".");
    const start = `${yyyy}${mm}${dd}T020000Z`;
    const end = `${yyyy}${mm}${dd}T040000Z`;

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });
}

function setupOpeningCardTilt() {
  const card = $("#openingCard");
  if (!card || window.matchMedia("(pointer: coarse)").matches) return;

  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(1000px) rotateX(${y * -5}deg) rotateY(${x * 7}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
}

bindContent();
setupOpening();
setupReveal();
setupParallax();
setupTilt();
setupMagnetic();
setupCursor();
setupSound();
setupRSVP();
setupCalendar();
setupOpeningCardTilt();
