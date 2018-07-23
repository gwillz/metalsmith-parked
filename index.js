const match = require('multimatch')

module.exports = function main(options) {
    options = Object.assign({
        enable: false,
        index: 'index.html',
        parked: 'parked.html',
        remove: [],
    }, options);
    
    return function(files, metalsmith, done) {
        if (!options.enable) {
            delete files[options.parked];
            done();
            return;
        }
        
        console.log(`replacing [${options.index}] with [${options.parked}]`);
        files[options.index] = files[options.parked];
        delete files[options.parked];
        
        console.log('removing park files');
        for (let pattern of options.remove) {
            match(Object.keys(files), pattern)
            .forEach(file => {
                delete files[file];
            })
        }
        done();
    }
}
