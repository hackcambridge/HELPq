Package.describe({
  name: 'mymlh',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse((api) => {
  api.versionsFrom('1.4.2.3');
  api.use('ecmascript');
  api.use('accounts-ui', ['client', 'server']);
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);

  api.export('MyMlh');

  api.addFiles('mymlh_server.js', 'server');
  api.addFiles('mymlh_client.js', 'client');
});
