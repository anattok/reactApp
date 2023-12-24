import s from './Button.module.css';
import { ButtonProps } from './Button.props';
import { FC } from 'react';
import cn from 'classnames';

export const Button: FC<ButtonProps> = ({
  children,
  className,
  appearance = 'small',
  ...props
}) => {
  return (
    <button
      className={cn(s['button'], s['accent'], className, {
        [s['small']]: appearance === 'small',
        [s['big']]: appearance === 'big',
      })}
      {...props}
    >
      {children}
    </button>
  );
};

// function Button({ children, className, ...props }: ButtonProps) {
//   return (
//     <button className={cn("button accent", className)} {...props}>
//       {children}
//     </button>
//   );
// }

// export default Button;
