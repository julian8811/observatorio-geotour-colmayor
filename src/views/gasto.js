import { matchesQuery } from "../data.js";
import { compact, delta, donut, esc, money, moneyExact, sparkline } from "../ui.js";

export function renderGasto(snap) {
  const zones = snap.zones.filter((z) => matchesQuery(snap, z.name));
  const maxAdr = Math.max(...snap.seriesSpend);
  const adrLine = snap.seriesSpend
    .map((v, i) => {
      const x = 20 + (i / (snap.seriesSpend.length - 1)) * 300;
      const y = 110 - (v / maxAdr) * 80;
      return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  const occLine = snap.seriesOcc
    .map((v, i) => {
      const x = 20 + (i / (snap.seriesOcc.length - 1)) * 300;
      const y = 120 - (v / Math.max(...snap.seriesOcc)) * 70;
      return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return `
    <header class="page-head">
      <div>
        <div class="eyebrow"><span class="pulse-dot"></span> Rendimiento hotelero · <span data-bind="clock">${esc(snap.meta.clock)}</span></div>
        <h1>Gasto y ocupación</h1>
        <p>Cifras en ${esc(snap.meta.currency)} para ${esc(snap.meta.regionLabel)}, segmento ${esc(snap.meta.segmentLabel.toLowerCase())}. La moneda solo convierte el gasto.</p>
      </div>
      <button type="button" class="btn-export" data-export>Exportar informe</button>
    </header>

    <section class="kpis">
      <article class="card kpi">
        <span class="k-label">RevPAR</span>
        <div class="k-value"><b data-bind="spend">${moneyExact(snap.revpar, snap.meta.symbol)}</b>${delta(snap.spendDelta)}</div>
        ${sparkline(snap.seriesSpend, "#00AEAC")}
      </article>
      <article class="card kpi">
        <span class="k-label">ADR</span>
        <div class="k-value"><b>${moneyExact(snap.adr, snap.meta.symbol)}</b></div>
        ${sparkline(snap.seriesOcc, "#FBBB28")}
      </article>
      <article class="card kpi">
        <span class="k-label">Impacto económico</span>
        <div class="k-value"><b>${money(snap.impact, snap.meta.symbol)}</b></div>
        <p class="k-foot">Llegadas × gasto medio del corte.</p>
      </article>
      <article class="card kpi">
        <span class="k-label">Antelación de reserva</span>
        <div class="k-value"><b>${snap.lead}</b><small>días</small></div>
        <p class="k-foot">Lead time del segmento ${esc(snap.meta.segmentLabel.toLowerCase())}.</p>
      </article>
      <article class="card kpi">
        <span class="k-label">Cancelación</span>
        <div class="k-value"><b>${snap.cancel.toFixed(1)}%</b></div>
        <div class="meter orange"><span style="width:${snap.cancel * 4}%"></span></div>
      </article>
    </section>

    <section class="split">
      <article class="card">
        <div class="card-head"><h2>ADR y ocupación</h2><span class="muted">${esc(snap.meta.periodLabel)}</span></div>
        <svg class="trend" viewBox="0 0 340 140" aria-label="ADR y ocupación">
          <path d="${adrLine}" fill="none" stroke="#00AEAC" stroke-width="2.5"></path>
          <path d="${occLine}" fill="none" stroke="#FBBB28" stroke-width="2.5"></path>
        </svg>
        <p class="k-foot"><i class="swatch teal"></i> ADR <i class="swatch gold"></i> Ocupación · plaza media ${snap.occupancy.toFixed(1)}%</p>
      </article>
      <article class="card">
        <div class="card-head"><h2>Gasto por rubro</h2></div>
        <div class="donut-row">
          ${donut(snap.spendMix)}
          <ul class="legend">
            ${snap.spendMix.map((p) => `<li><i style="background:${p.color}"></i>${esc(p.name)} <b>${moneyExact((snap.spend * p.share) / 100, snap.meta.symbol)}</b></li>`).join("")}
          </ul>
        </div>
      </article>
    </section>

    <section class="channel-grid">
      ${snap.channels
        .map(
          (c) => `<article class="card channel">
            <header><b>${esc(c.name)}</b><span>${c.share}%</span></header>
            <p>ADR ${moneyExact(c.adr, snap.meta.symbol)}</p>
            <div class="meter"><span style="width:${c.share * 2.4}%"></span></div>
            <p class="k-foot">Margen estimado ${c.margin.toFixed(0)}%</p>
          </article>`,
        )
        .join("")}
    </section>

    <section class="card table-card">
      <div class="card-head"><h2>Ocupación por microzona</h2><span class="muted">${esc(snap.meta.hub)}</span></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Microzona</th><th>Ocupación</th><th>ADR</th><th>RevPAR</th></tr></thead>
          <tbody>
            ${
              zones.length
                ? zones
                    .map(
                      (z) => `<tr>
                        <td><b>${esc(z.name)}</b></td>
                        <td><span class="meter slim"><i style="width:${z.occupancy}%"></i></span> ${z.occupancy.toFixed(1)}%</td>
                        <td>${moneyExact(z.adr, snap.meta.symbol)}</td>
                        <td>${moneyExact(z.revpar, snap.meta.symbol)}</td>
                      </tr>`,
                    )
                    .join("")
                : `<tr><td colspan="4" class="empty">Sin microzonas para «${esc(snap.meta.query)}».</td></tr>`
            }
          </tbody>
        </table>
      </div>
    </section>
  `;
}
