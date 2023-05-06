export function debounce(fn, delay = 100) {
  let timer: any = null;
  return function (...args) {
    if (timer != null) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(this, ...args);
    }, delay);
  };
}
