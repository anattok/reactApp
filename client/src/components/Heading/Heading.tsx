import s from './Heading.module.css';
import { HeadingProps } from './Heading.props';
import { FC } from 'react';
import cn from 'classnames';

export const Heading: FC<HeadingProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h1 className={cn(s['heading'], className)} {...props}>
      {children}
    </h1>
  );
};
