import { compact, delta, esc, heatColor } from "../ui.js";

export function renderMovilidad(snap) {
  const maxBar = Math.max(...snap.forecast14.map((d) => d.value));
  return `
    <header class="page-head">
      <div>
        <div class="eyebrow"><span class="pulse-dot"></span> Conectividad · <span data-bind="clock">${esc(snap.meta.clock)}</span></div>
        <h1>Movilidad aérea y rutas</h1>
        <p>Hub ${esc(snap.meta.hub)} (${esc(snap.meta.hubCode)}) · ${esc(snap.meta.regionLabel)} · ${esc(snap.meta.segmentLabel)}.</p>
      </div>
      <div class="live-ports">
        <span><i class="pulse-dot"></i> Telemetría <b data-bind="telemetry">${snap.meta.telemetry.toFixed(1)}%</b></span>
        <span>ADS-B sincronizado</span>
      </div>
    </header>

    <section class="kpis four">
      <article class="card kpi">
        <span class="k-label">Vuelos comerciales</span>
        <div class="k-value"><b data-bind="flights">${compact(snap.flights)}</b>${delta(snap.flightsDelta)}</div>
      </article>
      <article class="card kpi">
        <span class="k-label">Factor de carga</span>
        <div class="k-value"><b>${snap.loadFactor.toFixed(1)}%</b></div>
        <div class="meter"><span style="width:${snap.loadFactor}%"></span></div>
      </article>
      <article class="card kpi">
        <span class="k-label">Rutas directas nuevas</span>
        <div class="k-value"><b>${snap.newRoutes}</b></div>
        <p class="k-foot">Corredores del segmento ${esc(snap.meta.segmentLabel.toLowerCase())}.</p>
      </article>
      <article class="card kpi">
        <span class="k-label">Pasajeros de crucero</span>
        <div class="k-value"><b>${compact(snap.cruise)}</b></div>
        <p class="k-foot">Peso marítimo ${snap.sea.toFixed(0)}%.</p>
      </article>
    </section>

    <section class="split">
      <article class="card map-card">
        <div class="card-head"><h2>Radar de rutas · ${esc(snap.meta.hubCode)}</h2></div>
        <div class="radar">
          <svg viewBox="0 0 360 360" aria-label="Radar de rutas">
            <circle cx="180" cy="180" r="56" fill="none" stroke="#00AEAC" stroke-opacity="0.35"></circle>
            <circle cx="180" cy="180" r="108" fill="none" stroke="#00AEAC" stroke-opacity="0.25"></circle>
            <circle cx="180" cy="180" r="156" fill="none" stroke="#00AEAC" stroke-opacity="0.18"></circle>
            <line x1="180" y1="16" x2="180" y2="344" stroke="#00AEAC" stroke-opacity="0.2"></line>
            <line x1="16" y1="180" x2="344" y2="180" stroke="#00AEAC" stroke-opacity="0.2"></line>
            ${snap.routes
              .map((r, i) => {
                const angle = (-70 + i * 58) * (Math.PI / 180);
                const x = 180 + Math.cos(angle) * 140;
                const y = 180 + Math.sin(angle) * 140;
                return `<path d="M ${x.toFixed(1)} ${y.toFixed(1)} Q ${(x + 180) / 2} ${(y + 80).toFixed(1)}, 180 180" fill="none" stroke="${i % 2 ? "#FBBB28" : "#00AEAC"}" stroke-width="2"></path>
                  <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="${i % 2 ? "#FBBB28" : "#00AEAC"}"></circle>
                  <text x="${x.toFixed(1)}" y="${(y - 10).toFixed(1)}" text-anchor="middle" fill="#F4F7FB" font-size="11">${esc(r.from)}</text>`;
              })
              .join("")}
            <circle cx="180" cy="180" r="7" fill="#00AEAC"></circle>
            <text x="180" y="200" text-anchor="middle" fill="#FBBB28" font-size="12">${esc(snap.meta.hubCode)}</text>
          </svg>
        </div>
      </article>
      <article class="card">
        <div class="card-head"><h2>Corredores con mayor densidad</h2></div>
        <ul class="corridors">
          ${snap.routes
            .map(
              (r) => `<li>
                <div><b>${esc(r.from)} → ${esc(r.to)}</b><small>${esc(r.city)}</small></div>
                <span>${compact(r.flights)} vuelos</span>
                <span class="meter slim"><i style="width:${r.load}%"></i></span>
                <b>${r.load.toFixed(0)}%</b>
              </li>`,
            )
            .join("")}
        </ul>
      </article>
    </section>

    <section class="channel-grid four">
      ${snap.modes
        .map(
          (m) => `<article class="card channel">
            <header><b>${esc(m.name)}</b><span>${m.share}%</span></header>
            <div class="meter"><span style="width:${m.share * 2}%"></span></div>
            <p class="k-foot">Parte del desplazamiento posterior a la llegada.</p>
          </article>`,
        )
        .join("")}
    </section>

    <section class="split bottom">
      <article class="card">
        <div class="card-head"><h2>Pronóstico de llegadas · 14 días</h2><span class="muted">% de capacidad</span></div>
        <div class="forecast">
          ${snap.forecast14
            .map(
              (d) => `<div class="f-col" title="Día ${d.day}: ${d.value}%">
                <div class="f-bar ${heatColor(d.value)}" style="height:${(d.value / maxBar) * 100}%"></div>
                <span>${d.day}</span>
              </div>`,
            )
            .join("")}
        </div>
      </article>
      <article class="card">
        <div class="card-head"><h2>Alertas operativas</h2></div>
        <ul class="alerts">
          ${snap.alerts.map((a) => `<li class="alert ${esc(a.tone)}"><strong>${esc(a.title)}</strong><p>${esc(a.text)}</p></li>`).join("")}
        </ul>
      </article>
    </section>
  `;
}
