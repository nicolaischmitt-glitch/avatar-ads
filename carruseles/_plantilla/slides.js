// Avatar Ads 1.0 — runtime de los carruseles. Se carga al final de carrusel.html:
//   <script src="../_plantilla/slides.js"></script>
// Hace 4 cosas: dibuja los iconos (<i class="ic" data-i="check"></i>), añade a cada slide la barra superior
// (logo + 01/09) y la inferior (progreso + "Desliza"), muestra un solo slide con ?s=N (lo usa render.mjs)
// y detecta contenido fuera de la zona segura (lo reporta render.mjs).
(() => {
  const P = {
    x: "<path d='M6 6l12 12M18 6L6 18'/>",
    check: "<path d='M5 12.5l4.5 4.5L19 7.5'/>",
    arrow: "<path d='M4 12h15M13 6l6 6-6 6'/>",
    down: "<path d='M12 4v15M6 13l6 6 6-6'/>",
    play: "<path d='M8 5v14l11-7z' fill='currentColor'/>",
    image: "<rect x='3' y='4' width='18' height='16' rx='3'/><circle cx='9' cy='10' r='2'/><path d='M21 16l-5-5-9 9'/>",
    video: "<rect x='2.5' y='6' width='14' height='12' rx='3'/><path d='M16.5 10.5l5-3v9l-5-3z'/>",
    chat: "<path d='M4 5h16v11H9l-5 4z'/>",
    frame: "<path d='M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5'/>",
    user: "<circle cx='12' cy='8' r='4'/><path d='M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6'/>",
    swap: "<path d='M4 8h14l-4-4M20 16H6l4 4'/>",
    spark: "<path d='M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z'/>",
    code: "<path d='M8 7l-5 5 5 5M16 7l5 5-5 5'/>",
    comment: "<path d='M12 3.5a8.5 8.5 0 0 0-7.4 12.7L3.5 20.5l4.4-1.1A8.5 8.5 0 1 0 12 3.5z'/>",
    send: "<path d='M4 12l16-8-6 16-2.5-6.5z'/>",
    download: "<path d='M12 4v11M7 10l5 5 5-5M5 20h14'/>",
    file: "<path d='M6 3h8l5 5v13H6zM14 3v5h5'/>",
    eye: "<path d='M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z'/><circle cx='12' cy='12' r='3'/>",
    sun: "<circle cx='12' cy='12' r='4'/><path d='M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5'/>",
    angle: "<path d='M4 20h16M4 20L16 6M10 20a6 6 0 0 0-1.8-4.3'/>",
    pose: "<circle cx='12' cy='5' r='2.2'/><path d='M12 8v6M7 11l5-2 5 2M9 21l3-7 3 7'/>",
    box: "<path d='M3 7.5L12 3l9 4.5v9L12 21l-9-4.5zM3 7.5l9 4.5 9-4.5M12 12v9'/>",
    search: "<circle cx='11' cy='11' r='6.5'/><path d='M16 16l4.5 4.5'/>",
    wand: "<path d='M4 20L15 9M14 4v3M18.5 5.5l-2 2M20 10h-3M12 7.5l2.5 2.5'/>",
    lock: "<rect x='5' y='11' width='14' height='9' rx='2'/><path d='M8 11V8a4 4 0 0 1 8 0v3'/>",
    clock: "<circle cx='12' cy='12' r='8.5'/><path d='M12 7.5V12l3 2'/>",
    coin: "<circle cx='12' cy='12' r='8.5'/><path d='M14.5 9.2c-.5-.8-1.4-1.2-2.5-1.2-1.5 0-2.6.8-2.6 2s1.1 1.6 2.6 2 2.6.9 2.6 2.1-1.1 1.9-2.6 1.9c-1.2 0-2.1-.5-2.6-1.3M12 6.5v11'/>",
    target: "<circle cx='12' cy='12' r='8.5'/><circle cx='12' cy='12' r='4.5'/><circle cx='12' cy='12' r='.8' fill='currentColor'/>",
    layers: "<path d='M12 3l9 5-9 5-9-5zM3 13l9 5 9-5'/>",
    curve: "<path d='M3 5c9-1 16 4 17 14'/><path d='M15.5 15.5L20 19.5l3-5'/>",
  };
  const svg = (k) => `<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'>${P[k] || P.x}</svg>`;
  document.querySelectorAll("i.ic[data-i]").forEach((el) => { el.innerHTML = svg(el.dataset.i); });

  const base = document.currentScript.src.replace(/slides\.js.*$/, "");
  const slides = [...document.querySelectorAll(".slide")];
  const n = slides.length, pad = (x) => String(x).padStart(2, "0");
  slides.forEach((s, i) => {
    if (s.classList.contains("no-chrome")) return;
    const prog = slides.map((_, j) => `<i class="${j <= i ? "on" : ""}"></i>`).join("");
    s.insertAdjacentHTML("beforeend",
      `<div class="ch-top"><img src="${base}logo.png" alt=""><span>${pad(i + 1)} / ${pad(n)}</span></div>` +
      `<div class="ch-bot"><div class="prog">${prog}</div>` +
      (i < n - 1 ? `<span class="swipe">DESLIZA <i class="ic">${svg("arrow")}</i></span>` : "") + `</div>`);
  });

  const q = new URLSearchParams(location.search);
  if (q.has("s")) {
    document.body.classList.add("solo");
    slides.forEach((s, i) => { s.style.display = i + 1 === +q.get("s") ? "" : "none"; });
  }

  // Zona segura: el contenido no debe tocar las barras ni salirse por los lados
  const check = () => {
    const issues = [];
    slides.forEach((s, i) => {
      if (s.style.display === "none") return;
      const r = s.getBoundingClientRect(), safe = { t: r.top + 110, b: r.bottom - 118, l: r.left + 40, rt: r.right - 40 };
      // .grow centra su contenido; medido arriba para que el desborde (hacia arriba y abajo) cuente
      s.querySelectorAll(".grow").forEach((g) => {
        g.style.justifyContent = "flex-start";
        const over = g.scrollHeight > g.clientHeight + 2;
        if (!over) g.style.justifyContent = "";
        if (over) issues.push(`slide ${i + 1}: el contenido no cabe (sobran ${g.scrollHeight - g.clientHeight}px): quita texto o achica el gráfico`);
      });
      s.querySelectorAll("*").forEach((el) => {
        if (el.closest(".ch-top,.ch-bot,.deco,svg")) return;
        const e = el.getBoundingClientRect();
        if (!e.width || !e.height) return;
        if (e.bottom > safe.b + 1 || e.top < safe.t - 1 || e.left < safe.l - 1 || e.right > safe.rt + 1) {
          issues.push(`slide ${i + 1}: <${el.tagName.toLowerCase()}${el.className ? " ." + String(el.className).split(" ").join(".") : ""}> fuera de la zona segura`);
        }
      });
    });
    if (slides.length > 10) issues.unshift(`hay ${slides.length} slides (máximo 10)`);
    document.body.dataset.issues = JSON.stringify([...new Set(issues)]);
  };
  document.fonts.ready.then(() => setTimeout(check, 50));
})();
