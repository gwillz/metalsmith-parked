
import match from 'multimatch';
import type { Plugin } from 'metalsmith';

interface Options {
    enable: boolean;  // to park or not to park, that is the question
    index: string;    // file to be replaced by parked.html
    parked: string;   // file to replace index.html when parked
    remove: string[]; // pattern list of files to remove with parked.html
}

export = function main(opts: Partial<Options>): Plugin {
    const options: Options = {
        enable: false,
        index: 'index.html',
        parked: 'parked.html',
        remove: [],
        ...opts,
    };
    
    return function(files, metalsmith, done) {
        // remove options.parked if disabled
        if (!options.enable) {
            delete files[options.parked];
            done(null, files, metalsmith);
            return;
        }
        
        // replacing options.index with options.parked
        files[options.index] = files[options.parked];
        delete files[options.parked];
        
        // removing files not related to park
        for (let pattern of options.remove) {
            for (let file of match(Object.keys(files), pattern)) {
                delete files[file];
            }
        }
        done(null, files, metalsmith);
    }
}
