const fs = require('fs')
const path = require('path')
const glob = require('glob')

const PARKED = 'parked.html'
const INDEX  = 'index.html'


module.exports = function parked(options) {
    options = Object.assign({
        path: 'public',
        enable: true,
        remove: [],
    }, options)
    
    if (!options.enable) {
        rmAll(path.resolve(__dirname, options.path, PARKED))
    }
    else {
        console.log(`replacing [${INDEX}] with [${PARKED}]`)
        fs.renameSync(
            path.resolve(__dirname, options.path, PARKED),
            path.resolve(__dirname, options.path, INDEX))
        
        console.log('removing park files')
        options.remove.forEach(pattern => {
            glob.sync(path.resolve(__dirname, options.path, pattern))
            .forEach(p => {
                console.log(`remove: [${p}]`)
                rmAll(p)
            })
        })
    }
}

function rmAll(target) {
    try {
        fs.unlinkSync(target)
    }
    catch (err) {
        if (err && err.code === 'EISDIR') {
            fs.readdirSync(target).forEach(file => {
                rmAll(path.resolve(__dirname, target, file))
            })
            fs.rmdirSync(target)
        }
    }
}
