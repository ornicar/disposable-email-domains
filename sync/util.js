function lineToRegex(line) {
  line = line.replace('\\w', '[\\w-]');
  line = line.replace('.', '\\.');
  return new RegExp('(.+\\.)?' + line, 'i');
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
