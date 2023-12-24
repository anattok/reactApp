const express = require('express');
const router = express.Router();
const productsController = require('../../controllers/productsController');

// Маршруты для продуктов
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);

module.exports = router;