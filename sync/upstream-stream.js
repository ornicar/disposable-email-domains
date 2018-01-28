var http = require('http');
var hyperquest = require('hyperquest');
var storage = require('./storage');
var util = require('./util');
var byline = require('byline');

var ivoloUrl = 'https://raw.githubusercontent.com/ivolo/disposable-email-domains/master/index.json';
// var wesbosUrl = 'https://raw.githubusercontent.com/wesbos/burner-email-providers/master/emails.txt';
var andreisUrl = 'https://raw.githubusercontent.com/andreis/disposable-email-domains/master/domains.txt';

// fetch({
//   url: ivoloUrl,
//   json: true
// }).then(function() {
//   fetch({
//     url: andreisUrl,
//     transform: function(txt) {
//       return txt.split('\n');
//     }
//   });
// });

fetch({
  url: ivoloUrl,
  json: true
}).then(() => {
  fetch({
    url: andreisUrl,
    transform: txt => txt.split('\n')
  });
});

function fetch(opts) {
  console.log(opts.url);
  return storage.getDomains().then(currents => {
    return new Promise((resolve, reject) => {
      var found = [];
      byline(hyperquest(opts.url))
        .on('data', function(line) {
          var domain = line.toString('utf8');
          if (!util.domainExistsIn(domain, currents)) found.push(domain);
        })
          .on('end', () => {
            console.log('Found ' + found.length + ' new');
            add(found).then(resolve);
          });
    });
  });
}

function add(domains) {
  if (!domains.length) return Promise.resolve();
  return storage.addDomain(domains[0]).then(function() {
    return add(domains.slice(1));
  });
}
