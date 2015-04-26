var path = require('path');

module.exports = {
  tags: ['auth'],

  'Try to login into with fake credentials': function (client) {
    return client.page.auth
      .login(client.globals.credentials.FAKE_LOGIN, client.globals.credentials.FAKE_PASSWORD)
      .waitForElementPresent('.error-msg', client.globals.timeouts.WAIT_FOR_CONDITIONAL_TIMEOUT)
      .assert.elementPresent('.error-msg')
      .assert.containsText('.error-msg', 'doesn\'t match our records')
    ;
  },

  'Try to login into with correct credentials' : function (client) {
    return client.page.auth
      .login(client.globals.credentials.CORRECT_LOGIN, client.globals.credentials.CORRECT_PASSWORD)
      .assert.urlContains(client.globals.urls.APPLICATION_URL)
    ;
  },

  before: function(client) {
    require('nightwatch-pages')(client, path.resolve(__dirname, '..', 'pages'));
  },
};
