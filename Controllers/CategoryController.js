
const CATEGORIES = require('../config/Categories');





exports.getMainCategories = (req, res) => {
    try {
      const mainCategories = Object.keys(CATEGORIES);
      res.status(200).json({
        status: 'success',
        data: { categories: mainCategories }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
  
  // Get subcategories for a specific category
  exports.getSubcategories = (req, res) => {
    try {
      const category = req.params.category;
      const subcategories = CATEGORIES[category];
  
      if (!subcategories) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.status(200).json({
        status: 'success',
        data: { category, subcategories }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };