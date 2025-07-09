const Category = require('../models/Category');

async function createCategory(req, res) {
  const { name } = req.body;
  try {
    const category = new Category({ name, user: req.userId });
    await category.save();
    res.status(201).json({ categoryId: category._id, message: 'Category created' });
  } catch (err) {
    res.status(500).json({ error: 'Category creation failed' });
  }
}

async function getCategories(req, res) {
  try {
    const categories = await Category.find({ user: req.userId });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Fetching categories failed' });
  }
}

module.exports = {
  createCategory,
  getCategories,
};
