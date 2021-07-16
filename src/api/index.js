import axios from "axios";

import { DEFAULT_LIMIT, DEFAULT_OFFSET } from "../constants";
import { logApi } from '../helpers/Logger';

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_API_VERSION}`;
const responseTransformer = promise => promise
  .then(({ data }) => data)
  .catch(logApi)

export const getUserList = (
  {
    limit = DEFAULT_LIMIT,
    offset = DEFAULT_OFFSET
  } = {}
) => responseTransformer(
  axios.get(`${BASE_URL}/users`, { params: { limit, offset } })
);

