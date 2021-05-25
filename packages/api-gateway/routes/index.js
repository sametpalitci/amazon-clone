const express = require('express');
const router = express.Router();
const axios = require('axios');

const registry = require('../registry');

router.all('/:apiName/:path', async (req, res) => {
  try {
    const { method, headers, body, query } = req;
    const url =
      registry.host +
      ':' +
      registry.services[req.params.apiName].port +
      '/' +
      req.params.path;
    return await axios({ method, headers, url, data: body, params: query })
      .then((response) => res.json(response.data))
      .catch((e) => res.status(e.response.status).json(e.response.data));
  } catch (err) {
    return res
      .status(403)
      .json({ notice: "API Name doesn't exist", status: 'NO' });
  }
});

module.exports = router;
