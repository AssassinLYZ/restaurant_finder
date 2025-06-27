export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 300
): {
  (...args: Parameters<T>): void;
  cancel: () => void;
} {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const debounced = function (this: any, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
      timer = null;
    }, delay);
  };

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return debounced;
}
