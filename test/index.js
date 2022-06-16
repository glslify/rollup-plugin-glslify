const rollup = require('rollup');
const test = require('tape');

const glslify = require('../');

process.chdir('test');

test('compressed', assert => rollup.rollup({
    input: 'fixtures/basic.js',
    plugins: [glslify()]
}).then(bundle => bundle.generate({ format: 'es' })).then(generated => {
    const code = generated.output[0].code;
    assert.true(!code.includes('// Description'));
    assert.true(code.includes('taylorInvSqrt'));
    assert.end();
}).catch(err => {
    assert.error(err);
    assert.end();
}));

test('compressed | custom function', assert => rollup.rollup({
    input: 'fixtures/basic.js',
    plugins: [glslify({ compress: (code) => code + '\n\n// test custom function' })]
}).then(bundle => bundle.generate({ format: 'es' })).then(generated => {
    const code = generated.output[0].code;
    assert.true(code.includes('// Description'));
    assert.true(code.includes('taylorInvSqrt'));
    assert.true(code.includes('// test custom function'));
    assert.end();
}).catch(err => {
    assert.error(err);
    assert.end();
}));

test('uncompressed', assert => rollup.rollup({
    input: 'fixtures/basic.js',
    plugins: [glslify({ compress: false })]
}).then(bundle => bundle.generate({ format: 'es' })).then(generated => {
    const code = generated.output[0].code;
    assert.true(code.includes('// Description'));
    assert.true(code.includes('taylorInvSqrt'));
    assert.end();
}).catch(err => {
    assert.error(err);
    assert.end();
}));
