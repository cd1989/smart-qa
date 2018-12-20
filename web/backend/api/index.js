const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../../config.json');

// List environments
router.get('/environments', (req, res) => {
  axios
    .get(`${config.apiService}/api/environments`)
    .then(response => {
      if (response.status / 100 === 2) {
        res.json(response.data);
      } else {
        res.status(response.status).end();
      }
    })
    .catch(error => {
      if (error.response) {
        res.status(error.response.status).end(error.response.data);
      } else {
        res.status(500).end('error');
      }
    });
});

module.exports = router;
