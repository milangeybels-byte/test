/* app.js - static site runner + archive
   Data source: runs/manifest.json + runs/*.json
   No article title/source shown (intentionally).
*/

const MANIFEST_URL = "runs/manifest.json";

function $(id) {
  return document.getElementById(id);
}

function getQueryParam(name) {
  const u = new URL(window.location.href);
  return u.searchParams.get(name);
}

function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeDirection(dir) {
  const d = String(dir || "").trim().toLowerCase();
  if (d === "up" || d === "long" || d === "buy") return "Up";
  if (d === "down" || d === "short" || d === "sell") return "Down";
  return dir || "";
}

function pickWeight(idea) {
  // Your JSON uses "confidence" (High/Med/Low). If you later add "weight", we’ll prefer it.
  if (idea && idea.weight != null && String(idea.weight).trim() !== "") return String(idea.weight);
  if (idea && idea.confidence != null && String(idea.confidence).trim() !== "") return String(idea.confidence);
  return ""; // omit if missing
}

async function fetchJson(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.json();
}

function renderIdeaCard(idea, { isTopPick = false } = {}) {
  const name = escapeHtml(idea.official_stock_name || "Unknown");
  const direction = escapeHtml(normalizeDirection(idea.direction));
  const category = escapeHtml(idea.category || "");
  const why = escapeHtml(idea.why || "");
  const weight = escapeHtml(pickWeight(idea));

  const pills = [
    direction ? `<span class="pill">${direction}</span>` : "",
    category ? `<span class="pill pill-muted">${category}</span>` : "",
    weight ? `<span class="pill pill-muted">${weight}</span>` : ""
  ].filter(Boolean).join("");

  return `
    <article class="idea ${isTopPick ? "idea-top" : ""}">
      <div class="idea-head">
        <div class="idea-title">${name}</div>
        <div class="idea-pills">${pills}</div>
      </div>
      <div class="idea-why">${why}</div>
    </article>
  `;
}

function ensureArray(x) {
  return Array.isArray(x) ? x : [];
}

function showError(msg) {
  const el = $("error");
  if (el) el.textContent = msg;
}

function hideError() {
  const el = $("error");
  if (el) el.textContent = "";
}

function isRunPage() {
  return window.location.pathname.toLowerCase().endsWith("/run.html") ||
         window.location.pathname.toLowerCase().endsWith("run.html");
}

function isArchivePage() {
  // index.html or site root
  const p = window.location.pathname.toLowerCase();
  return p.endsWith("/") || p.endsWith("/index.html") || p.endsWith("index.html");
}

function setPager(manifestRuns, currentId) {
  const older = $("olderLink");
  const newer = $("newerLink");
  if (!older || !newer) return;

  const idx = manifestRuns.findIndex(r => r.id === currentId);
  if (idx === -1) return;

  // manifestRuns: latest first
  const olderRun = manifestRuns[idx + 1];
  const newerRun = manifestRuns[idx - 1];

  if (olderRun) {
    older.classList.remove("hidden");
    older.href = `run.html?id=${encodeURIComponent(olderRun.id)}`;
  } else {
    older.classList.add("hidden");
    older.href = "#";
  }

  if (newerRun) {
    newer.classList.remove("hidden");
    newer.href = `run.html?id=${encodeURIComponent(newerRun.id)}`;
  } else {
    newer.classList.add("hidden");
    newer.href = "#";
  }
}

function setLatestLink(manifestRuns) {
  const a = $("latestLink");
  if (!a) return;
  const latest = manifestRuns[0];
  if (!latest) return;
  // Keep “Latest” always pointing to default latest.
  a.href = "run.html";
}

async function renderRunPage() {
  hideError();

  const manifest = await fetchJson(MANIFEST_URL);
  const runs = ensureArray(manifest.runs);

  if (runs.length === 0) {
    showError("No runs found in manifest.");
    return;
  }

  setLatestLink(runs);

  const requestedId = getQueryParam("id");
  const selected = requestedId
    ? runs.find(r => r.id === requestedId)
    : runs[0]; // default latest

  if (!selected) {
    showError(`Unknown run id: ${requestedId}`);
    return;
  }

  const runData = await fetchJson(selected.file);

  // Only show non-FT metadata:
  // - date
  // - theme (optional)
  const meta = runData.run_metadata || {};
  const date = escapeHtml(meta.run_date || selected.id);
  const theme = escapeHtml(meta.article_theme || "");
  const runMeta = $("runMeta");
  if (runMeta) {
    runMeta.innerHTML = theme ? `Run: <strong>${date}</strong> · <span>${theme}</span>` : `Run: <strong>${date}</strong>`;
  }

  const model = runData.model_output || {};
  const ideas = ensureArray(model.ideas);
  const topIndex = Number.isFinite(model.top_pick_index) ? model.top_pick_index : 0;
  const topPick = ideas[topIndex] || ideas[0];

  // Top pick
  const topPickEl = $("topPick");
  if (topPickEl) {
    topPickEl.innerHTML = topPick ? renderIdeaCard(topPick, { isTopPick: true }) : `<div class="muted">No ideas found.</div>`;
  }

  // Runners-up (all except the one used as top pick)
  const runners = ideas.filter((_, i) => {
    if (!topPick) return true;
    // if topPick came from index, remove that index; else remove first
    const topI = ideas[topIndex] ? topIndex : 0;
    return i !== topI;
  });

  const runnersEl = $("runnersUp");
  if (runnersEl) {
    runnersEl.innerHTML = runners.length
      ? runners.map(i => renderIdeaCard(i)).join("")
      : `<div class="muted">No runners-up.</div>`;
  }

  // Assumptions
  const assumptions = ensureArray(model.key_assumptions);
  const ul = $("assumptions");
  if (ul) {
    ul.innerHTML = assumptions.length
      ? assumptions.map(a => `<li>${escapeHtml(a)}</li>`).join("")
      : `<li class="muted">No assumptions provided.</li>`;
  }

  setPager(runs, selected.id);
}

async function renderArchivePage() {
  hideError();

  const manifest = await fetchJson(MANIFEST_URL);
  const runs = ensureArray(manifest.runs);

  const list = $("archiveList");
  if (!list) return;

  if (runs.length === 0) {
    list.innerHTML = `<div class="muted">No runs published yet.</div>`;
    return;
  }

  // Show latest first, with theme if available (theme comes from each run file; we fetch lightly)
  // To keep it simple/fast, we’ll *not* fetch each run file here; we’ll show id only.
  // If you want date/theme in the archive list, say so and I’ll add a cached fetch.
  list.innerHTML = runs.map(r => {
    const id = escapeHtml(r.id);
    return `
      <a class="archive-item" href="run.html?id=${encodeURIComponent(r.id)}">
        <div class="archive-title">${id}</div>
        <div class="archive-sub">Open run</div>
      </a>
    `;
  }).join("");
}

(async function main() {
  try {
    if (isRunPage()) {
      await renderRunPage();
    } else if (isArchivePage()) {
      await renderArchivePage();
    }
  } catch (err) {
    console.error(err);
    showError(String(err?.message || err));
  }
})();
