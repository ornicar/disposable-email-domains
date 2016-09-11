var HttpClient = require('request');
var storage = require('./storage');
var util = require('./util');

function fetchDomain(success, error) {
  HttpClient.get({
    url: 'https://api.mytemp.email/1/inbox/create?sid=8276038&task=4&tt=6',
    json: true
  }, function(err, res, data) {
    if (data.inbox) success(util.emailToDomain(data.inbox));
    else error(err, data);
  });
}

function run() {
  fetchDomain(function(domain) {
    storage.addDomain(domain);
    setTimeout(run, 20 * 1000);
  }, function(err, data) {
    console.log(err, data);
    console.log('Waiting a while.');
    setTimeout(run, 100 * 1000);
  });
}
run();
