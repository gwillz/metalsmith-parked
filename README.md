Metalsmith Parked
=================

A cheap solution for parked pages in Metalsmith, without having to 
maintain a separate build script.

The plugin replaces the index file with a provided alternative `parked.html`.
It will also clean out any other pages that you don't want the parked site
to see.


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
