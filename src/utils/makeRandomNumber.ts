const makeRandomNumber = (length: number): number => {
  const count = Array.from({ length }, () => 9);
  let max = "";
  let min = "";
  count.map((n, i) => {
    max = max + n.toString();
    if (i === 0) {
      min = "1";
    } else {
      min = min + "0";
    }
  });
  const maxNumber = Number(max);
  const minNumber = Number(min);

  const number =
    Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

  return number;
};

export default makeRandomNumber;
