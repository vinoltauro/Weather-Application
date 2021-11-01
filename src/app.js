const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// define paths for express congif
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// set up handlebars engine and view location
hbs.registerPartials(partialsPath);
app.set("view engine", "hbs");
app.set("views", viewPath);

// set up static dir to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather ",
    name: "Vinol Tauro",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Vinol Tauro",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Contact for further information",
    title: "Help Section",
  });
});

app.get("/about/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Vinol Tauro",
    errorMsg: "About Page not found",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Vinol Tauro",
    errorMsg: "Help Page not found",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "Enter search tag" });
  }
  res.send({
    products: [],
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address",
    });
  }


  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
        return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            forecast: forecastData.data1,
            location : forecastData.data2
        })
    })
})

});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Vinol Tauro",
    errorMsg: "Page not found",
  });
});

app.listen(port, () => {
  console.log("The app is up and running on " + port);
});
