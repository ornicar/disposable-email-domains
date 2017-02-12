var fsp = require('fs-promise');
var safeDomains = require('./safeDomains');
var util = require('./util');

var file = '../list';

function getDomains() {
  return fsp.readFile(file, {
    encoding: 'utf8'
  }).then(function(text) {
    return text.split('\n').filter(function(l) {
      return !!l;
    });
  });
}

function writeDomains(domains) {
  domains.sort();
  return fsp.writeFile(file, domains.join('\n') + '\n');
}

function addDomain(domain) {
  if (safeDomains.contains(domain)) {
    console.log('Tried to block ' + domain);
    return Promise.resolve();
  }
  return getDomains().then(function(domains) {
    if (util.domainExistsIn(domain, domains)) {
      console.log('Already blocked: ' + domain);
      return Promise.resolve();
    }
    domains.push(domain);
    return writeDomains(domains).then(function() {
      console.log('Added ' + domain);
    });
  });
}

module.exports = {
  getDomains: getDomains,
  addDomain: addDomain,
  addDomains: function(domains) {
    domains.reduce(function(p, domain) {
      return p.then(function() {
        return addDomain(domain);
      });
    }, Promise.resolve());
  }
};
