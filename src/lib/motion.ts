// One site-wide switch for moving pictures. Pausing any picture pauses them all, and the choice is
// remembered across pages. People who ask their device to reduce motion start paused.
// Pictures also pause while they are off screen (see Animated.astro and Lab.svelte).

const KEY = 'whys-motion';
type Listener = (on: boolean) => void;
const listeners = new Set<Listener>();

function initial(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const saved = localStorage.getItem(KEY);
    if (saved) return saved === 'on';
  } catch {}
  return !matchMedia('(prefers-reduced-motion: reduce)').matches;
}

let on = initial();

export const motionOn = () => on;

export function setMotion(value: boolean) {
  on = value;
  try {
    localStorage.setItem(KEY, value ? 'on' : 'off');
  } catch {}
  listeners.forEach((f) => f(on));
}

/** Calls `f` now and on every change; returns a function that stops listening. */
export function onMotion(f: Listener) {
  listeners.add(f);
  f(on);
  return () => void listeners.delete(f);
}

/** Calls `f(true)` while `el` is (mostly) on screen and `f(false)` when it scrolls away. */
export function onVisible(el: Element, f: (visible: boolean) => void) {
  const io = new IntersectionObserver(([e]) => f(e.isIntersecting), { threshold: 0.15 });
  io.observe(el);
  return () => io.disconnect();
}
