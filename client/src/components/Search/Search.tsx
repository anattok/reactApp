import { FC } from 'react';
import cn from 'classnames';
import { SearchProps } from './Search.props.ts';
import s from './Search.module.css';

export const Search: FC<SearchProps> = ({
  className,
  ref,
  isValid = true,
  ...props
}) => {
  return (
    <div className={s['search']}>
      <input
        ref={ref}
        className={cn(s['input'], className, {
          [s['invalid']]: !isValid,
        })}
        {...props}
      />
      <img src="/search.svg" alt="" />
    </div>
  );
};
