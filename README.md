# rollup-plugin-glslify
[![Build Status](https://travis-ci.org/pschroen/rollup-plugin-glslify.svg)]()
[![Latest NPM release](https://img.shields.io/npm/v/rollup-plugin-glslify.svg)]()
[![License](https://img.shields.io/npm/l/rollup-plugin-glslify.svg)]()
[![Dependencies](https://img.shields.io/david/pschroen/rollup-plugin-glslify.svg)]()
[![Dev Dependencies](https://img.shields.io/david/dev/pschroen/rollup-plugin-glslify.svg)]()

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

[glslify API options](https://github.com/glslify/glslify#module-api)


## Changelog

* [Releases](https://github.com/pschroen/rollup-plugin-glslify/releases)


## License

Released under the [MIT license](LICENSE).
