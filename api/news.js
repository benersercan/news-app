/* eslint-disable no-undef */
// vercel Proxy
const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2' + req.url, {
      headers: {
        'Authorization': `Bearer ${process.env.NEWSAPI_KEY}` // vercel .env
      },
      params: req.query
    });
    res.status(200).send(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).send(error.response?.data || {});
  }
};
