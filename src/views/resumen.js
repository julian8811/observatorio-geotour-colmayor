import { matchesQuery } from "../data.js";
import { compact, delta, donut, esc, money, moneyExact, sparkline } from "../ui.js";

export function renderResumen(snap) {
  const rows = snap.destinations.filter((d) => matchesQuery(snap, `${d.name} ${d.country} ${d.code}`));
  const maxTrend = Math.max(...snap.trend);
  const trendLine = snap.trend
    .map((v, i) => {
      const x = (i / (snap.trend.length - 1)) * 320;
      const y = 120 - (v / maxTrend) * 100;
      return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return `
    <header class="page-head">
      <div>
        <div class="eyebrow">
          <span class="pulse-dot"></span>
          Observatorio geo-turístico en vivo
          <span class="dot-sep">·</span>
          <span>Corte satelital <span data-bind="clock">${esc(snap.meta.clock)}</span></span>
        </div>
        <h1>Pulso turístico <span>${esc(snap.meta.regionLabel)}</span></h1>
        <p>Capacidad territorial, afluencia y gasto del segmento ${esc(snap.meta.segmentLabel.toLowerCase())} · ${esc(snap.meta.periodRange)}. Escenario de demostración.</p>
      </div>
      <div class="head-actions">
        <div class="seg" role="group" aria-label="Segmento">
          <button type="button" data-segment="intl" class="${snap.meta.segmentLabel === "Internacional" ? "on" : ""}">Internacional</button>
          <button type="button" data-segment="nac" class="${snap.meta.segmentLabel === "Nacional" ? "on" : ""}">Nacional</button>
        </div>
        <span class="range-chip"><span class="material-symbols-outlined">date_range</span>${esc(snap.meta.periodRange)}</span>
        <button type="button" class="btn-export" data-export>Exportar informe</button>
      </div>
    </header>

    <section class="kpis">
      <article class="card kpi">
        <div class="kpi-top">
          <div>
            <span class="k-label">Llegadas ${esc(snap.meta.segmentLabel.toLowerCase())}s</span>
            <div class="k-value"><b data-bind="arrivals">${compact(snap.arrivals)}</b>${delta(snap.arrivalsDelta)}</div>
          </div>
          <span class="ico"><span class="material-symbols-outlined">flight_land</span></span>
        </div>
        <div data-bind-spark="arrivals">${sparkline(snap.seriesArrivals, "#00AEAC")}</div>
        <div class="split-bar" aria-hidden="true">
          <span style="width:${snap.air}%"></span>
          <span style="width:${snap.sea}%"></span>
          <span style="width:${snap.land}%"></span>
        </div>
        <p class="k-foot">Aéreo ${snap.air.toFixed(0)}% · Mar ${snap.sea.toFixed(0)}% · Terrestre ${snap.land.toFixed(0)}%</p>
      </article>
      <article class="card kpi">
        <div class="kpi-top">
          <div>
            <span class="k-label">Gasto medio / visitante</span>
            <div class="k-value"><b data-bind="spend">${moneyExact(snap.spend, snap.meta.symbol)}</b>${delta(snap.spendDelta)}</div>
          </div>
          <span class="ico gold"><span class="material-symbols-outlined">payments</span></span>
        </div>
        ${sparkline(snap.seriesSpend, "#FBBB28")}
        <p class="k-foot">Estancia media <strong>${snap.stay.toFixed(1)} días</strong></p>
      </article>
      <article class="card kpi">
        <div class="kpi-top">
          <div>
            <span class="k-label">Ocupación hotelera</span>
            <div class="k-value"><b>${snap.occupancy.toFixed(1)}%</b>${delta(snap.occupancyDelta, " pp")}</div>
          </div>
          <span class="ico"><span class="material-symbols-outlined">hotel</span></span>
        </div>
        ${sparkline(snap.seriesOcc, "#00AEAC")}
        <p class="k-foot">Estado de plaza <em class="pill ${snap.crowd >= 70 ? "hot" : "ok"}">${esc(snap.crowdLabel)}</em></p>
      </article>
      <article class="card kpi">
        <div class="kpi-top">
          <div>
            <span class="k-label">Índice de saturación</span>
            <div class="k-value"><b>${Math.round(snap.crowd)}</b><small>/100</small></div>
          </div>
          <span class="ico orange"><span class="material-symbols-outlined">groups</span></span>
        </div>
        <div class="meter"><span style="width:${snap.crowd}%"></span></div>
        <p class="k-foot">${esc(snap.meta.hub)} marca el núcleo más sensible del corte.</p>
      </article>
      <article class="card kpi">
        <div class="kpi-top">
          <div>
            <span class="k-label">Huella por visitante</span>
            <div class="k-value"><b>${snap.carbon.toFixed(1)}</b><small>kg</small>${delta(snap.carbonDelta)}</div>
          </div>
          <span class="ico lime"><span class="material-symbols-outlined">eco</span></span>
        </div>
        <p class="k-foot">CO₂e estimado según peso del modo aéreo (${snap.air.toFixed(0)}%).</p>
      </article>
    </section>

    <section class="split">
      <article class="card map-card">
        <div class="card-head">
          <h2>Flujo y densidad</h2>
          <div class="seg tiny">
            <button type="button" data-layer="all" class="${snap.meta.layer === "all" ? "on" : ""}">Todo</button>
            <button type="button" data-layer="flow" class="${snap.meta.layer === "flow" ? "on" : ""}">Flujos</button>
            <button type="button" data-layer="heat" class="${snap.meta.layer === "heat" ? "on" : ""}">Calor</button>
          </div>
        </div>
        <div class="map ${esc(snap.meta.layer)}">
          <svg class="map-arcs layer-flow" viewBox="0 0 640 320" aria-hidden="true">
            <path d="M40 220 C 160 40, 300 40, 420 160" fill="none" stroke="#00AEAC" stroke-width="2" stroke-dasharray="6 4"></path>
            <path d="M80 80 C 200 140, 340 60, 520 120" fill="none" stroke="#FBBB28" stroke-width="2"></path>
            <path d="M120 260 C 260 200, 400 240, 580 180" fill="none" stroke="#E9901E" stroke-width="2" stroke-dasharray="3 3"></path>
          </svg>
          ${snap.hotspots
            .map(
              (h) => `<button type="button" class="pin ${esc(h.tone)} layer-heat" style="left:${h.x}%;top:${h.y}%">
                <span class="pin-name">${esc(h.name)}</span>
                <strong>${compact(h.visitors)}</strong>
              </button>`,
            )
            .join("")}
          <div class="map-legend">
            <span><i class="swatch teal"></i> Flujo</span>
            <span><i class="swatch gold"></i> Demanda media</span>
            <span><i class="swatch orange"></i> Saturación</span>
            <span>Hub ${esc(snap.meta.hubCode)}</span>
          </div>
        </div>
      </article>
      <article class="card">
        <div class="card-head"><h2>Tendencia del corte</h2><span class="muted">${esc(snap.meta.periodLabel)}</span></div>
        <svg class="trend" viewBox="0 0 320 140" data-bind-spark="trend" aria-label="Tendencia">
          <path d="${trendLine}" fill="none" stroke="#00AEAC" stroke-width="2.5"></path>
          <path d="${trendLine} L320 140 L0 140 Z" fill="#00AEAC" opacity="0.15"></path>
        </svg>
        <ol class="rank">
          ${snap.origins
            .map(
              (o) => `<li>
                <span>${esc(o.name)}</span>
                <span class="bar"><i style="width:${o.share}%"></i></span>
                <b>${o.share}%</b>
                <small>${compact(o.arrivals)}</small>
              </li>`,
            )
            .join("")}
        </ol>
      </article>
    </section>

    <section class="split bottom">
      <article class="card">
        <div class="card-head"><h2>Gasto del visitante</h2><span class="muted">${esc(snap.meta.currency)}</span></div>
        <div class="donut-row">
          ${donut(snap.spendMix)}
          <ul class="legend">
            ${snap.spendMix.map((p) => `<li><i style="background:${p.color}"></i>${esc(p.name)} <b>${p.share.toFixed(0)}%</b></li>`).join("")}
          </ul>
        </div>
      </article>
      <article class="card">
        <div class="card-head"><h2>Alertas del corte</h2></div>
        <ul class="alerts">
          ${snap.alerts
            .map(
              (a) => `<li class="alert ${esc(a.tone)}"><strong>${esc(a.title)}</strong><p>${esc(a.text)}</p></li>`,
            )
            .join("")}
        </ul>
      </article>
    </section>

    <section class="card table-card">
      <div class="card-head">
        <h2>Destinos con mayor rendimiento</h2>
        <span class="muted">${rows.length} visibles</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Destino</th><th>Llegadas</th><th>Gasto medio</th><th>Ocupación</th><th>Saturación</th><th>Sentimiento</th></tr>
          </thead>
          <tbody>
            ${
              rows.length
                ? rows
                    .map(
                      (d) => `<tr>
                        <td><b>${esc(d.name)}</b><small>${esc(d.country)} · ${esc(d.code)}</small></td>
                        <td>${compact(d.arrivals)}</td>
                        <td>${moneyExact(d.spend, snap.meta.symbol)}</td>
                        <td>${d.occupancy.toFixed(1)}%</td>
                        <td><span class="meter slim"><i style="width:${d.crowd}%"></i></span> ${Math.round(d.crowd)}</td>
                        <td>${d.sentiment}%</td>
                      </tr>`,
                    )
                    .join("")
                : `<tr><td colspan="6" class="empty">Sin destinos para «${esc(snap.meta.query)}».</td></tr>`
            }
          </tbody>
        </table>
      </div>
    </section>
  `;
}
