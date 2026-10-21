export const state = {
  region: "global",
  period: "temporada",
  segment: "intl",
  currency: "USD",
  route: "resumen",
  query: "",
  layer: "all",
  peak: false,
  tick: 0,
  now: new Date(),
};

const listeners = new Set();
const liveListeners = new Set();

export function setState(patch) {
  Object.assign(state, patch);
  listeners.forEach((fn) => fn(state));
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function subscribeLive(fn) {
  liveListeners.add(fn);
  return () => liveListeners.delete(fn);
}

export function pulse() {
  state.tick += 1;
  state.now = new Date();
  liveListeners.forEach((fn) => fn(state));
}
