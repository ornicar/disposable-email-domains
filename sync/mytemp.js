var HttpClient = require('request-promise');
var storage = require('./storage');
var util = require('./util');

function fetchDomain() {
  return HttpClient.get({
    url: 'https://api.mytemp.email/1/inbox/create?sid=8276038&task=4&tt=6',
    json: true
  }).then(function(data) {
    if (data.inbox) return util.emailToDomain(data.inbox);
    console.log(err, data);
    console.log('Waiting a while.');
    setTimeout(run, 100 * 1000);
  });
}

function run() {
  fetchDomain().then(function(domain) {
    storage.addDomain(domain).then(function() {
      setTimeout(run, 20 * 1000);
    });
  });
}
run();
