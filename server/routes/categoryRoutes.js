const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createCategory, getCategories } = require('../controllers/categoryController');

router.post('/', auth, createCategory);
router.get('/', auth, getCategories);

module.exports = router;
