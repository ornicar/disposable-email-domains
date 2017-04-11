function lineToRegex(line) {
  line = line.replace('\\w', '[\\w-]');
  line = line.replace('.', '\\.');
  return new RegExp('^(.+\\.)?' + line, 'i');
}

module.exports = {
  lineToRegex: lineToRegex,
  domainExistsIn: function(domain, domains) {
    return domains.some(function(line) {
      // if (lineToRegex(line).test(domain)) console.log(line, lineToRegex(line), domain);
      return lineToRegex(line).test(domain);
    });
  },
  emailToDomain: function(email) {
    return email.replace(/.+\@(.+)$/, '$1');
  },
  removeSubdomain: function(domain) {
    var parts = domain.split('.');
    if (parts.length < 3) return domain;
    var rightSide = parts.slice(-2).join('.');
    if (rightSide.length <= 7) return domain;
    return rightSide;
  }
};
