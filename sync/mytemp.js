var HttpClient = require('request');
var fs = require('fs');

var file = '../index.json'

function fetchDomain(callback) {
  HttpClient.get({
    url: 'https://api.mytemp.email/1/inbox/create?sid=8276038&task=4&tt=6',
    json: true
  }, function(err, res, data) {
    if (data.inbox) callback(data.inbox.replace(/.+\@(.+)$/, '$1'));
    else console.log(err, data);
  });
}

function addDomain(domain) {
  fs.readFile(file, 'utf8', function(err, text) {
    var coll = JSON.parse(text);
    if (exists(domain, coll))
      console.log('Already blocked: ' + domain);
    else
      append(domain, coll);
  });
}

function exists(domain, coll) {
  return coll.some(function(r) {
    var regex = new RegExp('(.+\\..|)' + r.replace('.', '\\.'));
    return regex.test(domain);
  });
}

function append(domain, coll) {
  coll.push(domain);
  coll.sort();
  fs.writeFile(file, JSON.stringify(coll, null, 2), function() {
    console.log('Added ' + domain);
  });
}

setInterval(function() {
  fetchDomain(addDomain);
}, 10 * 1000);
