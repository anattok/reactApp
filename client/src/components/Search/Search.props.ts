import { InputHTMLAttributes, RefObject } from 'react';

export interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  isValid?: true;
  ref?: RefObject<HTMLInputElement>;
}
