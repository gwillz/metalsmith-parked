Metalsmith Parked
=================

A crude solution for processing parked pages in Metalsmith.
The plugin replaces the index file with a provided alternative `parked.html`.
It will also clean out any other pages that you don't want the parked site
to see.

It's not really a plugin, just poke it in the `build()` callback.

## Defaults

```yaml
path: public    # metalsmith destination directory
enable: true    # true - replace index.html, false - remove parked.html
remove: []      # glob patterns to remove
```


## Example Usage

```js
// build.js
const isParked = process.argv.includes('parked')

Metalsmith(__dirname)
.use(etc...)
.build(err => {
    if (err) throw err;
    
    parked({
        enable: isParked,
        remove: [
            '*.pdf',
            'blog/',
            'img/',
        ]
    })
})
```

```sh
node build.js parked
```
