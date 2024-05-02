# @moustaouisalah/smart-logger

[![npm version](https://img.shields.io/npm/v/smart-logger.svg?style=flat-square)](https://github.com/moustaouiSalaheddine/smart-logger)
[![License](https://img.shields.io/npm/l/smart-logger.svg?style=flat-square)](https://github.com/moustaouiSalaheddine/smart-logger/blob/main/LICENSE)

**@moustaouisalah/smart-logger** is a smart logging package for JavaScript applications.

### Example 

<img width="986" alt="Screenshot 2024-05-02 at 15 17 51" src="https://github.com/moustaouiSalaheddine/smart-logger/assets/43854957/b2c0ebc5-ea8f-465e-9619-a2134bf4e5fc">

## Installation

You can install the package via npm:

```bash
npm install @moustaouisalah/smart-logger
```

## USAGE

### Using import

```
import logger from '@moustaouisalah/smart-logger';

logger.log('This is a log message');
logger.info('This is an informational message');
logger.warning('This is a warning message');
logger.error('This is an error message');
logger.critical('This is a critical message');
```
### Using require

```
const logger = require('@moustaouisalah/smart-logger');

logger.log('This is a log message');
logger.info('This is an informational message');
logger.warning('This is a warning message');
logger.error('This is an error message');
logger.critical('This is a critical message');
```

## Log Levels

The logger supports the following log levels:

- `log`: General log message
- `info`: Informational message
- `warning` or `warn`: Warning message
- `error`: Error message
- `critical`: Critical error message

In addition, the logger also supports the following levels with specific styling:

- `debug`: Debug message (styled with '\x1b[37m' - yellow)
- `exception`: Exception message (styled with '\x1b[31m' - red)
- `success`: Success message (styled with '\x1b[32m' - green)
- `dir`: Directory message (styled with '\x1b[34m' - blue)

## License

This package is open-source and licensed under the [MIT License](https://github.com/moustaouiSalaheddine/smart-logger/blob/main/LICENSE).

## Author

- `name`: Salaheddine Moustaoui
- `email`: moustaoui.salaheddine@gmail.com
- `github`: [moustaouiSalaheddine](https://github.com/moustaouiSalaheddine)
- `linkedin`: [SALAHEDDINE MOUSTAOUI](https://www.linkedin.com/in/salaheddine-moustaoui-570709159/)
- `location`: Morocco