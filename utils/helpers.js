export function debounce(callback, delay = 1000) {
  let time;

  return (...args) => {
    clearTimeout(time);
    time = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export const throttle = (callback, delay = 1500) => {
  let shouldWait = false;

  return (...args) => {
    if (shouldWait) return;
    callback(...args);
    shouldWait = true;
    setTimeout(() => {
      shouldWait = false;
    }, delay);
  };
};

export const generateRandInt = (min, max) => {
  const random = Math.random() * (max - min + 1) + min;

  if (random > max) return Math.floor(random);

  if (random < min) return Math.ceil(random);

  return random;
};

export const generateRandFloat = (min, max) => {
  const random = Math.random() * (max - min + 1) + min;
  return random;
};
