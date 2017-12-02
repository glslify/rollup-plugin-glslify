const rollup = require('rollup');
const test = require('tape');

const glslify = require('../');

process.chdir('test');

test('node string', assert => rollup.rollup({
    input: 'fixtures/basic.js',
    plugins: [ glslify() ]
}).then(bundle => bundle.generate({ format: 'es' })).then(generated => {
    assert.true(~generated.code.indexOf('taylorInvSqrt'));
    assert.end();
}).catch(err => {
    assert.error(err);
    assert.end();
}));
