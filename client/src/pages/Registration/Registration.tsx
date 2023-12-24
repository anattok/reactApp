import { FC, FormEvent, useState } from 'react';
import { Heading } from '../../components/Heading/Heading';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import s from './Registration.module.css';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';
import { MIN_PASSWORD_LENGTH } from '../../helpers/PASS';
import { LoginResponse } from '../../interfaces/auth.interface';

export type RegistrationForm = {
  name: {
    value: string;
  };
  surname: {
    value: string;
  };
  phone: {
    value: string;
  };
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export const Registration: FC = () => {
  const [error, setError] = useState<string | undefined>();
  const navigate = useNavigate();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & RegistrationForm;
    //типизация для e.target, все поля в e.target должны быть описаны в LoginForm
    //выполняет типизацию e.target для того, чтобы TypeScript мог убедиться, что все поля, используемые в дальнейшем, описаны в интерфейсе
    const { name, surname, phone, email, password } = target;

    // Проверка длины пароля
    if (password.value.length < MIN_PASSWORD_LENGTH) {
      setError('Слишком короткий пароль');
      return;
    }

    await register(
      name.value,
      surname.value,
      phone.value,
      email.value,
      password.value,
    );
  };

  const register = async (
    name: string,
    surname: string,
    phone: string,
    email: string,
    password: string,
  ): Promise<void> => {
    try {
      await axios.post<LoginResponse>(`${PREFIX}/auth/register`, {
        name,
        surname,
        phone,
        email,
        password,
      });
      navigate('/auth/login');
      console.log('Успешная регистрация');
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.error);
        setError(error.response?.data.error);
      }
    }
  };

  return (
    <div className={s['login']}>
      {error && <div className={s['login__error']}>{error}</div>}
      <Heading className={s['login__title']}>Регистрация</Heading>
      <form className={s['form']} onSubmit={submit}>
        <div className={s['form__input']}>
          <label htmlFor="name">Ваше имя</label>
          <Input name="name" placeholder="Имя" id="name" />
        </div>
        <div className={s['form__input']}>
          <label htmlFor="surname">Ваша фамилия</label>
          <Input name="surname" placeholder="Фамилия" id="surname" />
        </div>
        <div className={s['form__input']}>
          <label htmlFor="phone">Ваш номер телефона</label>
          <Input name="phone" placeholder="Телефон" id="phone" />
        </div>
        <div className={s['form__input']}>
          <label htmlFor="email">Ваш email</label>
          <Input name="email" placeholder="Email" id="email" />
        </div>
        <div className={s['form__input']}>
          <label htmlFor="password">Ваш пароль</label>
          <Input
            name="password"
            placeholder="******"
            type="password"
            id="password"
          />
        </div>
        <Button className={s['login__send']} appearance="big">
          Зарегистрироваться
        </Button>
        <div className={s['login__text']}>Уже зарегистрированы?</div>
        <div>
          <Link className={s['login__link']} to="/auth/login">
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
};
