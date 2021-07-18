import axios from "axios";

import { DEFAULT_LIMIT, DEFAULT_OFFSET } from "../constants";
import { responseTransformer } from '../helpers/responseTransformer';

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_API_VERSION}`;

export const getUserList = (
  {
    limit = DEFAULT_LIMIT,
    offset = DEFAULT_OFFSET
  } = {}
) => responseTransformer(
  axios.get(`${BASE_URL}/users`, { params: { limit, offset } })
);

export const getTwilioConfig = () => responseTransformer(
  axios.get(`${BASE_URL}/twilio/config`),
  { withToast: true }
);

/**
 * @param {string} file Base64 encoded image
 * @returns {boolen} Indicates if image is safe
*/
export const checkImageViolation = file => responseTransformer(
    axios.post(process.env.REACT_APP_VIOLATION_API, { file })
  )
  .then(({ isSafe }) => {
    if(!isSafe) throw new Error();
  })

