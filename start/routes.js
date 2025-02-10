const express = require("express");
const cookieParser = require('cookie-parser');

var ogc_api_geovolumes_Router = require("../routes/ogc_api_geovolumes");

module.exports = function (app) {
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({
    extended: true
  }));
  app.use("/ogc_api_geovolumes", ogc_api_geovolumes_Router);
};