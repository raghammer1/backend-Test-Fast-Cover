const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weather/weatherControllers');
const joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

// checking if all query params are given
const weatherSchema = joi.object({
  city: joi.string().required(),
});

router
  .route('/cityWeather')
  .get(
    validator.query(weatherSchema),
    weatherController.controllers.getCityWeather
  );

module.exports = router;
