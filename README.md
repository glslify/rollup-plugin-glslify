# rollup-plugin-glslify

[![NPM Package][npm]][npm-url]
[![NPM Package][lgtm]][lgtm-url]

Import GLSL strings with [glslify](https://github.com/glslify/glslify) (a node.js-style module system for GLSL).

```js
import frag from './shaders/frag.glsl';
console.log(frag);
```

## Installation

```sh
npm install --save-dev rollup-plugin-glslify
```

OR

```sh
yarn add -D rollup-plugin-glslify
```

## Usage

```js
// rollup.config.js OR vite.config.js
import glslify from 'rollup-plugin-glslify';

export default {
    // ...
    plugins: [
        glslify()
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
    exclude: 'node_modules/**',

    // Do not perform compression using logic from rollup-plugin-glsl (enabled by default)
    compress: false

    // `compress` option also accepts a function with its first argument
    // being the string containing the glsified shader code. 
    // The function is expected to return a string (or object) - the compressed shader
}
```

[glslify API options](https://github.com/glslify/glslify#var-src--glslcompilesrc-opts)

## Changelog

* [Releases](https://github.com/glslify/rollup-plugin-glslify/releases)

## License

Released under the [MIT license](LICENSE).

## See also

* [rollup-plugin-glsl](https://github.com/vwochnik/rollup-plugin-glsl)


[npm]: https://img.shields.io/npm/v/rollup-plugin-glslify.svg
[npm-url]: https://www.npmjs.com/package/rollup-plugin-glslify
[lgtm]: https://img.shields.io/lgtm/alerts/github/glslify/rollup-plugin-glslify.svg
[lgtm-url]: https://lgtm.com/projects/g/glslify/rollup-plugin-glslify
