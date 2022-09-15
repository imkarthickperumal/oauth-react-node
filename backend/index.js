var express = require("express");
var app = express();
var jwt = require("express-jwt");
var jwks = require("jwks-rsa");
var guard = require("express-jwt-permissions")();

var port = process.env.PORT || 8080;

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://thagadoor.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://icw-ott.com",
  issuer: "https://thagadoor.us.auth0.com/",
  algorithms: ["RS256"],
});

app.use(jwtCheck);

app.get("/icwott", guard.check(['read:icwott']), function (req, res) {
  res.json({
    icwott1: "This is first movie",
    icwott2: "This is another movie",
  });
});

app.listen(port);
