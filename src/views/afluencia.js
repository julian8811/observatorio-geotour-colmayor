import { matchesQuery } from "../data.js";
import { compact, delta, esc, heatColor, sparkline } from "../ui.js";

export function renderAfluencia(snap) {
  const peakVisitors = snap.hotspots[0].visitors * (snap.meta.peak ? 1 : 1);
  const rows = snap.destinations.filter((d) => matchesQuery(snap, `${d.name} ${d.code}`));
  return `
    <header class="page-head">
      <div>
        <div class="eyebrow"><span class="pulse-dot"></span> Afluencia satelital · <span data-bind="clock">${esc(snap.meta.clock)}</span></div>
        <h1>Afluencia y destinos</h1>
        <p>${esc(snap.meta.regionLabel)} · ${esc(snap.meta.segmentLabel)} · ${esc(snap.meta.periodLabel)}. Los núcleos cambian con la región y el simulador de pico.</p>
      </div>
      <div class="head-actions">
        <button type="button" class="btn-ghost ${snap.meta.peak ? "on" : ""}" data-peak>
          <span class="material-symbols-outlined">bolt</span>
          ${snap.meta.peak ? "Pico activo" : "Simular pico"}
        </button>
        <button type="button" class="btn-export" data-export>Exportar informe</button>
      </div>
    </header>

    <section class="kpis three">
      <article class="card kpi">
        <span class="k-label">Pico simultáneo</span>
        <div class="k-value"><b data-bind="arrivals">${compact(peakVisitors)}</b>${delta(snap.arrivalsDelta)}</div>
        ${sparkline(snap.seriesArrivals, "#00AEAC")}
        <p class="k-foot">Núcleo líder: ${esc(snap.hotspots[0].name)}</p>
      </article>
      <article class="card kpi">
        <span class="k-label">Permanencia media</span>
        <div class="k-value"><b>${(snap.stay * 3.4).toFixed(1)} h</b></div>
        ${sparkline(snap.seriesSpend, "#FBBB28")}
        <p class="k-foot">Estancia del viaje ${snap.stay.toFixed(1)} días</p>
      </article>
      <article class="card kpi">
        <span class="k-label">Carga turística</span>
        <div class="k-value"><b>${Math.round(snap.crowd)}</b><small>/100</small></div>
        <div class="meter"><span style="width:${snap.crowd}%"></span></div>
        <p class="k-foot"><em class="pill ${snap.crowd >= 70 ? "hot" : "ok"}">${esc(snap.crowdLabel)}</em> espera media ${snap.hotspots[0].wait} min</p>
      </article>
    </section>

    <section class="split">
      <article class="card map-card">
        <div class="card-head">
          <h2>Mapa de densidad · ${esc(snap.meta.hub)}</h2>
          <div class="seg tiny">
            <button type="button" data-layer="all" class="${snap.meta.layer === "all" ? "on" : ""}">Todo</button>
            <button type="button" data-layer="flow" class="${snap.meta.layer === "flow" ? "on" : ""}">Flujos</button>
            <button type="button" data-layer="heat" class="${snap.meta.layer === "heat" ? "on" : ""}">POI</button>
          </div>
        </div>
        <div class="map ${esc(snap.meta.layer)}">
          <svg class="map-arcs layer-flow" viewBox="0 0 640 320" aria-hidden="true">
            <path d="M160 240 Q 240 120, 360 150" fill="none" stroke="#00AEAC" stroke-width="2" stroke-dasharray="5 4"></path>
            <path d="M360 150 Q 460 180, 540 90" fill="none" stroke="#E9901E" stroke-width="2.4"></path>
            <path d="M200 80 Q 300 140, 420 200" fill="none" stroke="#FBBB28" stroke-width="2"></path>
          </svg>
          ${snap.hotspots
            .map(
              (h) => `<button type="button" class="pin ${esc(h.tone)} layer-heat" style="left:${h.x}%;top:${h.y}%">
                <span class="pin-name">${esc(h.name)}</span>
                <strong>${h.wait} min</strong>
              </button>`,
            )
            .join("")}
        </div>
      </article>
      <div class="stack">
        ${snap.hotspots
          .map(
            (h) => `<article class="card poi">
              <header><b>${esc(h.name)}</b><span class="pill ${h.tone === "hot" ? "hot" : "ok"}">${h.score}%</span></header>
              <p>${compact(h.visitors)} visitas en el corte · espera ${h.wait} min</p>
              <div class="meter slim"><span style="width:${h.score}%"></span></div>
            </article>`,
          )
          .join("")}
      </div>
    </section>

    <section class="card">
      <div class="card-head"><h2>Estacionalidad semanal</h2><span class="muted">Visitas relativas por franja</span></div>
      <div class="heat-grid">
        <div class="heat-corner"></div>
        ${["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((d) => `<div class="heat-h">${d}</div>`).join("")}
        ${snap.heatmap
          .map(
            (row) => `<div class="heat-label">${esc(row.label)}</div>${row.cells
              .map((c) => `<div class="heat-cell ${heatColor(c.value)}" title="${esc(c.day)} ${c.value}">${compact(c.value * 1000)}</div>`)
              .join("")}`,
          )
          .join("")}
      </div>
    </section>

    <section class="card table-card">
      <div class="card-head"><h2>Monitoreo de destinos</h2><span class="muted">${rows.length} filas</span></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Código</th><th>Destino</th><th>Llegadas</th><th>Carga</th><th>Sentimiento</th></tr></thead>
          <tbody>
            ${
              rows.length
                ? rows
                    .map(
                      (d) => `<tr>
                        <td class="mono">${esc(d.code)}</td>
                        <td><b>${esc(d.name)}</b><small>${esc(d.country)}</small></td>
                        <td>${compact(d.arrivals)}</td>
                        <td><span class="meter slim"><i style="width:${d.crowd}%"></i></span> ${Math.round(d.crowd)}</td>
                        <td>${d.sentiment}% positivo</td>
                      </tr>`,
                    )
                    .join("")
                : `<tr><td colspan="5" class="empty">Sin destinos para «${esc(snap.meta.query)}».</td></tr>`
            }
          </tbody>
        </table>
      </div>
    </section>
  `;
}
