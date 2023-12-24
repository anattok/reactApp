import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import s from './AuthLayout.module.css';

export const AuthLayout: FC = () => {
  return (
    <div className={s['layout']}>
      <div className={s['logo']}>
        <img src="/logo.jpg" alt="logo" />
      </div>
      <div className={s['content']}>
        <Outlet />
      </div>
    </div>
  );
};
