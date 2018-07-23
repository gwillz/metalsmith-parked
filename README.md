Metalsmith Parked
=================

A crude solution for processing parked pages in Metalsmith.
The plugin replaces the index file with a provided alternative `parked.html`.
It will also clean out any other pages that you don't want the parked site
to see.

It's not really a plugin, just poke it in the `build()` callback.

## Defaults

```yaml
enable: false         # true - replace index, false - remove parked
parked: 'parked.html' # replacement file for index
index: 'index.html'   # target index file
remove: []            # glob patterns to remove
```


## Example Usage

```js
// build.js
const isParked = process.argv.includes('parked')

Metalsmith(__dirname)
.use(etc...)
.use(parked({
    enable: isParked,
    remove: [
        '*.pdf',
        'blog/',
        'img/',
    ]
}))
.build(err => {
    if (err) throw err;
})
```

```sh
node build.js parked
```
