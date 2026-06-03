export function normalizePair(a, b) {
  return a < b ? [a, b] : [b, a];
}
