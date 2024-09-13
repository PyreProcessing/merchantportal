/**
 * Currency formatter, formats any string into USD currency
 * @param amount
 * @returns string
 *
 */
export default (amount: number | string): string => {
  // if the amount is a string, convert it to a number
  if (typeof amount === 'string') {
    amount = parseFloat(amount);
  }
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};
