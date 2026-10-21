import "./styles.css";
import { snapshot } from "./data.js";
import { pulse, setState, state, subscribe, subscribeLive } from "./state.js";
import { renderAfluencia } from "./views/afluencia.js";
import { renderGasto } from "./views/gasto.js";
import { renderMovilidad } from "./views/movilidad.js";
import { renderResumen } from "./views/resumen.js";
import { compact, moneyExact, sparkline } from "./ui.js";

const views = {
  resumen: renderResumen,
  afluencia: renderAfluencia,
  gasto: renderGasto,
  movilidad: renderMovilidad,
};

const view = document.querySelector("#view");

function routeFromHash() {
  const name = location.hash.replace("#", "");
  return views[name] ? name : "resumen";
}

function syncChrome() {
  document.querySelectorAll("[data-route]").forEach((btn) => {
    const on = btn.dataset.route === state.route;
    btn.classList.toggle("active", on);
    if (on) btn.setAttribute("aria-current", "page");
    else btn.removeAttribute("aria-current");
  });
  document.querySelectorAll("[data-segment]").forEach((btn) => {
    btn.classList.toggle("on", btn.dataset.segment === state.segment);
  });
  document.querySelectorAll("[data-currency]").forEach((btn) => {
    btn.classList.toggle("on", btn.dataset.currency === state.currency);
  });
  document.querySelector("[data-filter='region']").value = state.region;
  document.querySelector("[data-filter='period']").value = state.period;
}

function render() {
  const y = view.scrollTop;
  const snap = snapshot(state);
  view.innerHTML = views[state.route](snap);
  view.scrollTop = y;
  syncChrome();
  paintLive(snap);
}

function paintLive(snap = snapshot(state)) {
  document.querySelectorAll('[data-bind="clock"]').forEach((node) => {
    node.textContent = snap.meta.clock;
  });
  const spark = document.querySelector('[data-bind-spark="arrivals"]');
  if (spark) spark.innerHTML = sparkline(snap.seriesArrivals, "#00AEAC");
  document.querySelectorAll('[data-bind="telemetry"]').forEach((node) => {
    node.textContent = `${snap.meta.telemetry.toFixed(1)}%`;
  });
  document.querySelectorAll('[data-bind="arrivals"]').forEach((node) => {
    node.textContent = compact(state.route === "afluencia" ? snap.hotspots[0].visitors : snap.arrivals);
  });
  document.querySelectorAll('[data-bind="spend"]').forEach((node) => {
    const amount = state.route === "gasto" ? snap.revpar : snap.spend;
    node.textContent = moneyExact(amount, snap.meta.symbol);
  });
  document.querySelectorAll('[data-bind="flights"]').forEach((node) => {
    node.textContent = compact(snap.flights);
  });
}

function exportReport() {
  const snap = snapshot(state);
  const lines = [
    "Observatorio GeoTour",
    "Institución Universitaria Colegio Mayor de Antioquia",
    "Analista: Dayanna Fernández Flórez",
    `Corte: ${snap.meta.clock}`,
    `Región: ${snap.meta.regionLabel}`,
    `Periodo: ${snap.meta.periodLabel} (${snap.meta.periodRange})`,
    `Segmento: ${snap.meta.segmentLabel}`,
    `Moneda: ${snap.meta.currency}`,
    "",
    `Llegadas: ${Math.round(snap.arrivals)}`,
    `Gasto medio: ${snap.meta.symbol}${Math.round(snap.spend)}`,
    `Ocupación: ${snap.occupancy.toFixed(1)}%`,
    `Saturación: ${Math.round(snap.crowd)}/100`,
    `Vuelos: ${snap.flights}`,
    `Impacto: ${snap.meta.symbol}${Math.round(snap.impact)}`,
    "",
    "Escenario de demostración. Las cifras se recalculan con los filtros del tablero.",
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `informe-geotour-${state.region}-${state.segment}.txt`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function setNavOpen(open) {
  document.body.classList.toggle("nav-open", open);
  const button = document.querySelector(".menu-toggle");
  if (!button) return;
  button.setAttribute("aria-expanded", String(open));
  button.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  const icon = button.querySelector(".material-symbols-outlined");
  if (icon) icon.textContent = open ? "close" : "menu";
}

document.body.addEventListener("click", (event) => {
  if (event.target.closest(".menu-toggle")) {
    setNavOpen(!document.body.classList.contains("nav-open"));
    return;
  }
  if (event.target.closest("[data-close-nav]")) {
    setNavOpen(false);
    return;
  }
  const route = event.target.closest("[data-route]");
  if (route) {
    location.hash = route.dataset.route;
    setNavOpen(false);
    return;
  }
  const segment = event.target.closest("[data-segment]");
  if (segment) {
    setState({ segment: segment.dataset.segment });
    return;
  }
  const currency = event.target.closest("[data-currency]");
  if (currency) {
    setState({ currency: currency.dataset.currency });
    return;
  }
  const layer = event.target.closest("[data-layer]");
  if (layer) {
    setState({ layer: layer.dataset.layer });
    return;
  }
  if (event.target.closest("[data-peak]")) {
    setState({ peak: !state.peak });
    return;
  }
  if (event.target.closest("[data-export]")) exportReport();
});

document.body.addEventListener("change", (event) => {
  const filter = event.target.closest("[data-filter]");
  if (!filter) return;
  setState({ [filter.dataset.filter]: filter.value });
});

document.body.addEventListener("input", (event) => {
  if (!event.target.matches("[data-query]")) return;
  const el = event.target;
  const start = el.selectionStart;
  setState({ query: el.value });
  const again = document.querySelector("#q");
  if (again && start != null) {
    again.focus();
    again.setSelectionRange(start, start);
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setNavOpen(false);
});

window.addEventListener("hashchange", () => {
  const route = routeFromHash();
  if (route !== location.hash.replace("#", "")) location.hash = route;
  setState({ route });
});

subscribe(render);
subscribeLive(() => paintLive());

state.route = routeFromHash();
if (location.hash !== `#${state.route}`) location.hash = state.route;
render();
setInterval(pulse, 4000);
