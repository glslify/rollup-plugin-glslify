/**
 * @author Patrick Schroen / https://github.com/pschroen
 */

'use strict';

const { createFilter } = require('rollup-pluginutils');
const { compile } = require('glslify');

module.exports = function glslify(userOptions = {}) {
    const options = Object.assign({
        include: [
            '**/*.vs',
            '**/*.fs',
            '**/*.glsl',
            '**/*.vert',
            '**/*.frag'
        ]
    }, userOptions);

    const filter = createFilter(options.include, options.exclude);

    return {
        transform(code, id) {
            if (!filter(id)) return;

            return {
                code: `export default ${JSON.stringify(compile(code, options))}; // eslint-disable-line`,
                map: { mappings: '' }
            };
        }
    };
};
