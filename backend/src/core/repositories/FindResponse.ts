export interface FindResponse<IData> {
  data: IData[] | null;
  current_page: number;
  total_items: number;
  total_pages: number;
  per_page: number;
  from: number;
  to: number;
}
