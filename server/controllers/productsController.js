const products = require('../data');

// Получаем все продукты
function getAllProducts(req, res) {
    const filteredProducts = req.query.name
        ? products.filter((product) =>
            product.description.some((desc) =>
                desc.toLowerCase().includes(req.query.name.toLowerCase())
            )
        )
        : products;

    if (filteredProducts.length === 0) {
        // Если ничего не найдено, отправляем сообщение
        res.status(404).json({ error: 'Ничего не найдено' });
    } else {
        // В противном случае отправляем отфильтрованные продукты
        res.json(filteredProducts);
    }
}

//поучаем по id
function getProductById(req, res) {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Продукт не найден' });
    }
}

module.exports = {
    getAllProducts,
    getProductById
};