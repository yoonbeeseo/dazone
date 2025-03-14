export default function pricfy(
  price: number | string,
  withDecimal?: boolean
): string {
  const copy = price.toString();
  if (!copy) {
    return "아무것도 입력되지 않았습니다.";
  }
  const regex = /^[0-9]+$/;
  const split = copy.split(".");

  if (!regex.test(split[0])) {
    return "숫자가 아닙니다.";
  }

  const first = Number(split[0]).toLocaleString();
  if (!withDecimal) {
    return first;
  }
  return first + "." + split[1];
}
