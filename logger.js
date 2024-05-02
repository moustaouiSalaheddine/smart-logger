const path = require('path');

class Logger {
    constructor(options = {}) {
        this.rootDir = this.getRootDir();
        this.logLevel = options.logLevel || 'info';
        this.logDestinations = options.logDestinations || ['console'];
    }

    log(message, level = 'info') {
        if (this._shouldLog(level)) {
            const callerInfo = this._getCallerInfo();
            const formattedMessage = this._formatMessage(message, level, callerInfo);
            this._sendToDestinations(formattedMessage);
        }
    }
    getRootDir() {
        return path.dirname(require.main.filename);
    }

    _shouldLog(level) {
        const levels = ['debug', 'info', 'warning', 'warn', 'error', 'critical', 'dir'];
        return levels.indexOf(level) >= levels.indexOf(this.logLevel);
    }

    _getCallerInfo() {
        const error = new Error();
        Error.captureStackTrace(error);
        const stack = error.stack.split('\n');
        const callerLine = stack[4].trim();
        const [, fileName, lineNumber] = callerLine.match(/\((.*):(\d+):\d+\)/);
        return { fileName, lineNumber };
    }

    _formatMessage(message, level, callerInfo) {
        const timestamp = new Date().toISOString();
        const { fileName, lineNumber } = callerInfo;
        return `${timestamp} [${level.toUpperCase()}] file:  ${fileName}:${lineNumber} - ${message}`;
    }
    _formatMessageJson(message, level, callerInfo) {
        const timestamp = new Date().toISOString();
        const { fileName, lineNumber } = callerInfo;

        return JSON.stringify({
            timestamp,
            level: level.toUpperCase(),
            file: fileName,
            lineNumber,
            message
        });
    }
    _sendToDestinations(message) {
        this.logDestinations.forEach(destination => {
            switch (destination) {
                case 'console':
                    console.log(message);
                    break;
                default:
                    console.log(`Unknown destination: ${destination}`);
            }
        });
    }

    debug(message) {
        this.log(message, 'debug');
    }

    info(message) {
        this.log(message, 'info');
    }

    warning(message) {
        this.log(message, 'warning');
    }

    warn(message) {
        this.log(message, 'warn');
    }

    error(message) {
        this.log(message, 'error');
    }

    critical(message) {
        this.log(message, 'critical');
    }

    dir(message) {
        this.log(message, 'dir');
    }
}

module.exports = Logger;
