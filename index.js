const chalk = require('chalk');

const isBrowser = process.title === 'browser';
const methods = [
  "warn"
];

class Logger {
  constructor() {
    this.defaultStyle = 'color: #A6B2C0;';
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
            chalk[opts.server](`${opts.emoji}  ${item}`)
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
            chalk[opts.server](`${opts.emoji} `),
            item
          );
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
