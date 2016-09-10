var fs = require('fs');
var safeDomains = require('./safeDomains');
var util = require('./util');

var file = '../index.json';

function withDomains(f) {
  return fs.readFile(file, 'utf8', function(err, text) {
    f(JSON.parse(text));
  });
}

function writeDomains(domains, f) {
  domains.sort();
  fs.writeFile(file, JSON.stringify(domains, null, 2), f);
}

module.exports = {
  add: function(domain) {
    if (safeDomains.contains(domain)) {
      console.log('Tried to block ' + domain);
      return;
    }
    withDomains(function(domains) {
      if (util.domainExistsIn(domain, domains))
        console.log('Already blocked: ' + domain);
      else {
        domains.push(domain);
        writeDomains(domains, function() {
          console.log('Added ' + domain);
        });
      }
    });
  }
};
