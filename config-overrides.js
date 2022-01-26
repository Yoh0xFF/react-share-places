const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@ui': 'src/ui',
  })(config);

  return config;
};
