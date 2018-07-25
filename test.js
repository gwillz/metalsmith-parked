
const test = require('tape')
const path = require('path')
const fs = require('fs')
const Metalsmith = require('metalsmith')
const parked = require('./index')

test("Parked enabled", assert => {
    create({
        enable: true,
        remove: ['other.html'],
    })
    .build((err, files) => {
        if (err) assert.fail(err);
        
        assert.ok(files['index.html'], 'should build [index.js]');
        assert.notOk(files['other.html'], 'should _not_ build [other.js]');
        assert.notOk(files['parked.html'], 'should _never_ build [parked.js]');
        
        const actual = files['index.html'].contents.toString();
        const expected = fs.readFileSync('./test/src/index.html', 'utf-8');
        
        assert.equal(actual, expected, '[parked.html] is renamed as [index.html]');
        assert.end();
    })
})

test("Parked disabled", assert => {
    create({
        enable: false,
        remove: ['other.html'],
    })
    .build((err, files) => {
        if (err) assert.fail(err);
        
        assert.ok(files['index.html'], 'should build [index.js]');
        assert.ok(files['other.html'], 'should build [other.js]');
        assert.notOk(files['parked.html'], 'should _never_ build [parked.js]');
        
        
        const actual = files['index.html'].contents.toString();
        const expected = fs.readFileSync('./test/src/index.html', 'utf-8');
        
        assert.equal(actual, expected, 'output and input [index.html] are the same');
        assert.end();
    })
})


// shorthand for creating a metalsmith build script with our plugin
function create(options) {
    return new Metalsmith(path.resolve(__dirname, 'test/'))
    .clean(true)
    .source('src')
    .destination('dest')
    .use(parked(options))
}
