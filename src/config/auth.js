var jwt = require("express-jwt");
var jwks = require("jwks-rsa");
require('dotenv').config();

const {AUTH0_AUDIENCE, AUTH0_DOMAIN } = process.env

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: AUTH0_AUDIENCE,
  issuer: `https://${AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});

module.exports = jwtCheck;
