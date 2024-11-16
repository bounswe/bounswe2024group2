import log from 'loglevel';

const logLevel = process.env.NODE_ENV === 'development' ? 'trace' : 'info';

log.setLevel(logLevel);

export default log;
