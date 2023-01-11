/**
 * @author pschroen / https://ufo.ai/
 */

'use strict';

const { dirname } = require('path');
const { createFilter } = require('rollup-pluginutils');

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

            const { source, deps } = iface().compile(code, fileOptions);
            code = source;

            for (const dep of deps.filter(dep => !dep.entry)) {
                this.addWatchFile(dep.file);
            }

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

// The following lines (except for where commented) are copied directly from
// https://github.com/glslify/glslify/blob/ba9c52c46e10068215290753e99ac516cc02d0d7/index.js

var glslifyBundle = require('glslify-bundle');
var glslifyDeps   = require('glslify-deps/sync');
var nodeResolve   = require('resolve');
var path          = require('path');
var stackTrace    = require('stack-trace');

function iface () {
    try { var basedir = path.dirname(stackTrace.get()[2].getFileName()); }
    catch (err) { basedir = process.cwd(); }
    var posts = [];
    return { compile }; // modified to only return the compile function

    function compile(src, opts) {
        if (!opts) opts = {};
        var depper = gdeps(opts);
        var deps = depper.inline(src, opts.basedir || basedir);
        return { source: bundle(deps), deps }; // modified to return deps as well as the bundle
    }
    function gdeps (opts) {
        if (!opts) opts = {};
        var depper = glslifyDeps({ cwd: opts.basedir || basedir });
        var transforms = opts.transform || [];
        transforms = Array.isArray(transforms) ? transforms : [transforms];
        transforms.forEach(function(transform) {
            transform = Array.isArray(transform) ? transform : [transform];
            var name = transform[0];
            var opts = transform[1] || {};
            if (opts.post) {
                posts.push({ name, opts });
            } else {
                depper.transform(name, opts);
            }
        });
        return depper;
    }
    function bundle (deps) {
        var source = glslifyBundle(deps);
        posts.forEach(function (tr) {
            if (typeof tr.name === 'function') {
                var transform = tr.name;
            } else {
                var target = nodeResolve.sync(tr.name, { basedir });
                var transform = require(target); // eslint-disable-line no-redeclare
            }
            var src = transform((deps && deps[0] && deps[0].file) || null, source, { post: true });
            if (src) source = src;
        });
        return source;
    }
}
