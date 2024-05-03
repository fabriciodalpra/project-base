/* eslint-disable @typescript-eslint/no-explicit-any */
export function hasDuplicates(array: any) {
  array.sort();
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] === array[i + 1]) {
      return true;
    }
  }
  return false;
}
