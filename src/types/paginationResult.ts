export type paginationResult<TData extends object> = {
  pagination: {
    offset: number;
    limit: number;
    total: number;
  };
  items: TData[];
};
