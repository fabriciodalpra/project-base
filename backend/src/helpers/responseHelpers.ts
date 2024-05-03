export const jsonFormatPagination = <Data>(
  data: Data,
  page: number,
  totalItems: number,
  itemsPerPage: number,
) => {
  return {
    data,
    current_page: page,
    total_items: totalItems,
    total_pages: Math.ceil(totalItems / itemsPerPage),
    per_page: itemsPerPage,
    from: page === 1 ? 1 : (page - 1) * itemsPerPage + 1,
    to: page * itemsPerPage > totalItems ? totalItems : page * itemsPerPage,
  };
};
