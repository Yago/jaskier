const chalk = require('chalk');

const isBrowser = process.title === 'browser';
const methods = [
  "warn"
]

class Logger {
  constructor() {
    // this.console = console;
    this.console = {};

    methods.forEach((method) => {
      this.console[method] = console[method];
    })
  }

  print(content, opts) {
    let input = content;
    if (typeof content === 'string') input = { content };

    [...input].forEach((item) => {
      if (typeof item === 'string') {
        if (isBrowser) {
          this.console[opts.method](`%c ${opts.emoji} ${item}`, opts.browser);
        } else {
          this.console[opts.method](chalk[opts.server](`${opts.emoji}  ${item}`));
        }
      } else {
        if (isBrowser) {
          this.console[opts.method](`%c ${opts.emoji}`, opts.browser, item);
        } else {
          this.console[opts.method](chalk[opts.server](`${opts.emoji} `), item);
        }
      }
      
    });
  }

  warn() {
    this.print(arguments, {
      browser: 'font-weight: bold; color: #F99157;',
      server: 'yellow',
      emoji: '⚠️',
      method: 'warn',
    });
  }
}

const log = new Logger();
methods.forEach((method) => {
  console[method] = (...content) => {
    log[method](...content);
  };
});