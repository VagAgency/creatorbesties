const $ = (sel, root = document) => root.querySelector(sel);

function media(model) {
  const img = document.createElement("img");
  img.src = model.photo;
  img.alt = model.name;
  img.loading = "lazy";
  return img;
}

function openUrl(url) {
  if (!url) return;
  window.open(url, "_blank", "noopener");
}

function pickFeatured() {
  if (!MODELS.length) return null;
  return MODELS[Math.floor(Math.random() * MODELS.length)];
}

function renderFeatured() {
  const model = pickFeatured();
  if (!model) return;
  const root = $("#featured");
  root.replaceChildren();

  const inner = document.createElement("div");
  inner.className = "bestie-inner";

  const imgWrap = document.createElement("div");
  imgWrap.className = "bestie-img-wrap";
  imgWrap.append(media(model));
  if (model.isNew) {
    const badge = document.createElement("span");
    badge.className = "bestie-new-badge";
    badge.textContent = "NEW";
    imgWrap.append(badge);
  }

  const info = document.createElement("div");
  info.className = "bestie-info";

  const name = document.createElement("div");
  name.className = "bestie-name";
  name.textContent = model.name;
  info.append(name);

  if (model.bio) {
    const bio = document.createElement("div");
    bio.className = "bestie-bio";
    bio.textContent = model.bio;
    info.append(bio);
  }

  const cta = document.createElement("button");
  cta.className = "bestie-cta";
  if (model.url) {
    cta.textContent = "View Profile →";
    cta.addEventListener("click", () => openUrl(model.url));
  } else {
    cta.disabled = true;
    cta.textContent = "Link coming soon";
  }
  info.append(cta);

  inner.append(imgWrap, info);
  root.append(inner);
}

function renderGrid() {
  const grid = $("#friendsGrid");
  grid.replaceChildren();

  MODELS.forEach((model) => {
    const a = document.createElement("a");
    a.className = "card";
    a.href = model.url || "#";
    a.addEventListener("click", (e) => {
      e.preventDefault();
      if (model.url) openUrl(model.url);
    });
    if (model.isNew) {
      const badge = document.createElement("span");
      badge.className = "new-badge";
      badge.textContent = "NEW";
      a.append(badge);
    }
    a.append(media(model));
    const meta = document.createElement("div");
    meta.className = "card-meta";
    const name = document.createElement("div");
    name.className = "card-name";
    name.textContent = model.name;
    meta.append(name);
    if (model.bio) {
      const bio = document.createElement("div");
      bio.className = "card-bio";
      bio.textContent = model.bio;
      meta.append(bio);
    }
    a.append(meta);
    grid.append(a);
  });
}

function init() {
  $("#brandHeadline").textContent = SITE.headline;
  $("#brandSubtitle").innerHTML =
    SITE.subtitle + ' <span class="emoji">' + SITE.emojis + "</span>";
  $("#popularLabel").textContent = SITE.popular;
  $("#trustedLabel").textContent = SITE.trusted;
  $("#copyright").textContent = SITE.copyright;
  document.title = SITE.name;

  renderFeatured();
  renderGrid();
}

document.addEventListener("DOMContentLoaded", init);
