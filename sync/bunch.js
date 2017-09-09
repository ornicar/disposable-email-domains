var storage = require('./storage');

process.stdin.pipe(require('split')()).on('data', storage.addDomain);
