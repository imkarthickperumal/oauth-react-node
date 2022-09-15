// var express = require("express");
// var app = express();
// var jwt = require("express-jwt");
// var jwks = require("jwks-rsa");
// var guard = require("express-jwt-permissions")();

// var port = process.env.PORT || 8080;

// var jwtCheck = jwt({
//   secret: jwks.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: "https://thagadoor.us.auth0.com/.well-known/jwks.json",
//   }),
//   audience: "https://icw-ott.com",
//   issuer: "https://thagadoor.us.auth0.com/",
//   algorithms: ["RS256"],
// });

// app.use(jwtCheck);

// app.get("/icwott", guard.check(['read:icwott']), function (req, res) {
//   res.json({
//     icwott1: "This is first movie",
//     icwott2: "This is another movie",
//   });
// });

// app.listen(port);


var express = require("express");
var axios = require("axios");
var port = process.env.PORT || 3001;
var oAuth = require("./middleware/oAuth");
var app = express();

const challengesAPIEndpoint = "http://localhost:8080/icwott";

app.use(oAuth);

app.get("/challenges", async (req, res) => {
  try {
    const { access_token } = req.oauth;

    const response = await axios({
      method: "get",
      url: challengesAPIEndpoint,
      headers: { Authorization: `Bearer ${access_token}` },
    });
    res.json(response.data);
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      res.status(401).json("Unauthorized to access data");
    } else if (error.response.status === 403) {
      res.status(403).json("Permission denied");
    } else {
      res.status(500).json("Whoops, something went wrong");
    }
  }
});

app.listen(port, () => console.log("Started"));
