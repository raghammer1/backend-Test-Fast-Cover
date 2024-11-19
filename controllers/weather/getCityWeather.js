const axios = require('axios');

const getCityWeather = async (req, res) => {
  const city = req.query.city;
  const apikey = process.env.WEATHER_API_KEY;

  const latLongUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apikey}`;

  try {
    // first getting the lat and long of the given city
    const latLongRes = await axios.get(latLongUrl);

    if (!latLongRes.data || latLongRes.data.length === 0) {
      return res.status(404).json({ error: 'City not found' });
    }

    const { lat, lon } = latLongRes.data[0];

    // then using the lat and long to get the weather of the city
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;
    const weatherRes = await axios.get(weatherUrl);

    return res.status(200).json(weatherRes.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Unable to get weather data' });
  }
};

module.exports = getCityWeather;
