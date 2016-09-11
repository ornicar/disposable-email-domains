var HttpClient = require('request');
var storage = require('./storage');
var util = require('./util');

var ivoloUrl = 'https://raw.githubusercontent.com/ivolo/disposable-email-domains/master/index.json';

HttpClient.get({
  url: ivoloUrl,
  json: true
}, function(err, res, ivolo) {
  storage.withDomains(function(domains) {
    findNew(ivolo, domains);
  });
});

function add(domains) {
  if (!domains.length) return;
  storage.addDomain(domains[0], function() {
    add(domains.slice(1));
  });
}

function findNew(orig, domains) {
  var found = [];
  orig.forEach(function(domain) {
    if (!util.domainExistsIn(domain, domains)) found.push(domain);
  });
  console.log('Found ' + found.join(', '));
  add(found);
}
