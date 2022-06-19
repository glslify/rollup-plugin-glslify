/**
 * @author pschroen / https://ufo.ai/
 */

'use strict';

const { dirname } = require('path');
const { createFilter } = require('rollup-pluginutils');
const { compile } = require('glslify');

function compressShader(code) {
    // Based on https://github.com/vwochnik/rollup-plugin-glsl
    // Modified to remove multiline comments. See #16

    let needNewline = false;
    return code.replace(/\\(?:\r\n|\n\r|\n|\r)|\/\*.*?\*\/|\/\/(?:\\(?:\r\n|\n\r|\n|\r)|[^\n\r])*/gs, '').split(/\n+/).reduce((result, line) => {
        line = line.trim().replace(/\s{2,}|\t/, ' '); // lgtm[js/incomplete-sanitization]
        if (line.charAt(0) === '#') {
            if (needNewline) {
                result.push('\n');
            }
            result.push(line, '\n');
            needNewline = false;
        } else {
            result.push(line.replace(/\s*({|}|=|\*|,|\+|\/|>|<|&|\||\[|\]|\(|\)|-|!|;)\s*/g, '$1'));
            needNewline = true;
        }
        return result;
    }, []).join('').replace(/\n+/g, '\n');
}

module.exports = function glslify(userOptions = {}) {
    const options = Object.assign(
        {
            include: [
                '**/*.vs',
                '**/*.fs',
                '**/*.vert',
                '**/*.frag',
                '**/*.glsl'
            ]
        },
        userOptions
    );

    const filter = createFilter(options.include, options.exclude);

    return {
        name: 'glslify',

        transform(code, id) {
            if (!filter(id)) return;

            const fileOptions = Object.assign(
                {
                    basedir: dirname(id)
                },
                options
            );

            code = compile(code, fileOptions);

            if (typeof options.compress === 'function') {
                code = options.compress(code);
            } else if (options.compress !== false) {
                code = compressShader(code);
            }

            return {
                code: `export default ${JSON.stringify(code)}; // eslint-disable-line`,
                map: { mappings: '' }
            };
        }
    };
};
