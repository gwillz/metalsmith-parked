
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
        
        assert.ok(files['index.html']);
        assert.notOk(files['other.html']);
        assert.notOk(files['parked.html']);
    })
    assert.end();
})

test("Parked disabled", assert => {
    create({
        enable: false,
        remove: ['other.html'],
    })
    .build((err, files) => {
        if (err) assert.fail(err);
        
        assert.ok(files['index.html']);
        assert.ok(files['other.html']);
        assert.notOk(files['parked.html']);
    })
    assert.end();
})


function create(options) {
    return new Metalsmith(path.resolve(__dirname, 'test/'))
    .clean(true)
    .source('src')
    .destination('dest')
    .use(parked(options))
}
