const chalk = require('chalk');

const isBrowser = process.title === 'browser';
const methods = [
  'error',
  'info',
  'log',
  'time',
  'timeEnd',
  'warn',
];

class Logger {
  constructor() {
    this.defaultStyle = 'color: #A6B2C0;';
    this.nodeTimer = false;
    this.console = {};
    methods.forEach((method) => {
      this.console[method] = console[method];
    });
  }

  print(content, opts) {
    let input = content;
    if (typeof content === 'string') input = { content };

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
    this.print(arguments, {
      browser: 'font-weight: bold; color: #919BA7;',
      server: 'white',
      emoji: '🔬',
      method: 'log',
    });
  }

  info() {
    this.print(arguments, {
      browser: 'font-weight: bold; color: #61AFEF;',
      server: 'blue',
      emoji: 'ℹ️',
      method: 'info',
    });
  }

  warn() {
    this.print(arguments, {
      browser: 'font-weight: bold; color: #E5C07B;',
      server: 'yellow',
      emoji: '⚠️',
      method: 'warn',
    });
  }

  error() {
    this.print(arguments, {
      browser: 'font-weight: bold; color: #E06C75;',
      server: 'red',
      emoji: '🚨',
      method: 'error',
    });
  }

  time() {
    this.console.time(...arguments);
  }

  timeEnd() {
    if (!isBrowser) this.nodeTimer = true;
    this.console.timeEnd(...arguments);
  }
}

const log = new Logger();
methods.forEach((method) => {
  console[method] = (...content) => {
    log[method](...content);
  };
});


// console.log('This is a log');
// console.info('This is an info');
// console.warn('This is a warning');
// console.error('This is an error');
// console.time('Timou');
// setTimeout(() => {
//   console.timeEnd('Timou');
// }, 100);
