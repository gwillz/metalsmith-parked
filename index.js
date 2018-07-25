const match = require('multimatch')

module.exports = function main(options) {
    options = Object.assign({
        enable: false,          // to park or not to park, that is the question
        index: 'index.html',    // file to be replaced by parked.html
        parked: 'parked.html',  // file to replace index.html when parked
        remove: [],             // pattern list of files to remove with parked.html
    }, options);
    
    return function(files, metalsmith, done) {
        // remove options.parked if disabled
        if (!options.enable) {
            delete files[options.parked];
            done();
            return;
        }
        
        // replacing options.index with options.parked
        files[options.index] = files[options.parked];
        delete files[options.parked];
        
        // removing files not related to park
        for (let pattern of options.remove) {
            match(Object.keys(files), pattern)
            .forEach(file => {
                delete files[file];
            })
        }
        done();
    }
}
