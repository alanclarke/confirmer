# confirmer
Simple y/n prompt for the command line

features:
- only one keypress required (y/n)
- ignores invalid user input
- preserves behaviour of ^C and ^D
- simple promise based api
- queues multiple questions

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
