import { toast } from 'react-toastify';

import { toastConfig } from '../constants/toastConfig';
import { logApi } from './Logger';

/**
 * Transform API response
 * @param {AxiosResponse} response
 * @param {Object} config
 * @param {boolean} [config.withToast=false] Indicates if error should be displayed in toast
 * @returns {any}
 */
export const responseTransformer = (
  response,
  {
    withToast = false
  } = {}
) => response
  .then(({ data }) => data)
  .catch(error => {
    logApi(error);

    if (withToast) {
      toast.error(error.message, toastConfig);
    }
  });
