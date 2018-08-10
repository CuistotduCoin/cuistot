export const clearNumber = (num: string) => num.replace(/\D+/g, "");

export const formatCardNumber = (num: string) => {
  const NUMBER_LENGTH = 16;
  const PART_LENGTH = 4;

  if (num === undefined || num === null) return num;
  const clear = clearNumber(num);
  let newNum = "";
  for (let i = 0; i < NUMBER_LENGTH; i += PART_LENGTH) {
    newNum += clear.slice(i, i + PART_LENGTH) + " ";
  }
  return newNum.trim();
};

export const formatExpirationDate = (val: string) => {
  const MONTH_LENGTH = 2;
  const clear = clearNumber(val);
  if (clear.length > MONTH_LENGTH) {
    return `${clear.slice(0, MONTH_LENGTH)}/${clear.slice(
      MONTH_LENGTH,
      MONTH_LENGTH + MONTH_LENGTH
    )}`;
  }
  return clear;
};
