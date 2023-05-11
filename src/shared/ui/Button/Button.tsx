import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ButtonTheme {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINED = 'outlined',
  OUTLINED_RED = 'outlinedRed',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
  M = 'size-m',
  L = 'size-l',
  XL = 'size-xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme
  square?: boolean
  size?: ButtonSize
  children: ReactNode
}

export const Button = memo((props: ButtonProps) => {
  const {
    className,
    children,
    theme = ButtonTheme.OUTLINED,
    square,
    size = ButtonSize.M,
    ...otherProps
  } = props;

  const cl = classNames(
    cls.button,
    { [cls.square]: square },
    [className, cls[theme], cls[size]],
  );

  return (
    <button
      type="button"
      {...otherProps}
      className={cl}
    >
      {children}
    </button>
  );
});
