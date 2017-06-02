const isBrowser = process.title === 'browser';

let chalk;
if (!isBrowser) chalk = require('chalk');
const theme = require('./theme.js');

const methods = [
  'assert',
  'error',
  'info',
  'log',
  'print',
  'time',
  'timeEnd',
  'trace',
  'warn',
];

class Jaskier {
  constructor(theme) {
    this.theme = theme;
    this.nodeTimer = false;

    this.console = {};
    methods.forEach((method) => {
      this.console[method] = console[method];
    });
  }

  print(content, opts) {
    let input = content;
    if (typeof content === 'string') input = [content];

    const date = new Date;
    const currentTime = `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`;

    if (this.nodeTimer) {
      input = [];
      this.nodeTimer = false;
      this.console.log(...content);
    };

    [...input].forEach((item) => {
      if (typeof item === 'string') {
        if (isBrowser) {
          this.console[opts.method](
            `%c${currentTime} %c${opts.emoji} ${item}`,
            theme.default,
            opts.browser
          );
        } else {
          this.console[opts.method](
            chalk.grey(currentTime),
            chalk.bold[opts.server](`${opts.emoji}  ${item}`)
          );
        }
      } else {
        if (isBrowser) {
          this.console[opts.method](
            `%c${currentTime} %c${opts.emoji}`,
            theme.default,
            opts.browser,
            item
          );
        } else {
          this.console[opts.method](
            chalk.grey(currentTime),
            chalk.bold[opts.server](`${opts.emoji} `),
            item
          );
        }
      }
      
    });
  }

  log() {
    this.print(arguments, this.theme.log);
  }

  trace() {
    const date = new Date;
    const currentTime = `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`;

    if (isBrowser) {
      this.console.trace(`%c${currentTime} %c📍 ` + [...arguments], theme.default, theme.trace.browser);
    } else {
      this.console.trace(...arguments);
    }
  }

  info() {
    this.print(arguments, this.theme.info);
  }

  warn() {
    this.print(arguments, this.theme.warn);
  }

  error() {
    if (arguments[0].includes('Jaskier.trace')) {
      this.print(arguments, this.theme.trace);      
    } else {
      this.print(arguments, this.theme.error);
    }
  }

  assert() {
    if (!arguments[0]) {
      this.print(['Assertion failed: console.assert'], this.theme.assert);
    }
  }

  time() {
    this.console.time(...arguments);
  }

  timeEnd() {
    if (!isBrowser) this.nodeTimer = true;
    this.console.timeEnd(...arguments);
  }
}

const log = new Jaskier(theme);
methods.forEach((method) => {
  console[method] = (...content) => {
    log[method](...content);
  };
});
