var HttpClient = require('request');
var fs = require('fs');

var ivoloUrl = 'https://raw.githubusercontent.com/ivolo/disposable-email-domains/master/index.json';
var ornicarUrl = 'https://raw.githubusercontent.com/ornicar/disposable-email-domains/master/index.json';

HttpClient.get({
  url: ivoloUrl,
  json: true
}, function(err, res, ivolo) {
  fs.readFile('../index.json', 'utf8', function(err, text) {
    findNew(ivolo, JSON.parse(text));
  });
});

function findNew(orig, dest) {
  var found = [];
  orig.forEach(function(o) {
    if (!dest.some(function(r) {
      var regex = new RegExp('(.+\\..|)' + r.replace('.', '\\.'));
      return regex.test(o);
    })) found.push(o);
  });
  console.log(found);
  console.log(found.length);
}
