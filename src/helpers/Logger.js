const LogEvents = {
  WEB_RTC: {
    label: 'WEB_RTC',
    style: 'color: red;'
  },
  SOCKET: {
    label: 'SOCKET',
    style: 'color: green;',
  },
  API: {
    label: 'API',
    style: 'color: blue; background: white;',
  },
  DEBUG: {
    label: 'DEBUG',
  },
}

export const logger = ({ label, style }) => payload => console.log(`%c
  ${label} at ${new Date().toISOString()}:
  ${JSON.stringify(payload)}
`, style);

export const logRTC = logger(LogEvents.WEB_RTC)
export const logSocket = logger(LogEvents.SOCKET)
export const logApi = logger(LogEvents.API)
export const logDebug = logger(LogEvents.DEBUG)
