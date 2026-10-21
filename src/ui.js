export function esc(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

export function compact(n) {
  const abs = Math.abs(n);
  if (abs >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `${(n / 1e3).toFixed(1)}k`;
  return Math.round(n).toLocaleString("es-CO");
}

export function money(n, symbol) {
  return `${symbol}${compact(n)}`;
}

export function moneyExact(n, symbol) {
  return `${symbol}${Math.round(n).toLocaleString("es-CO")}`;
}

export function delta(n, suffix = "%") {
  const up = n >= 0;
  const sign = up ? "+" : "";
  return `<span class="delta ${up ? "up" : "down"}">${sign}${n.toFixed(1)}${suffix}</span>`;
}

export function sparkline(values, color = "#00AEAC") {
  const w = 140;
  const h = 36;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - 4 - ((v - min) / (max - min || 1)) * (h - 8);
    return [x, y];
  });
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L${w} ${h} L0 ${h} Z`;
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" aria-hidden="true"><path d="${area}" fill="${color}" opacity="0.18"></path><path d="${line}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"></path></svg>`;
}

export function donut(parts) {
  const r = 42;
  const c = 2 * Math.PI * r;
  let offset = 0;
  const rings = parts
    .map((part) => {
      const len = c * (part.share / 100);
      const node = `<circle cx="60" cy="60" r="${r}" fill="none" stroke="${part.color}" stroke-width="14" stroke-dasharray="${len.toFixed(2)} ${(c - len).toFixed(2)}" stroke-dashoffset="${(-offset).toFixed(2)}" stroke-linecap="butt"></circle>`;
      offset += len;
      return node;
    })
    .join("");
  return `<svg class="donut" viewBox="0 0 120 120">${rings}<circle cx="60" cy="60" r="28" fill="#1C2744"></circle></svg>`;
}

export function heatColor(value) {
  if (value >= 78) return "heat-hot";
  if (value >= 60) return "heat-warm";
  if (value >= 42) return "heat-mid";
  return "heat-cool";
}
