# rollup-plugin-glslify
[![NPM Package][npm]][npm-url]
[![Build Status][build-status]][build-status-url]
[![Dependencies][dependencies]][dependencies-url]
[![Dev Dependencies][dev-dependencies]][dev-dependencies-url]

Import GLSL strings with [glslify](https://github.com/glslify/glslify) (a node.js-style module system for GLSL).

```js
import frag from './shaders/frag.glsl';
console.log(frag);
```

## Installation

```bash
npm install --save-dev rollup-plugin-glslify
```

## Usage

```js
// rollup.config.js
import glslify from 'rollup-plugin-glslify';

export default {
    // ...
    plugins: [
        glslify({ basedir: 'src/shaders' })
    ]
};
```

## Options

```js
glslify(options)
```

```js
{
    // Default
    include: [
        '**/*.vs',
        '**/*.fs',
        '**/*.vert',
        '**/*.frag',
        '**/*.glsl'
    ],

    // Undefined by default
    exclude: 'node_modules/**'
}
```

[glslify API options](https://github.com/glslify/glslify#var-src--glslcompilesrc-opts)

## Changelog

* [Releases](https://github.com/glslify/rollup-plugin-glslify/releases)

## License

Released under the [MIT license](LICENSE).


[npm]: https://img.shields.io/npm/v/rollup-plugin-glslify.svg
[npm-url]: https://www.npmjs.com/package/rollup-plugin-glslify
[build-status]: https://travis-ci.org/glslify/rollup-plugin-glslify.svg
[build-status-url]: https://travis-ci.org/glslify/rollup-plugin-glslify
[dependencies]: https://img.shields.io/david/glslify/rollup-plugin-glslify.svg
[dependencies-url]: https://david-dm.org/glslify/rollup-plugin-glslify
[dev-dependencies]: https://img.shields.io/david/dev/glslify/rollup-plugin-glslify.svg
[dev-dependencies-url]: https://david-dm.org/glslify/rollup-plugin-glslify?type=dev
