const express = require("express");
const jwtCheck = require("../config/auth");

const router = express.Router();

router.get("/", jwtCheck, function (req, res) {
  res.send("hola estoy en /auth");
});

module.exports = router;

// const getManagementApiJwt = () => {
//     var request = require("request");
//     return new Promise(function (resolve, reject) {
//         var options = {
//             method: 'POST',
//             url: 'https://dev-0-knpzfi.us.auth0.com/oauth/token',
//             headers: { 'content-type': 'application/json' },
//             body: '{"client_id":"hdinEoO2VwjA8d9ZVTqVaovaWU5hdwEC","client_secret":"E_JGcr6c8zyRDjGETh-hsptgUfcDir_k73ThRoUdJ_IkhwfrDfLMoim_BU0_62yv","audience":"https://dev-0-knpzfi.us.auth0.com/api/v2/","grant_type":"client_credentials"}'
//         };

//         request(options, function (error, response, body) {
//             if (error) {
//                 reject(error)
//             } else {
//                 resolve(JSON.parse(body))
//             }
//         })
//     })
// }

// router.get("/private", checkJwt, function (req, res) {
//   console.log("entre a api private");
//   res.json({
//     message:
//       "Hello from a private endpoint! You need to be authenticated to see this.",
//   });
// });

// const checkScopes = jwtAuthz(['read:messages']);
// router.get('/private-scoped', checkJwt, checkScopes, function (req, res) {
//     res.json({
//         message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
//     });
// });

// router.get("/user/manifestStripeCustomer", jwtCheck, function (req, res) {
//   var request = require("request");

//   getManagementApiJwt().then((data) => {
//     const token = data.access_token;
//     var options = {
//       method: "PATCH",
//       url: "https://dev-0-knpzfi.us.auth0.com/api/v2/users/" + req.user.sub,
//       headers: {
//         authorization: "Bearer" + token,
//         "content-type": "application/json",
//       },
//       body: {
//         app_metadata: {
//           stripeCustomerId: req.user.sub,
//         },
//       },
//       json: true,
//     };

//     request(options, function (error, response, body) {
//       if (error) throw new Error(error);
//       res.json(body);
//     });
//   });
// });
