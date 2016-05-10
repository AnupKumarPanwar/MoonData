var request = require("request");

module.exports = getJSON;

function getJSON (url, callback) {
  request({ url: url, json: true }, function (error, response, body) {
    if(error) return callback(error);

    if(response.statusCode != 200) return;

    callback(undefined, body);
  });
}
