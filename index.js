const chalk = require('chalk');

class Logger {
  constructor() {
    this.isBrowser = process.title === 'browser';
  }

  

  print(content, opts) {
    let input = content;
    if (typeof content === 'string') input = { content };

    [...input].forEach((item) => {
      if (typeof item === 'string') {
        if (this.isBrowser) {
          console[opts.method](`%c ${opts.emoji} ${item}`, opts.browser);
        } else {
          console[opts.method](chalk[opts.server](`${opts.emoji}  ${item}`));
        }
      } else {
        if (this.isBrowser) {
          console[opts.method](`%c ${opts.emoji}`, opts.browser, item);
        } else {
          console[opts.method](chalk[opts.server](`${opts.emoji} `), item);
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

log.warn('hello', ['machin', 'chose'], {title: 'hello'})
log.warn('hello world')
