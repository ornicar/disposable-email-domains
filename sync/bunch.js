var storage = require('./storage');

var domains = [
  // either paste domains here
];

// or pipe them in
process.stdin.pipe(require('split')()).on('data', domains.push);

domains.reduce((p, domain) => {
  return p.then(() => storage.addDomain(domain));
}, Promise.resolve());
