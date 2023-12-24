import { FC, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import s from './Layout.module.css';
import cn from 'classnames';
import { Button } from '../../components/Button/Button';
import { getProfile, userActions } from '../../store/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
export const Layout: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((s: RootState) => s.user.profile);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const logout = () => {
    dispatch(userActions.logout());
    navigate('/auth/login');
  };

  return (
    <div className={s['layout']}>
      <div className={s['sidebar']}>
        <div className={s['user']}>
          <img src="/avatar.svg" alt="avatar" />
          <div className={s['name']}>{profile?.name}</div>
          <div className={s['email']}>{profile?.email}</div>
        </div>
        <div className={s['menu']}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(s['link'], {
                [s.active]: isActive,
              })
            }
          >
            <img src="/menu-boxed.svg" alt="Menu" />
            Меню
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              cn(s['link'], {
                [s.active]: isActive,
              })
            }
          >
            <img src="/shopping-cart-black.svg" alt="Cart" />
            Корзина
          </NavLink>
        </div>
        <Button className={s['exit']} onClick={logout}>
          <img src="/log-off.svg" alt="Off" />
          Выход
        </Button>
      </div>
      <div className={s['content']}>
        <Outlet />
      </div>
    </div>
  );
};
