// defineNavConfig() — the schema for a product's `geiger-ui.config.js`.
//
// A Geiger app owns its sidebar nav (an array of { title, icon, subItems }).
// This config is where it declares the RULES around that nav: which entries a
// user may never hide, which start hidden, and — the important part — which
// entries depend on which. The library reads those rules and enforces them, so
// no product has to re-implement "you can't hide Check-in, Session Check-in
// needs it".
//
// Normalises, validates and freezes. Config mistakes throw at module load
// rather than silently producing a broken sidebar.

function asTitleList(value, field) {
  if (value == null) return [];
  if (!Array.isArray(value)) {
    throw new Error(`[geiger/ui] nav config: "${field}" must be an array of nav titles.`);
  }
  return value.map((title) => {
    if (typeof title !== "string" || !title.trim()) {
      throw new Error(`[geiger/ui] nav config: "${field}" contains a non-string title.`);
    }
    return title.trim();
  });
}

// One dependency rule: `screen` cannot be visible unless every title in
// `requires` is visible too. `reason` is surfaced to the user when a toggle is
// blocked; a readable default is derived when it's omitted.
function normalizeRule(rule, index) {
  if (!rule || typeof rule !== "object") {
    throw new Error(`[geiger/ui] nav config: dependencies[${index}] must be an object.`);
  }
  const screen = typeof rule.screen === "string" ? rule.screen.trim() : "";
  if (!screen) {
    throw new Error(`[geiger/ui] nav config: dependencies[${index}] is missing "screen".`);
  }
  const requires = asTitleList(rule.requires, `dependencies[${index}].requires`).filter(
    (title) => title !== screen,
  );
  if (requires.length === 0) {
    throw new Error(
      `[geiger/ui] nav config: dependencies[${index}] ("${screen}") requires nothing.`,
    );
  }
  return Object.freeze({
    screen,
    requires: Object.freeze(requires),
    reason: typeof rule.reason === "string" && rule.reason.trim() ? rule.reason.trim() : "",
  });
}

// A requirement cycle can never be satisfied — every screen in it would block
// every other. Catch it here rather than at toggle time.
function assertAcyclic(rules) {
  const edges = new Map();
  rules.forEach((rule) => {
    const existing = edges.get(rule.screen) || [];
    edges.set(rule.screen, existing.concat(rule.requires));
  });

  const VISITING = 1;
  const DONE = 2;
  const state = new Map();

  const walk = (node, trail) => {
    const seen = state.get(node);
    if (seen === DONE) return;
    if (seen === VISITING) {
      throw new Error(
        `[geiger/ui] nav config: dependency cycle — ${trail.concat(node).join(" -> ")}`,
      );
    }
    state.set(node, VISITING);
    (edges.get(node) || []).forEach((next) => walk(next, trail.concat(node)));
    state.set(node, DONE);
  };

  edges.forEach((_, node) => walk(node, []));
}

export function defineNavConfig(config = {}) {
  const locked = asTitleList(config.locked, "locked");
  const hiddenByDefault = asTitleList(config.hiddenByDefault, "hiddenByDefault");

  const overlap = hiddenByDefault.filter((title) => locked.includes(title));
  if (overlap.length > 0) {
    throw new Error(
      `[geiger/ui] nav config: ${overlap.join(", ")} is both locked and hiddenByDefault.`,
    );
  }

  const rules = Array.isArray(config.dependencies)
    ? config.dependencies.map(normalizeRule)
    : [];
  assertAcyclic(rules);

  return Object.freeze({
    product: typeof config.product === "string" ? config.product : "",
    locked: Object.freeze(locked),
    hiddenByDefault: Object.freeze(hiddenByDefault),
    dependencies: Object.freeze(rules),
  });
}

// The everything-allowed config used when an app passes none, so the resolver
// and the settings screen work before a product writes its own rules.
export const EMPTY_NAV_CONFIG = defineNavConfig({});

export default defineNavConfig;
