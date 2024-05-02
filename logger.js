const path = require('path');

class Logger {
    constructor(options = { logLevel: 'debug' }) {
        this.rootDir = this.getRootDir();
        this.logLevel = options.logLevel || 'info';
        this.logDestinations = options.logDestinations || ['console'];
        this.colors = {
            info: '\x1b[36m', // Cyan
            warning: '\x1b[33m', // Yellow
            warn: '\x1b[33m', // Yellow
            debug: '\x1b[37m', // Yellow
            error: '\x1b[31m', // Red
            exception: '\x1b[31m', // Red
            success: '\x1b[32m', // Green
            critical: '\x1b[35m', // Magenta
            dir: '\x1b[34m',
            reset: '\x1b[0m' // Reset color
        };
        this.bold = '\x1b033[1m';
        this.normal = '\x1b033[0m';
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
        const levels = ['debug', 'info', 'warning', 'warn', 'error', 'exception', 'success', 'critical', 'dir'];
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
        const color = this.colors[level] || this.colors.info; // Default to cyan if level not found

        const directory = fileName.split('/').slice(0, -1).join('/');
        const file = fileName.split('/').pop();
        const boldLineNumber = `\x1b[1m${lineNumber}\x1b[0m`;
        const boldLevel = `\x1b[1m${level.toUpperCase()}\x1b[0m`;
        const underlinedFile = `\x1b[4m${file}\x1b[1m`;
        return `\x1b[1m${timestamp} ${color}[${level.toUpperCase()}]${this.colors.reset} ${color}${underlinedFile}:${color}${lineNumber}${this.colors.reset}\x1b[0m - ${message}`;
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

    exception(message) {
        this.log(message, 'exception');
    }

    success(message) {
        this.log(message, 'success');
    }

    critical(message) {
        this.log(message, 'critical');
    }

    dir(message) {
        this.log(message, 'dir');
    }
}

module.exports = new Logger();
