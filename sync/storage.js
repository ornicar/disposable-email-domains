var fs = require('fs');
var safeDomains = require('./safeDomains');
var util = require('./util');

var file = '../list';

function withDomains(f) {
  return fs.readFile(file, 'utf8', function(err, text) {
    var domains = text.split('\n').filter(function(l) {
      return !!l;
    })
    f(domains);
  });
}

function writeDomains(domains, f) {
  domains.sort();
  fs.writeFile(file, domains.join('\n') + '\n', f);
}

module.exports = {
  withDomains: withDomains,
  addDomain: function(domain, f) {
    if (safeDomains.contains(domain)) {
      console.log('Tried to block ' + domain);
      return f();
    }
    withDomains(function(domains) {
      if (util.domainExistsIn(domain, domains)) {
        console.log('Already blocked: ' + domain);
        return f();
      }
      domains.push(domain);
      writeDomains(domains, function() {
        console.log('Added ' + domain);
        f();
      });
    });
  }
};
