const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const blogtRoutes = require('./blogRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/blog', blogtRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
