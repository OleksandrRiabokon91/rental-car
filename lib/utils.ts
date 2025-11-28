// Утилита для форматирования числа с пробелами
export function formatNumberWithSpaces(num: number): string {
  return new Intl.NumberFormat("ru-RU").format(num);
}
