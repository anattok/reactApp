const jwt = require('../utils/jwt');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        res.status(401).send('Токен отсутствует');
    } else {
        jwt.verify(token, (err, decoded) => {
            if (err) {
                res.status(401).send('Неверный токен');
            } else {
                // Успешная аутентификация
                req.user = decoded;

                // Добавляем сообщение об успешной аутентификации
                console.log('Вы успешно авторизованы');

                next();
            }
        });
    }
};

module.exports = {
    authenticate,
};