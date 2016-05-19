# confirmer
Simple y/n prompt for the command line

features:
- only one keypress required (y/n)
- simple promise based api

## installation
```
npm install confirmer
```

## usage
```js
var confirmer = require('confirmer')
confirmer('Would you like to continue? (y/n)')
  .then(result => result ? next() : end())
```
