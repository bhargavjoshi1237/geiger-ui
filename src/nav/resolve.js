// Pure resolution of "which nav entries does this user actually see".
//
// No React, no storage, no product knowledge — the nav tree, the config and the
// user's hidden list all come in as arguments, so every function here is safe to
// call during render and trivially testable.
//
// The invariant the whole module maintains: **a visible entry's requirements are
// visible too**. It is enforced from both sides — you cannot hide something a
// visible entry needs, and you cannot show something whose requirements are
// still hidden. Nothing is ever hidden or shown behind the user's back.

import { EMPTY_NAV_CONFIG } from "./nav-config.js";

const EMPTY_LIST = [];

function toSet(titles) {
  return new Set(Array.isArray(titles) ? titles : EMPTY_LIST);
}

// title -> parent section title, for every sub-item in the tree.
function parentIndex(nav) {
  const parents = new Map();
  (nav || EMPTY_LIST).forEach((section) => {
    (section.subItems || EMPTY_LIST).forEach((sub) => {
      parents.set(sub.title, section.title);
    });
  });
  return parents;
}

// Every title in the tree, top-level and sub-item alike. Rules address both the
// same way, so a product can depend on a whole section or a single screen.
export function navTitles(nav) {
  const titles = [];
  (nav || EMPTY_LIST).forEach((section) => {
    titles.push(section.title);
    (section.subItems || EMPTY_LIST).forEach((sub) => titles.push(sub.title));
  });
  return titles;
}

// Drop anything the user can't actually hide — titles no longer in the nav
// (a screen was renamed or removed) and locked entries. Persist the result so a
// stale preference can never keep a locked entry out of the sidebar.
export function sanitizeHidden(hidden, nav, config = EMPTY_NAV_CONFIG) {
  const known = new Set(navTitles(nav));
  const locked = toSet(config.locked);
  return Array.from(toSet(hidden)).filter(
    (title) => known.has(title) && !locked.has(title),
  );
}

// The hidden set actually in force: what the user hid, minus locked entries.
function effectiveHidden(hidden, config) {
  const locked = toSet(config.locked);
  const set = toSet(hidden);
  locked.forEach((title) => set.delete(title));
  return set;
}

// Reachability, not just the flag: a sub-item under a hidden section is not
// visible however its own switch is set.
function visibilityLookup(nav, hidden, config) {
  const set = effectiveHidden(hidden, config);
  const parents = parentIndex(nav);
  return (title) => {
    if (set.has(title)) return false;
    const parent = parents.get(title);
    return !(parent && set.has(parent));
  };
}

// The nav the sidebar renders. A section whose sub-items are all hidden is
// dropped too — an expandable section that expands to nothing is worse than no
// section at all.
export function applyNavVisibility(nav, hidden, config = EMPTY_NAV_CONFIG) {
  const set = effectiveHidden(hidden, config);
  if (set.size === 0) return nav || EMPTY_LIST;

  return (nav || EMPTY_LIST).reduce((visible, section) => {
    if (set.has(section.title)) return visible;

    if (!section.subItems) {
      visible.push(section);
      return visible;
    }

    const subItems = section.subItems.filter((sub) => !set.has(sub.title));
    if (subItems.length === 0) return visible;

    visible.push(
      subItems.length === section.subItems.length ? section : { ...section, subItems },
    );
    return visible;
  }, []);
}

// Can this entry be hidden right now? Blocked while a visible entry requires it.
function hideCheck(title, { config, isVisible }) {
  if (toSet(config.locked).has(title)) {
    return {
      allowed: false,
      reason: `${title} is always available and can't be hidden.`,
      blockers: EMPTY_LIST,
    };
  }

  const dependents = config.dependencies
    .filter((rule) => rule.requires.includes(title) && isVisible(rule.screen))
    .map((rule) => rule.screen);

  if (dependents.length === 0) {
    return { allowed: true, reason: "", blockers: EMPTY_LIST };
  }

  const named = config.dependencies.find(
    (rule) => rule.requires.includes(title) && isVisible(rule.screen) && rule.reason,
  );
  return {
    allowed: false,
    reason:
      named?.reason ||
      `${dependents.join(", ")} ${dependents.length === 1 ? "needs" : "need"} ${title}. Hide ${dependents.length === 1 ? "it" : "them"} first.`,
    blockers: dependents,
  };
}

// Can this entry be shown right now? Blocked while something it needs — or the
// section it lives in — is still hidden.
function showCheck(title, { config, isVisible, parents }) {
  const missing = config.dependencies
    .filter((rule) => rule.screen === title)
    .flatMap((rule) => rule.requires)
    .filter((required) => !isVisible(required));

  const parent = parents.get(title);
  if (parent && !isVisible(parent) && !missing.includes(parent)) {
    missing.push(parent);
  }

  const unique = Array.from(new Set(missing));
  if (unique.length === 0) return { allowed: true, reason: "", blockers: EMPTY_LIST };

  const named = config.dependencies.find(
    (rule) => rule.screen === title && rule.reason && rule.requires.some((r) => !isVisible(r)),
  );
  return {
    allowed: false,
    reason:
      named?.reason ||
      `${title} needs ${unique.join(", ")}. Show ${unique.length === 1 ? "it" : "them"} first.`,
    blockers: unique,
  };
}

// Whether flipping one entry is allowed, and why not when it isn't. `nextHidden`
// is the state the user is asking for.
export function canToggleNavItem(title, { nav, hidden, config = EMPTY_NAV_CONFIG, nextHidden }) {
  const isVisible = visibilityLookup(nav, hidden, config);
  return nextHidden
    ? hideCheck(title, { config, isVisible })
    : showCheck(title, { config, isVisible, parents: parentIndex(nav) });
}

// Everything the settings screen needs, in one pass: the nav tree annotated with
// each entry's hidden flag, whether its switch is usable, why not, and the
// dependency edges worth showing the user.
export function navVisibilityModel({ nav, hidden, config = EMPTY_NAV_CONFIG }) {
  const set = effectiveHidden(hidden, config);
  const locked = toSet(config.locked);
  const isVisible = visibilityLookup(nav, hidden, config);
  const parents = parentIndex(nav);

  const describe = (item, parentHidden) => {
    const isHidden = set.has(item.title);
    const toggle = isHidden
      ? showCheck(item.title, { config, isVisible, parents })
      : hideCheck(item.title, { config, isVisible });

    return {
      title: item.title,
      icon: item.icon || null,
      hidden: isHidden,
      // Rendered but unreachable, because the section above it is hidden.
      shadowed: Boolean(parentHidden) && !isHidden,
      locked: locked.has(item.title),
      canToggle: toggle.allowed,
      blockedReason: toggle.reason,
      blockers: toggle.blockers,
      requires: config.dependencies
        .filter((rule) => rule.screen === item.title)
        .flatMap((rule) => rule.requires),
      requiredBy: config.dependencies
        .filter((rule) => rule.requires.includes(item.title))
        .map((rule) => rule.screen),
    };
  };

  const sections = (nav || EMPTY_LIST).map((section) => ({
    ...describe(section, false),
    subItems: (section.subItems || EMPTY_LIST).map((sub) =>
      describe(sub, set.has(section.title)),
    ),
  }));

  const total = sections.reduce((sum, s) => sum + 1 + s.subItems.length, 0);

  return { sections, total, hiddenCount: set.size, lockedCount: locked.size };
}

// Titles hidden for a project that has never touched the settings screen.
export function defaultHiddenNav(config = EMPTY_NAV_CONFIG) {
  return Array.from(config.hiddenByDefault);
}
