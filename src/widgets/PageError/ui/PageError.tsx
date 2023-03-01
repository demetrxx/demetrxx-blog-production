import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import cls from './PageError.module.scss';

interface PageErrorProps {
  className?: string;
}

export const PageError: FC<PageErrorProps> = (props) => {
  const { className } = props;

  const { t } = useTranslation();
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className={classNames(cls.PageError, {}, [className])}>
      <p>{t('Unexpected error occurred')}</p>
      <Button onClick={reloadPage}>{t('Reload page')}</Button>
    </div>
  );
};
