// tslint:disable-next-line
// mostly adapted from https://github.com/nozzle/react-static/blob/57ecc92a63182aab91112be5c3e787c338308b09/packages/react-static/src/browser/utils/scrollTo.js

const ease = t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

const defaultOptions = {
  duration: 800,
  offset: 0,
  context: typeof document !== "undefined" ? window : null,
  easing: ease,
};

const getTop = (element, offset, contextScrollHeight, contextVisibleHeight) => {
  return Math.min(
    element.getBoundingClientRect().top + window.pageYOffset + offset,
    contextScrollHeight - contextVisibleHeight,
  );
};

const getPosition = (start, end, elapsed, duration, easeFn) => {
  if (elapsed > duration) {
    return end;
  }
  return start + (end - start) * easeFn(elapsed / duration);
};

export default function scrollTo(target, options) {
  const {duration, offset, context, easing} = {...defaultOptions, ...options};

  // when context is null, we don't scroll
  if (context === null) {
    return;
  }
  const start = window.pageYOffset;

  // context is an HTMLElement
  let innerHeight;
  let scrollHeight;
  if (context !== window) {
    innerHeight = context.offsetHeight;
    scrollHeight = context.scrollHeight;
  } else {
    // context is probably a window
    innerHeight = window.innerHeight;
    scrollHeight = document.body.scrollHeight;
  }
  const clock = Date.now() - 1;

  return new Promise(resolve => {
    const step = () => {
      const elapsed = Date.now() - clock;
      const end = typeof target === "number" ? target : getTop(target, offset, scrollHeight, innerHeight);
      if (context !== window) {
        context.scrollTop = getPosition(start, end, elapsed, duration, easing);
      } else {
        window.scroll(0, getPosition(start, end, elapsed, duration, easing));
      }

      if (typeof duration === "undefined" || elapsed > duration) {
        resolve();
        return;
      }

      // Sanity check to prevent taking over the scroll once we prematurely got to the element
      if (start === end) {
        resolve();
        return;
      }

      requestAnimationFrame(step);
    };
    step();
  });
}
