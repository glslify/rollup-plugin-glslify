import { rollup } from 'rollup';
import test from 'ava';

import glslify from '../index.js';

test('compressed', async t => {
    const bundle = await rollup({
        input: 'test/fixtures/basic.js',
        plugins: [glslify()]
    });

    const { output } = await bundle.generate({ format: 'es' });
    const code = output[0].code;

    t.is(!code.includes('// Description'), true);
    t.is(code.includes('taylorInvSqrt'), true);
});

test('compressed | custom function', async t => {
    const bundle = await rollup({
        input: 'test/fixtures/basic.js',
        plugins: [glslify({ compress: code => code + '\n\n// test custom function' })]
    });

    const { output } = await bundle.generate({ format: 'es' });
    const code = output[0].code;

    t.is(code.includes('// Description'), true);
    t.is(code.includes('taylorInvSqrt'), true);
    t.is(code.includes('// test custom function'), true);
});

test('uncompressed', async t => {
    const bundle = await rollup({
        input: 'test/fixtures/basic.js',
        plugins: [glslify({ compress: false })]
    });

    const { output } = await bundle.generate({ format: 'es' });
    const code = output[0].code;

    t.is(code.includes('// Description'), true);
    t.is(code.includes('taylorInvSqrt'), true);
});

test('local module', async t => {
    const bundle = await rollup({
        input: 'test/fixtures/local.js',
        plugins: [glslify({ compress: false })]
    });

    const { output } = await bundle.generate({ format: 'es' });
    const code = output[0].code;

    t.is(code.includes('myFunction'), true);
});
