'use strict';

const TOKEN_URL = 'https://my.mlh.io/oauth/token';
const USER_URL      = 'https://my.mlh.io/api/v2/user.json';

/**
 * Meteor magic dictates that we have a global namespace
 */
MyMlh = { };

MyMlh.retrieveCredential = (credentialToken, credentialSecret) => {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};


MyMlh.whitelistedFields = ['id', 'email', 'first_name', 'last_name'];

function getConfiguration() {
  const config = ServiceConfiguration.configurations.findOne({
    service: 'mymlh'
  });

  if (!config) {
    throw new ServiceConfiguration.ConfigError();
  }

  return config;
}

function getTokenFromCode(config, code) {
  const getResponse = () => {
    try {
      return HTTP.post(
        TOKEN_URL,
        {
          params: {
            code,
            client_id: config.clientId,
            client_secret: config.secret,
            redirect_uri: OAuth._redirectUri('mymlh', config),
            grant_type: 'authorization_code',
          },
        }
      );
    } catch (error) {
      throw _.extend(new Error(`Failed to complete OAuth handshake with MyMLH. ${error.message}`), {
        response: error.response
      });
    }
  };

  return getResponse().data.access_token;
}


function getUser(config, accessToken) {
  return HTTP.get(
    USER_URL, 
    {
      params: {
        access_token: accessToken,
      },
    }
  ).data.data;
}


OAuth.registerService('mymlh', 2, null, (query) => {
  const config = getConfiguration();

  const accessToken = getTokenFromCode(config, query.code);
  const user = getUser(config, accessToken);

  return {
    serviceData: {
      accessToken,
      ..._.pick(user, MyMlh.whitelistedFields),
    },
    options: {
      profile: {
        name: `${user.first_name} ${user.last_name}`
      }
    }
  }
});
