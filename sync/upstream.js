var HttpClient = require('request-promise');
var storage = require('./storage');
var util = require('./util');

var ivoloUrl = 'https://raw.githubusercontent.com/ivolo/disposable-email-domains/master/index.json';
// var wesbosUrl = 'https://raw.githubusercontent.com/wesbos/burner-email-providers/master/emails.txt';
var andreisUrl = 'https://raw.githubusercontent.com/andreis/disposable/master/domains.txt';

fetch({
  url: ivoloUrl,
  json: true
}).then(function() {
  fetch({
    url: andreisUrl,
    transform: function(txt) {
      return txt.split('\n');
    }
  });
});

function fetch(opts) {
  console.log(opts.url);
  return Promise.all([
    storage.getDomains(),
    HttpClient.get(opts)
  ]).then(function(rs) {
    var newDomains = findNew(rs[0], rs[1]);
    console.log('Found ' + newDomains.join(', '));
    return add(newDomains);
  });
}

function findNew(currents, candidates) {
  var found = [];
  candidates.forEach(function(domain) {
    if (!util.domainExistsIn(domain, currents)) found.push(domain);
  });
  return found;
}

function add(domains) {
  if (!domains.length) return Promise.resolve();
  return storage.addDomain(domains[0]).then(function() {
    return add(domains.slice(1));
  });
}
