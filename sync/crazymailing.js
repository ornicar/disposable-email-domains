var HttpClient = require('request');
var cheerio = require('cheerio')
var storage = require('./storage');
var util = require('./util');

// <p class="crazy-mail" id="email_addr">2bcut@msgos.com</p>
function fetchDomain(success, error) {
  HttpClient.get({
    url: 'https://www.crazymailing.com/'
  }, function(err, res, data) {
    try {
    var $ = cheerio.load(res.body);
    var email = $('#email_addr').text();
    var domain = util.emailToDomain(email);
    success(domain);
    } catch(e) {
      error(e, res.body);
    }
  });
}

function run() {
  fetchDomain(function(domain) {
    storage.add(domain);
    setTimeout(run, 20 * 1000);
  }, function(err, data) {
    console.log(err, data);
    console.log('Waiting a while.');
    setTimeout(run, 100 * 1000);
  });
}
run();

