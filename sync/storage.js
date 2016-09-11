var fs = require('fs');
var safeDomains = require('./safeDomains');
var util = require('./util');

var file = '../list';

function withDomains(f) {
  return fs.readFile(file, 'utf8', function(err, text) {
    f(text.split('\n'));
  });
}

function writeDomains(domains, f) {
  domains.sort();
  fs.writeFile(file, domains.join('\n'), f);
}

module.exports = {
  withDomains: withDomains,
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
