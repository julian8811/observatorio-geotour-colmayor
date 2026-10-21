const REGIONS = {
  global: {
    label: "Global",
    factor: 1,
    phase: 0.4,
    price: 1,
    occ: 1,
    crowd: 62,
    air: 72,
    sea: 18,
    hub: "Nodo global",
    hubCode: "GEO",
    destinations: [
      { name: "Cancún", country: "México", code: "CUN" },
      { name: "Barcelona", country: "España", code: "BCN" },
      { name: "Kioto", country: "Japón", code: "UKY" },
      { name: "Costa Rica", country: "Costa Rica", code: "SJO" },
    ],
    origins: [
      { name: "Estados Unidos", share: 28 },
      { name: "España", share: 16 },
      { name: "Alemania", share: 12 },
      { name: "Reino Unido", share: 11 },
      { name: "Francia", share: 9 },
    ],
    pois: [
      { name: "Centro Histórico", x: 28, y: 42, tone: "hot" },
      { name: "Playa Principal", x: 62, y: 58, tone: "flow" },
      { name: "Parque Arqueológico", x: 46, y: 28, tone: "mid" },
      { name: "Distrito Gastronómico", x: 74, y: 36, tone: "flow" },
    ],
    zones: ["Centro Histórico", "Frente Marítimo", "Valle Ecológico", "Distrito de Congresos"],
    routes: [
      { from: "JFK", to: "GEO", city: "Nueva York" },
      { from: "LHR", to: "GEO", city: "Londres" },
      { from: "FRA", to: "GEO", city: "Fráncfort" },
      { from: "EZE", to: "GEO", city: "Buenos Aires" },
      { from: "HND", to: "GEO", city: "Tokio" },
    ],
    modes: [
      { name: "Alta velocidad", share: 22 },
      { name: "Rent-a-car", share: 31 },
      { name: "Transporte público", share: 28 },
      { name: "Bus privado", share: 19 },
    ],
  },
  mediterraneo: {
    label: "Mediterráneo",
    factor: 0.34,
    phase: 1.7,
    price: 1.16,
    occ: 1.06,
    crowd: 71,
    air: 64,
    sea: 27,
    hub: "Barcelona",
    hubCode: "BCN",
    destinations: [
      { name: "Barcelona", country: "España", code: "BCN" },
      { name: "Roma", country: "Italia", code: "FCO" },
      { name: "Atenas", country: "Grecia", code: "ATH" },
      { name: "Dubrovnik", country: "Croacia", code: "DBV" },
    ],
    origins: [
      { name: "Alemania", share: 24 },
      { name: "Francia", share: 19 },
      { name: "Reino Unido", share: 17 },
      { name: "Italia", share: 14 },
      { name: "Países Bajos", share: 9 },
    ],
    pois: [
      { name: "Barrio Gótico", x: 34, y: 38, tone: "hot" },
      { name: "Puerto", x: 70, y: 62, tone: "flow" },
      { name: "Rambla", x: 48, y: 46, tone: "hot" },
      { name: "Barceloneta", x: 76, y: 40, tone: "mid" },
    ],
    zones: ["Ciutat Vella", "Puerto", "Eixample", "Frente marítimo"],
    routes: [
      { from: "MUC", to: "BCN", city: "Múnich" },
      { from: "CDG", to: "BCN", city: "París" },
      { from: "LHR", to: "FCO", city: "Londres" },
      { from: "AMS", to: "ATH", city: "Ámsterdam" },
      { from: "FCO", to: "DBV", city: "Roma" },
    ],
    modes: [
      { name: "Alta velocidad", share: 38 },
      { name: "Rent-a-car", share: 18 },
      { name: "Transporte público", share: 32 },
      { name: "Bus privado", share: 12 },
    ],
  },
  caribe: {
    label: "Caribe",
    factor: 0.22,
    phase: 2.4,
    price: 0.94,
    occ: 1.1,
    crowd: 68,
    air: 81,
    sea: 14,
    hub: "Cancún",
    hubCode: "CUN",
    destinations: [
      { name: "Cancún", country: "México", code: "CUN" },
      { name: "Punta Cana", country: "Rep. Dominicana", code: "PUJ" },
      { name: "Cartagena", country: "Colombia", code: "CTG" },
      { name: "San Juan", country: "Puerto Rico", code: "SJU" },
    ],
    origins: [
      { name: "Estados Unidos", share: 46 },
      { name: "Canadá", share: 14 },
      { name: "Colombia", share: 11 },
      { name: "México", share: 9 },
      { name: "España", share: 7 },
    ],
    pois: [
      { name: "Zona hotelera", x: 66, y: 48, tone: "hot" },
      { name: "Centro amurallado", x: 32, y: 36, tone: "mid" },
      { name: "Muelle de cruceros", x: 48, y: 70, tone: "flow" },
      { name: "Isla arrecife", x: 78, y: 28, tone: "flow" },
    ],
    zones: ["Zona hotelera", "Centro histórico", "Muelle", "Corredor de playa"],
    routes: [
      { from: "MIA", to: "CUN", city: "Miami" },
      { from: "ATL", to: "PUJ", city: "Atlanta" },
      { from: "BOG", to: "CTG", city: "Bogotá" },
      { from: "JFK", to: "SJU", city: "Nueva York" },
      { from: "MEX", to: "CUN", city: "Ciudad de México" },
    ],
    modes: [
      { name: "Alta velocidad", share: 4 },
      { name: "Rent-a-car", share: 36 },
      { name: "Transporte público", share: 22 },
      { name: "Bus privado", share: 38 },
    ],
  },
  andes: {
    label: "Región Andina",
    factor: 0.18,
    phase: 3.1,
    price: 0.68,
    occ: 0.9,
    crowd: 54,
    air: 70,
    sea: 2,
    hub: "Medellín",
    hubCode: "MDE",
    destinations: [
      { name: "Medellín", country: "Colombia", code: "MDE" },
      { name: "Bogotá", country: "Colombia", code: "BOG" },
      { name: "Quito", country: "Ecuador", code: "UIO" },
      { name: "Cusco", country: "Perú", code: "CUZ" },
    ],
    origins: [
      { name: "Colombia", share: 31 },
      { name: "Estados Unidos", share: 22 },
      { name: "España", share: 12 },
      { name: "México", share: 9 },
      { name: "Perú", share: 8 },
    ],
    pois: [
      { name: "Centro", x: 40, y: 44, tone: "mid" },
      { name: "Comuna 13", x: 24, y: 62, tone: "hot" },
      { name: "Pueblito Paisa", x: 58, y: 30, tone: "flow" },
      { name: "Aeropuerto", x: 76, y: 55, tone: "flow" },
    ],
    zones: ["El Centro", "El Poblado", "Laureles", "Corredor de feria"],
    routes: [
      { from: "BOG", to: "MDE", city: "Bogotá" },
      { from: "MIA", to: "BOG", city: "Miami" },
      { from: "MAD", to: "BOG", city: "Madrid" },
      { from: "LIM", to: "CUZ", city: "Lima" },
      { from: "PTY", to: "MDE", city: "Panamá" },
    ],
    modes: [
      { name: "Alta velocidad", share: 6 },
      { name: "Rent-a-car", share: 24 },
      { name: "Transporte público", share: 41 },
      { name: "Bus privado", share: 29 },
    ],
  },
  sudeste: {
    label: "Sudeste Asiático",
    factor: 0.27,
    phase: 4.2,
    price: 0.82,
    occ: 0.98,
    crowd: 74,
    air: 86,
    sea: 8,
    hub: "Singapur",
    hubCode: "SIN",
    destinations: [
      { name: "Bali", country: "Indonesia", code: "DPS" },
      { name: "Bangkok", country: "Tailandia", code: "BKK" },
      { name: "Singapur", country: "Singapur", code: "SIN" },
      { name: "Hoi An", country: "Vietnam", code: "DAD" },
    ],
    origins: [
      { name: "China", share: 26 },
      { name: "Australia", share: 15 },
      { name: "Corea del Sur", share: 12 },
      { name: "Japón", share: 11 },
      { name: "India", share: 10 },
    ],
    pois: [
      { name: "Templo", x: 30, y: 34, tone: "hot" },
      { name: "Mercado nocturno", x: 55, y: 58, tone: "hot" },
      { name: "Marina", x: 74, y: 42, tone: "flow" },
      { name: "Barrio antiguo", x: 42, y: 68, tone: "mid" },
    ],
    zones: ["Núcleo histórico", "Marina", "Distrito de templos", "Corredor comercial"],
    routes: [
      { from: "HKG", to: "BKK", city: "Hong Kong" },
      { from: "SYD", to: "DPS", city: "Sídney" },
      { from: "NRT", to: "SIN", city: "Tokio" },
      { from: "ICN", to: "BKK", city: "Seúl" },
      { from: "DEL", to: "SIN", city: "Delhi" },
    ],
    modes: [
      { name: "Alta velocidad", share: 14 },
      { name: "Rent-a-car", share: 12 },
      { name: "Transporte público", share: 46 },
      { name: "Bus privado", share: 28 },
    ],
  },
};

const PERIODS = {
  temporada: { label: "Temporada Alta 2024", range: "01 Jun - 31 Ago 2024", factor: 1, growth: 14.6, occ: 1 },
  dias30: { label: "Últimos 30 días", range: "Últimos 30 días", factor: 0.28, growth: 6.2, occ: 0.96 },
  q3: { label: "Q3 2024 Acumulado", range: "01 Jul - 30 Sep 2024", factor: 0.86, growth: 11.1, occ: 0.98 },
  ytd: { label: "Año en curso (YTD)", range: "01 Ene - corte actual", factor: 1.42, growth: 9.4, occ: 0.91 },
};

const SEGMENTS = {
  intl: { label: "Internacional", factor: 1, spend: 1, airShift: 0 },
  nac: { label: "Nacional", factor: 0.64, spend: 0.72, airShift: -18 },
};

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function wave(length, phase, lift) {
  return Array.from({ length }, (_, i) => {
    const v = 42 + Math.sin(i / 1.35 + phase) * 16 + i * lift;
    return Math.round(v * 10) / 10;
  });
}

function mixSpend(segment, region) {
  const base =
    segment === "nac"
      ? [
          { name: "Alojamiento", share: 35, color: "#00AEAC" },
          { name: "Gastronomía", share: 30, color: "#FBBB28" },
          { name: "Experiencias", share: 15, color: "#E9901E" },
          { name: "Compras", share: 12, color: "#B4C42C" },
          { name: "Transporte", share: 8, color: "#7EE0DC" },
        ]
      : [
          { name: "Alojamiento", share: 42, color: "#00AEAC" },
          { name: "Gastronomía", share: 26, color: "#FBBB28" },
          { name: "Experiencias", share: 18, color: "#E9901E" },
          { name: "Compras", share: 9, color: "#B4C42C" },
          { name: "Transporte", share: 5, color: "#7EE0DC" },
        ];
  const nudge = region.sea > 15 ? 2 : -1;
  const shifted = base.map((item, i) => ({
    ...item,
    share: clamp(item.share + (i === 0 ? nudge : i === 4 ? -nudge / 2 : 0), 4, 60),
  }));
  const total = shifted.reduce((sum, item) => sum + item.share, 0);
  return shifted.map((item) => ({ ...item, share: (item.share / total) * 100 }));
}

function clock(now) {
  return now.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });
}

export function snapshot(state) {
  const region = REGIONS[state.region];
  const period = PERIODS[state.period];
  const segment = SEGMENTS[state.segment];
  const fx = state.currency === "EUR" ? 0.92 : 1;
  const symbol = state.currency === "EUR" ? "€" : "$";
  const live = 1 + Math.sin(state.tick / 2) * 0.012;
  const peak = state.peak ? 1.18 : 1;
  const volume = region.factor * period.factor * segment.factor * peak;
  const telemetry = 99.2 + Math.sin(state.tick / 2) * 0.55;

  const arrivals = 4_820_000 * volume * live;
  const spend = 1420 * region.price * segment.spend * period.occ * fx;
  const stay = clamp(6.4 * (state.segment === "nac" ? 0.72 : 1) * (region.price > 1 ? 1.08 : 0.96), 2.1, 12);
  const occupancy = clamp(84.2 * region.occ * period.occ * (state.peak ? 1.06 : 1), 46, 98);
  const crowd = clamp(Math.round(region.crowd * (state.segment === "nac" ? 0.86 : 1) * (state.peak ? 1.12 : 1)), 20, 98);
  const air = clamp(region.air + segment.airShift, 20, 92);
  const sea = clamp(region.sea * (state.segment === "nac" ? 0.4 : 1), 0, 40);
  const land = clamp(100 - air - sea, 4, 70);
  const carbon = clamp(18.4 * (air / 72) * (state.segment === "nac" ? 0.7 : 1), 6, 32);
  const growth = period.growth + (region.crowd - 62) * 0.08;
  const flights = Math.round(12840 * volume * live);
  const loadFactor = clamp(81 + (occupancy - 84) * 0.45, 55, 96);
  const newRoutes = Math.max(2, Math.round(14 * region.factor * (state.segment === "intl" ? 1 : 0.45)));
  const cruise = Math.round(186000 * region.factor * period.factor * (sea / 18) * (state.segment === "intl" ? 1 : 0.35));
  const revpar = spend * (occupancy / 100) * 0.22;
  const adr = spend * 0.31;
  const impact = arrivals * spend;
  const lead = clamp(Math.round(46 * (state.segment === "intl" ? 1.25 : 0.7) * region.price), 8, 120);
  const cancel = clamp(7.4 * (state.peak ? 1.3 : 1) * (period.factor > 1 ? 0.9 : 1.05), 2.5, 18);

  const hotspots = region.pois.map((poi, i) => ({
    ...poi,
    visitors: Math.round(arrivals * (0.08 - i * 0.012)),
    wait: state.peak ? 18 + i * 7 : 4 + i * 3,
    score: clamp(92 - i * 6 - (state.peak ? 8 : 0), 40, 98),
  }));

  const destinations = region.destinations.map((d, i) => {
    const share = [0.34, 0.27, 0.22, 0.17][i];
    const occ = clamp(occupancy - i * 3.4 + (i === 0 ? 4 : 0), 40, 99);
    return {
      ...d,
      arrivals: arrivals * share,
      spend: spend * (1.08 - i * 0.07),
      occupancy: occ,
      crowd: clamp(crowd - 6 + i * 4, 18, 99),
      sentiment: clamp(92 - i * 5, 60, 98),
    };
  });

  const originTotal = region.origins.reduce((sum, item) => sum + item.share, 0);
  const origins = region.origins.map((o) => ({
    ...o,
    share: Math.round((o.share / originTotal) * 100),
    arrivals: arrivals * (o.share / originTotal),
  }));

  const routes = region.routes.map((r, i) => ({
    ...r,
    flights: Math.round(flights * (0.22 - i * 0.03)),
    load: clamp(loadFactor - i * 2.2, 58, 97),
  }));

  const zones = region.zones.map((name, i) => ({
    name,
    occupancy: clamp(occupancy + (i === 0 ? 6 : -i * 2.5), 42, 99),
    adr: adr * (1.12 - i * 0.08),
    revpar: revpar * (1.1 - i * 0.09),
  }));

  const channels = [
    { name: "Web directa", share: state.segment === "nac" ? 34 : 22 },
    { name: "Booking.com", share: state.segment === "nac" ? 18 : 27 },
    { name: "Airbnb / P2P", share: state.segment === "nac" ? 16 : 14 },
    { name: "Expedia Group", share: state.segment === "nac" ? 10 : 17 },
    { name: "Turoperación", share: state.segment === "nac" ? 22 : 20 },
  ].map((c) => ({
    ...c,
    adr: adr * (c.name === "Web directa" ? 1.08 : 0.96),
    margin: clamp(28 - (c.name === "Turoperación" ? 10 : 0) + (state.segment === "nac" ? 3 : 0), 8, 40),
  }));

  const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  const parts = [
    { id: "morning", label: "Mañana 08–13" },
    { id: "afternoon", label: "Tarde 13–19" },
    { id: "night", label: "Noche 19–02" },
  ];
  const heatmap = parts.map((part, pi) => ({
    ...part,
    cells: days.map((day, di) => {
      const weekend = di >= 5;
      const raw = 28 + ((region.phase * 13 + pi * 17 + di * 11) % 40) + (weekend ? 22 : 0) + (pi === 1 ? 10 : 0);
      return {
        day,
        value: Math.round(raw * (state.peak ? 1.15 : 1) * (0.85 + region.crowd / 200)),
      };
    }),
  }));

  const forecast14 = Array.from({ length: 14 }, (_, i) => {
    const weekend = i % 7 === 5 || i % 7 === 6;
    const value = clamp(
      52 + Math.sin(i / 2 + region.phase) * 14 + (weekend ? 18 : 0) + (region.crowd - 62) * 0.35,
      24,
      99,
    );
    return { day: i + 1, value: Math.round(value * (state.peak ? 1.08 : 1)) };
  });

  const top = destinations[0];
  const alerts = [
    {
      tone: crowd > 70 ? "hot" : "warn",
      title: crowd > 70 ? "Saturación patrimonial" : "Capacidad en vigilancia",
      text: `${top.name} opera con índice ${Math.round(top.crowd)}/100 en el corte ${period.range}.`,
    },
    {
      tone: "info",
      title: state.segment === "intl" ? "Conectividad aérea" : "Desplazamiento interno",
      text: `${region.hub} concentra el hub ${region.hubCode} con factor de carga ${loadFactor.toFixed(1)}%.`,
    },
    {
      tone: "gold",
      title: "Evento de demanda",
      text: state.peak
        ? "Simulador de pico activo: la afluencia simultánea sube en los núcleos marcados."
        : `${region.label} mantiene estancia media de ${stay.toFixed(1)} días en segmento ${segment.label.toLowerCase()}.`,
    },
  ];

  return {
    meta: {
      regionLabel: region.label,
      periodLabel: period.label,
      periodRange: period.range,
      segmentLabel: segment.label,
      currency: state.currency,
      symbol,
      clock: `${clock(state.now)} UTC`,
      telemetry,
      hub: region.hub,
      hubCode: region.hubCode,
      layer: state.layer,
      peak: state.peak,
      query: state.query.trim().toLowerCase(),
    },
    arrivals,
    arrivalsDelta: growth,
    spend,
    spendDelta: growth * 0.57,
    stay,
    occupancy,
    occupancyDelta: (occupancy - 79) * 0.35,
    crowd,
    carbon,
    carbonDelta: carbon > 16 ? 2.4 : -1.6,
    air,
    sea,
    land,
    seriesArrivals: wave(8, region.phase + state.tick * 0.45, 3.2),
    seriesSpend: wave(8, region.phase + 1 + state.tick * 0.2, 2.1),
    seriesOcc: wave(8, region.phase + 0.6, 1.4),
    trend: wave(12, region.phase, 2.4),
    hotspots,
    destinations,
    origins,
    routes,
    zones,
    channels,
    heatmap,
    forecast14,
    flights,
    flightsDelta: growth * 0.8,
    loadFactor,
    newRoutes,
    cruise,
    revpar,
    adr,
    impact,
    lead,
    cancel,
    spendMix: mixSpend(state.segment, region),
    modes: region.modes,
    alerts,
    crowdLabel: crowd >= 75 ? "Saturación" : crowd >= 60 ? "Alta demanda" : "Fluido",
  };
}

export function matchesQuery(snap, name) {
  if (!snap.meta.query) return true;
  return name.toLowerCase().includes(snap.meta.query);
}
