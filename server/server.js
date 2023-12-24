const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productsRoutes = require('./routes/product/products');
const authRoutes = require('./routes/user/authRoutes');
const userRoutes = require('./routes/user/userRoutes');

const app = express();

app.use(cors());
app.use('/products', productsRoutes);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://tokarev182:1QNOr3Avf459B4wj@pizza.tek24ar.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Проверка соединения с базой данных MongoDB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Ошибка подключения к MongoDB:'));
db.once('open', () => {
    console.log('Подключено к MongoDB');
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);


const port = 3000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});