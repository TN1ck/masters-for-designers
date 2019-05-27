export function formatDate(d) {
  const date = new Date(d);
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}.${year}`;
}
