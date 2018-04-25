/**
 * @author Patrick Schroen / https://github.com/pschroen
 */

'use strict';

const { dirname } = require('path');
const { createFilter } = require('rollup-pluginutils');
const { compile } = require('glslify');

module.exports = function glslify(userOptions = {}) {
    const options = Object.assign({
        include: [
            '**/*.vs',
            '**/*.fs',
            '**/*.vert',
            '**/*.frag',
            '**/*.glsl'
        ]
    }, userOptions);

    const filter = createFilter(options.include, options.exclude);

    return {
        transform(code, id) {
            if (!filter(id)) return;

            options.basedir = options.basedir || dirname(id);

            return {
                code: `export default ${JSON.stringify(compile(code, options))}; // eslint-disable-line`,
                map: { mappings: '' }
            };
        }
    };
};
