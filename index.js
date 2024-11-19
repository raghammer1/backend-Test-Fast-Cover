const express = require('express');
const cors = require('cors');
require('dotenv').config();
const weatherRoutes = require('./routes/weatherRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Api
app.use('/api/weather', weatherRoutes);

app.listen(PORT, () => {
  console.log('App started on port: ', PORT);
});
