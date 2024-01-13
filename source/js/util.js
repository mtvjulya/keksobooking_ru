// Случайное число
const getRandom = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min >= max) {
    [min, max] = [max, min];
  }

  let number = Math.floor(Math.random() * (max - min + 1) + min);
  return number;
}

// Случайное число с плавающей точкой
const getRandomFixed = (min, max, decimal) => {
  if (min > max) {
    [min, max] = [max, min];
  }

  if (min < 0 || max < 0) {
    return -1;
  }

  let fixedNumber = Math.random() * (max - min) + min;

  return +fixedNumber.toFixed(decimal);
}

export {getRandom, getRandomFixed};
