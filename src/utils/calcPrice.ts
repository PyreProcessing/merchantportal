export default (arr: (number | string)[]): number => {
  let total: number = 0;

  arr.forEach((item) => {
    if (typeof item === 'string') {
      const num: number = parseFloat(item);
      if (isNaN(num)) {
        throw new Error(`Value '${item}' cannot be converted to a number.`);
      }
      total += num;
    } else {
      total += item;
    }
  });

  return parseFloat(total.toFixed(2));
};
