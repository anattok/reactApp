import s from './Loader.module.css';
import { FC } from 'react';

export const Loader: FC = () => {
  return <span className={s['loader']}></span>;
};
