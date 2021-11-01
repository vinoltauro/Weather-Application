const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoidmlub2x0YXVybyIsImEiOiJja3RuM3Q0b2EyYmZvMndvbGlxZXdqb2l2In0.OI4RNWC3e8RxkhP9TKDobQ&limit=1";

  request({ url: url, json: true }, (error, { body }) => {
    if (error)
      callback("Unable to connect to the geocoding service.", undefined);
    else if (body.features.length === 0)
      callback("Unable to get valid coordinates.");
    else {
      const data = {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      };

      callback(undefined, data);
    }
  });
};

module.exports = geocode;
