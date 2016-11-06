var storage = require('./storage');
var util = require('./util');

var domain = process.argv[2];

function run() {
  storage.getDomains().then(function(domains) {
    var out = domain + ' is ';
    if (util.domainExistsIn(domain, domains)) out += 'blocked.';
    else out += 'not blocked.';
    console.log(out);
  });
}
run();
