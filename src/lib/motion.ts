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

/**
 * Calls `f(true)` once `el` is well in view (half of it, or half the screen for tall things), and
 * `f(false)` once it has left the screen completely. So a picture starts when the reader gets to it,
 * not while it is still peeking in at the bottom.
 */
export function onVisible(el: Element, f: (visible: boolean) => void) {
  let shown = false;
  const io = new IntersectionObserver(
    ([e]) => {
      const inView = e.intersectionRatio >= 0.5 || e.intersectionRect.height >= innerHeight * 0.5;
      if (!shown && inView) f((shown = true));
      else if (shown && !e.isIntersecting) f((shown = false));
    },
    { threshold: [0, 0.25, 0.5, 0.75, 1] },
  );
  io.observe(el);
  return () => io.disconnect();
}
