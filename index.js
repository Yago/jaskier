const chalk = require('chalk');
const theme = require('./theme.js');

const isBrowser = process.title === 'browser';
const methods = [
  'assert',
  'error',
  'info',
  'log',
  'print',
  'time',
  'timeEnd',
  'warn',
];

class Logger {
  constructor(theme) {
    this.theme = theme;
    this.defaultStyle = 'color: #A6B2C0;';
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
            this.defaultStyle,
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
            this.defaultStyle,
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

  info() {
    this.print(arguments, this.theme.info);
  }

  warn() {
    this.print(arguments, this.theme.warn);
  }

  error() {
    this.print(arguments, this.theme.error);
  }

  assert() {
    if (!arguments[0]) {
      this.print(['Assertion failed: console.assert'], this.theme.error);
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

const log = new Logger(theme);
methods.forEach((method) => {
  console[method] = (...content) => {
    log[method](...content);
  };
});


// console.log('This is a log');
// console.info('This is an info');
// console.warn('This is a warning');
// console.error('This is an error');
// console.time('This is a timer');
// setTimeout(() => {
//   console.timeEnd('This is a timer');
// }, 100);
// console.print('This is a custom message', {
//   browser: 'font-weight: bold; color: #C678DD;',
//   server: 'magenta',
//   emoji: '👻',
//   method: 'log',
// });
