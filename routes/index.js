const express = require('express');
const router = express.Router();

const reportRoutes = require('./reportRoutes');
const ngoRoutes = require('./ngoRoutes');

router.use('/reports', reportRoutes);
router.use('/ngo', ngoRoutes);

module.exports = router;
