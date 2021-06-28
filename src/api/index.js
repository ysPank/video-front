import axios from "axios";
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from "../constants";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_API_VERSION}`;

export const getUserList = (
  {
    limit = DEFAULT_LIMIT,
    offset = DEFAULT_OFFSET
  } = {}
) => axios
  .get(`${BASE_URL}/users`, { params: { limit, offset } })
  .then(({ data }) => data);

