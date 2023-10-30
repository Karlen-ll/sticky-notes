const path = require('path')

module.exports = function override(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@components': path.resolve(`./src/components`),
    '@containers': path.resolve(`./src/containers`),
    '@assets': path.resolve(`./src/assets`),
    '@global': path.resolve(`./src/global`),
    '@utils': path.resolve(`./src/utils`),
    '@style': path.resolve(`./src/style`),
    '@views': path.resolve(`./src/views`),
    '@api': path.resolve(`./src/api`),
  }

  return config
}
