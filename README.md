# Jaskier
### Colorful console troubadour !

Jaskier is a seamless way to add more life to your console. It's only **5kb**, **non-obstructive** and **super easy to add** in your current project. Open your current browser console to appreciate the result.

## Usage
First, just had Jaskier to your project

#### Browser:
```html
<script src="https://rawgit.com/Yago/jaskier/master/dist/jaskier.min.js"></script>
```
#### Node:
```bash
$ npm install --save jaskier
```
and
```javascript
// At the beginning of your scripts
require('jaskier');
```
Then, simply use your usual <code>console</code> syntax. Simple, right !

```javascript
console.log('This is a log');
console.info('This is an info');
console.warn('This is a warning');
console.error('This is an error');
console.assert('This is an assert' === 42);
console.trace('This is a trace');

console.time('This is a timer');
setTimeout(() => {
console.timeEnd('This is a timer');
}, 100);

console.print('This is a custom message', {
browser: 'font-weight: bold; color: #C678DD;',
server: 'magenta',
emoji: '👻',
method: 'log',
});
```