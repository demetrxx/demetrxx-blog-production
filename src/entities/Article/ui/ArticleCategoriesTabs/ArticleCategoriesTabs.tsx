import React, { memo, useCallback, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { ArticleCategory } from 'entities/Article';

interface ArticleCategoriesTabsProps {
  className?: string;
  value: string
  onClick: (value: ArticleCategory) => void
}

export const ArticleCategoriesTabs = memo((props: ArticleCategoriesTabsProps) => {
  const { className, value, onClick } = props;

  const { t } = useTranslation();
  const categoriesTabs = useMemo<TabItem[]>(() => [
    {
      value: ArticleCategory.ALL,
      content: t('All'),
    },
    {
      value: ArticleCategory.IT,
      content: t('IT'),
    },
    {
      value: ArticleCategory.ECONOMICS,
      content: t('Economics'),
    },
    {
      value: ArticleCategory.SCIENCE,
      content: t('Science'),
    },
  ], [t]);

  const handleChangeType = useCallback(({ value }: TabItem) => {
    onClick(value as ArticleCategory);
  }, [onClick]);

  return (
    <Tabs
      className={classNames('', {}, [className])}
      tabs={categoriesTabs}
      value={value}
      onTabClick={handleChangeType}
    />
  );
});