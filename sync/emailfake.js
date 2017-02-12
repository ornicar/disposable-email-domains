var HttpClient = require('request');
var cheerio = require('cheerio')
var storage = require('./storage');
var util = require('./util');

// <p class="crazy-mail" id="email_addr">2bcut@msgos.com</p>
function fetchDomains(success, error) {
  HttpClient.get({
    url: 'http://emailfake.com'
  }, function(err, res, data) {
    try {
      var $ = cheerio.load(res.body);
      var options = $('#domainName option');
      var domains = options.map(function(i, option) {
        // console.log(option.attribs['value']);
        return option.attribs['value'];
      }).toArray();
      success(domains.map(util.removeSubdomain));
    } catch (e) {
      error(e, res.body);
    }
  });
}

function run() {
  fetchDomains(function(domains) {
    storage.addDomains(domains);
    setTimeout(run, 20 * 1000);
  }, function(err, data) {
    // console.log(err, data);
    console.log('Waiting a while.');
    setTimeout(run, 100 * 1000);
  });
}
run();
