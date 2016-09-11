var HttpClient = require('request');
var storage = require('./storage');

var ivoloUrl = 'https://raw.githubusercontent.com/ivolo/disposable-email-domains/master/index.json';

HttpClient.get({
  url: ivoloUrl,
  json: true
}, function(err, res, ivolo) {
  storage.withDomains(function(domains) {
    findNew(ivolo, domains);
  });
});

function findNew(orig, dest) {
  var found = [];
  orig.forEach(function(o) {
    if (!dest.some(function(r) {
      var regex = new RegExp('(.+\\..|)' + r.replace('.', '\\.'));
      return regex.test(o);
    })) {
      console.log('Add ' + o);
      storage.add(o);
    }
  });
}
