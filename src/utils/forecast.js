const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=db0c8d4d9cf3359660e16d0aac934775&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) callback("Unable to connect to the weather service.", undefined);
    else if (body.error) {
  
      callback("Unable to find location.", undefined);
    } else {
    
  
      temp = body.current.temperature;
      feelslike =  body.current.feelslike;
      location =  body.location.region,
      country =  body.location.country,
      data1 = "It is " + temp + "°C and feels like " + feelslike + "°C";
      data2 = location + ", "+ country;
      data = {
        data1,
        data2
      }
      callback(undefined, data);
    }
  });
};

module.exports = forecast;
