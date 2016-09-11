function lineToRegex(line) {
  return new RegExp('(.+\\.)?' + line.replace('.', '\\.'));
}

module.exports = {
  lineToRegex: lineToRegex,
  domainExistsIn: function(domain, domains) {
    return domains.some(function(line) {
      return lineToRegex(line).test(domain);
    });
  },
  emailToDomain: function(email) {
    return email.replace(/.+\@(.+)$/, '$1');
  }
};
