var fs = require('fs');

var file = '../index.json';

module.exports = {
  withDomains: function(f) {
    return fs.readFile(file, 'utf8', function(err, text) {
      f(JSON.parse(text));
    });
  },
  writeDomains: function(domains, f) {
    domains.sort();
    fs.writeFile(file, JSON.stringify(domains, null, 2), f);
  }
};
