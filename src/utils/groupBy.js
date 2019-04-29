export function groupBy(arr, grouper) {
  const map = {};
  (arr || []).forEach(function(element) {
    const key = grouper(element);
    map[key] = map[key] || [];
    map[key].push(element);
  });
  return map;
}
