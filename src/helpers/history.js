import { createBrowserHistory } from 'history';

/**
 * @type {history} History used internally by BrowserRouter
 */
export default createBrowserHistory({ basename: process.env.REACT_APP_BASE_PATH || ''});
