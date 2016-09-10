var HttpClient = require('request');
var safeDomains = require('./safeDomains');
var storage = require('./storage');
var util = require('./util');

function fetchDomain(success, error) {
  HttpClient.get({
    url: 'https://api.mytemp.email/1/inbox/create?sid=8276038&task=4&tt=6',
    json: true
  }, function(err, res, data) {
    if (data.inbox) success(data.inbox.replace(/.+\@(.+)$/, '$1'));
    else error(err, data);
  });
}

function addDomain(domain) {
  if (safeDomains.contains(domain)) {
    console.log('Tried to block ' + domain);
    return;
  }
  storage.withDomains(function(domains) {
    if (util.domainExistsIn(domain, domains))
      console.log('Already blocked: ' + domain);
    else {
      domains.push(domain);
      storage.writeDomains(domains, function() {
        console.log('Added ' + domain);
      });
    }
  });
}

function run() {
  fetchDomain(function(domain) {
    addDomain(domain);
    setTimeout(run, 20 * 1000);
  }, function(err, data) {
    console.log(err, data);
    console.log('Waiting a while.');
    setTimeout(run, 100 * 1000);
  });
}
run();
