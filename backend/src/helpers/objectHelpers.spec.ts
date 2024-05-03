import { expect, it } from 'vitest';
import { hasDuplicates } from './objectHelpers';

it('should be able to verify exists items duplicate in array', () => {
  const array = hasDuplicates([1, 2, 3, 4, 5, 2]);
  expect(array).toEqual(true);
});

it('should be able to verify not exists items duplicate in array', () => {
  const array = hasDuplicates([1, 2, 3, 4, 5]);
  expect(array).toEqual(false);
});
