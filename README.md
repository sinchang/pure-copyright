# pure-copyright

[![NPM version](https://img.shields.io/npm/v/pure-copyright.svg?style=flat)](https://npmjs.com/package/pure-copyright) 
[![NPM downloads](https://img.shields.io/npm/dm/pure-copyright.svg?style=flat)](https://npmjs.com/package/pure-copyright) 

> pure JavaScript version of [copyright](https://github.com/absentik/copyright)

## Install

```bash
npm i -S pure-copyright
```

## Usage

```js
import Copyright from 'pure-copyright'

or

<script src="https://unpkg.com/pure-copyright@latest"></script>

new Copyright(document.body)
```

## Options

You can pass an options object in plugin init method.
* `text` : The text that will be added when copying (Default: `"<br>Original: " + window.location.href`);
* `minlength` : The minimum length of the copied text when running the plugin (Default: `0`).
* `processing` : Function to process the copied text (Default: `undefined`).

```js
new Copyright(document.body, {
  text: "<br><br>Reference: " + window.location.href,
  minlength: 100,
  processing: function(text) {
    console.log(text)
  }
})
```

## Methods:

- destory：Stop the plugin

## Events: 
You can listen Copyright events. 
* `beforeCopy`
* `afterCopy`

```js
new Copyright(document.body, {
  processing: function (text) {
    console.log(text)
  }
}).on('beforeCopy', () => {
  console.log(+ new Date())
}).on('afterCopy', () => {
  console.log(+ new Date())
})
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Credits

- [copyright](https://github.com/absentik/copyright)

## Author

**pure-copyright** © [sinchang](https://github.com/sinchang), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by sinchang with help from contributors ([list](https://github.com/sinchang/copyright/contributors)).

> [sinchang.me](https://sinchang.me) · GitHub [@sinchang](https://github.com/sinchang) · Twitter [@sinchangwen](https://twitter.com/sinchangwen)
