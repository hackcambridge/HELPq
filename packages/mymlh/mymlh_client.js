'use strict';

const AUTHORIZE_URL = 'https://my.mlh.io/oauth/authorize';
const AUTH_SCOPE = ['email', 'phone_number', 'demographics', 'birthday', 'education', 'event'].join(' ');

MyMlh = { };

function getConfiguration() {
  const config = ServiceConfiguration.configurations.findOne({
    service: 'mymlh'
  });

  if (!config) {
    throw new ServiceConfiguration.ConfigError();
  }

  return config;
}

MyMlh.requestCredential = (options, requestCredentialCallback) => {
  /**
   * Support both (options, callback) and (callback).
   */
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  } else if (!options) {
    options = {};
  }

  /**
   * Make sure we have a config object for subsequent use (boilerplate)
   */
  const config = ServiceConfiguration.configurations.findOne({
    service: 'mymlh'
  });

  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(
      new ServiceConfiguration.ConfigError()
    );
    return;
  }

  /**
   * Boilerplate
   */
  const credentialToken = Random.secret();
  const loginStyle = OAuth._loginStyle('mymlh', config, options);

  /**
   * Imgur requires response_type and client_id
   */
  const loginUrl = `${AUTHORIZE_URL}?client_id=${config.clientId}&response_type=code&redirect_uri=${OAuth._redirectUri('mymlh', config)}&scope=${AUTH_SCOPE}&state=${OAuth._stateParam(loginStyle, credentialToken)}`;

  /**
   * Client initiates OAuth login request (boilerplate)
  */
  OAuth.launchLogin({
    loginService: 'mymlh',
    loginStyle,
    loginUrl,
    credentialToken,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    popupOptions: {
      height: 600
    }
  });
};
