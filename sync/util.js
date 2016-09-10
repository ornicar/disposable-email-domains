module.exports = {
  domainExistsIn: function(domain, domains) {
    return domains.some(function(r) {
      var regex = new RegExp('(.+\\..|)' + r.replace('.', '\\.'));
      return regex.test(domain);
    });
  },
  emailToDomain: function(email) {
    return email.replace(/.+\@(.+)$/, '$1');
  }
};
