import { expect, it } from 'vitest';
import { jsonFormatPagination } from './responseHelpers';

it('should be able to generate object json to pagination 1', () => {
  const texts: string[] = [];

  for (let i = 1; i <= 30; i++) {
    texts.push(`text ${i}`);
  }

  const array = jsonFormatPagination<string[]>(texts, 1, texts.length, 20);

  expect(array).contains({
    data: texts,
    current_page: 1,
    total_items: 30,
    total_pages: 2,
    per_page: 20,
    from: 1,
    to: 20,
  });
});

it('should be able to generate object json to pagination 2', () => {
  const texts: string[] = [];

  for (let i = 1; i <= 30; i++) {
    texts.push(`text ${i}`);
  }

  const array = jsonFormatPagination<string[]>(texts, 2, texts.length, 20);

  expect(array).contains({
    data: texts,
    current_page: 2,
    total_items: 30,
    total_pages: 2,
    per_page: 20,
    from: 21,
    to: 30,
  });
});

it('should be able to generate object json to pagination 3', () => {
  const texts: string[] = [];

  for (let i = 1; i <= 90; i++) {
    texts.push(`text ${i}`);
  }

  const array = jsonFormatPagination<string[]>(texts, 3, texts.length, 20);

  expect(array).contains({
    data: texts,
    current_page: 3,
    total_items: 90,
    total_pages: 5,
    per_page: 20,
    from: 41,
    to: 60,
  });
});
