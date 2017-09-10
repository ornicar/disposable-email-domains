var storage = require('./storage');

// process.stdin.pipe(require('split')()).on('data', storage.addDomain);

var domains = [
];

domains.reduce((p, domain) => {
  return p.then(() => storage.addDomain(domain));
}, Promise.resolve());
