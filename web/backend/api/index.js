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

// Add new environment
router.post('/environments', (req, res) => {
  axios
    .post(`${config.apiService}/api/environments`, req.body)
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

// Delete environment
router.delete('/environments/:name', (req, res) => {
  axios
    .delete(`${config.apiService}/api/environments/${req.params.name}`)
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

// Run test
router.post('/execute', (req, res) => {
  axios
    .post(`${config.apiService}/api/execute`, req.body)
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
