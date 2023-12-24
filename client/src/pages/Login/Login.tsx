import { FC, FormEvent, useEffect } from 'react';
import { Heading } from '../../components/Heading/Heading';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import s from './Login.module.css';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/user.slice';

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export const Login: FC = () => {
  // const [error, setError] = useState<string | undefined>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) {
      navigate('/');
    }
  }, [jwt, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & LoginForm;
    //типизация для e.target, все поля в e.target должны быть описаны в LoginForm
    //выполняет типизацию e.target для того, чтобы TypeScript мог убедиться, что все поля, используемые в дальнейшем, описаны в интерфейсе
    const { email, password } = target;

    await sendLogin(email.value, password.value);
  };

  const sendLogin = async (email: string, password: string): Promise<void> => {
    dispatch(login({ email, password }));
  };

  return (
    <div className={s['login']}>
      <Heading className={s['login__title']}>Вход</Heading>
      {loginErrorMessage && (
        <div className={s['login__error']}>{loginErrorMessage}</div>
      )}
      <form className={s['form']} onSubmit={submit}>
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
          Вход
        </Button>
        <div className={s['login__text']}>Нет аккаунта?</div>
        <div>
          <Link className={s['login__link']} to="/auth/registration">
            Зарегистрироваться
          </Link>
        </div>
      </form>
    </div>
  );
};
