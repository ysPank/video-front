import { DEFAULT_LIMIT } from "../constants";

export const updatePaginationState = ({ nextOffset, totalCount, limit = DEFAULT_LIMIT }, ) => ({
  totalCount,
  limit,
  offset: nextOffset,
})
