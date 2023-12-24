const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const User = require('../models/user');

const register = async (req, res) => {
    const { name, surname, phone, email, password } = req.body;

    // Проверка валидности email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Некорректный формат email' });
    }

    try {
        // Проверка уникальности email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
        }

        const hashedPassword = await bcrypt.hash(password, 7);
        const newUser = new User({ name, surname, phone, email, password: hashedPassword });

        await newUser.save();
        console.log('Новый пользователь создан с id:', newUser._id.toString());

        const token = jwt.sign({ email: newUser.email });

        // Отправка токена клиенту
        res.status(200).json({
            email: newUser.email,
            id: newUser._id.toString(),
            token,
        });
    } catch (error) {
        console.error('Ошибка при регистрации пользователя:', error);
        res.status(500).send('Ошибка при регистрации пользователя');
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Поиск пользователя в базе данных по имени пользователя
        const user = await User.findOne({ email });

        // Проверка, существует ли пользователь и совпадает ли пароль
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).send('Неверное имя пользователя или пароль');
            return;
        }

        // Создание JWT токена для успешного входа
        const token = jwt.sign({ email: user.email });

        // Отправка токена и сообщения об успешной аутентификации
        res.status(200).json({
            id: user._id.toString(),
            name: user.name,
            phone: user.phone,
            email: user.email,
            token,
        });
    } catch (error) {
        console.error('Ошибка при входе:', error);
        res.status(500).send('Ошибка при входе');
    }
};

const getUserByJwt = async (req, res) => {
    try {
        // Получаем email пользователя из расшифрованного JWT
        const userEmail = req.user.email;

        // Ищем пользователя в базе данных по email
        const user = await User.findOne({ email: userEmail });

        // Проверяем, найден ли пользователь
        if (!user) {
            res.status(404).send('Пользователь не найден');
        } else {
            // Возвращаем пользователя
            res.status(200).json({
                id: user._id.toString(),
                name: user.name,
                phone: user.phone,
                email: user.email,
            });
        }
    } catch (error) {
        console.error('Ошибка при получении пользователя по JWT:', error);
        res.status(500).send('Ошибка при получении пользователя');
    }
};

const getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).send('Пользователь не найден');
        } else {
            res.json(user);
        }
    } catch (error) {
        console.error('Ошибка при получении пользователя:', error);
        res.status(500).send('Ошибка при получении пользователя');
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
            res.status(404).send('Пользователи не найдены');
        } else {
            res.json(users);
        }
    } catch (error) {
        console.error('Ошибка при получении всех пользователей:', error);
        res.status(500).send('Ошибка при получении всех пользователей');
    }
};

module.exports = {
    register,
    login,
    getUserByJwt,
    getUserById,
    getAllUsers,
};
