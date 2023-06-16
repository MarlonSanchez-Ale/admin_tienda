const withFonts = require("next-fonts");

module.exports = withFonts({
  serverRuntimeConfig: {
    secret: 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING',
    ROOT: __dirname,
    DB_DIALECT: process.env.DB_DIALECT,
    DATABASE: process.env.DATABASE,
    USUARIO: process.env.USUARIOS,
    PASSWORD: process.env.PASSWORD,
    JWT_KEY: process.env.JWT_KEY,
    PORT: process.env.PORT,
  },
  webpack(config, options) {
    return config;
  },
})