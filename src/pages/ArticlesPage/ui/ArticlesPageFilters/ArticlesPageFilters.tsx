import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  ArticleSortField,
  ArticleView,
  ArticleViewSelector,
  ArticleSortSelector,
  ArticleCategory,
  ArticleCategoriesTabs,
} from '@/entities/Article';
import { useAppDispatch, useDebounce } from '@/shared/lib/hooks';
import { Card, Input } from '@/shared/ui';
import { SortOrder } from '@/shared/types/sort';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';
import {
  getArticlesPageFilter,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageView,
  getArticlesPageCategory,
} from '../../model/selectors/articles';
import cls from './ArticlesPageFilters.module.scss';

interface ArticlePageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlePageFiltersProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const view = useSelector(getArticlesPageView);
  const sortField = useSelector(getArticlesPageFilter);
  const search = useSelector(getArticlesPageSearch);
  const order = useSelector(getArticlesPageOrder);
  const category = useSelector(getArticlesPageCategory);

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
  }, [dispatch]);

  const debouncedFetchData = useDebounce(fetchData, 500);

  const handleChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view));
  }, [dispatch]);

  const handleChangeFilter = useCallback((filter: ArticleSortField) => {
    dispatch(articlesPageActions.setSortField(filter));
    dispatch(articlesPageActions.setPage(1));
    fetchData();
  }, [dispatch, fetchData]);

  const handleChangeOrder = useCallback((order: SortOrder) => {
    dispatch(articlesPageActions.setOrder(order));
    dispatch(articlesPageActions.setPage(1));
    fetchData();
  }, [dispatch, fetchData]);

  const handleChangeSearch = useCallback((search: string) => {
    dispatch(articlesPageActions.setSearch(search));
    dispatch(articlesPageActions.setPage(1));
    debouncedFetchData();
  }, [dispatch, debouncedFetchData]);

  const handleChangeType = useCallback((value: ArticleCategory) => {
    dispatch(articlesPageActions.setType(value));
    dispatch(articlesPageActions.setPage(1));
    fetchData();
  }, [dispatch, fetchData]);

  return (
    <div className={classNames(cls.articlePageFilters, {}, [className])}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelector
          sortField={sortField}
          order={order}
          onChangeFilter={handleChangeFilter}
          onChangeOrder={handleChangeOrder}
        />
        <ArticleViewSelector view={view} onViewClick={handleChangeView} />
      </div>

      <Card className={cls.search}>
        <Input
          value={search}
          onChange={handleChangeSearch}
          placeholder={t('Search')}
        />
      </Card>
      <ArticleCategoriesTabs value={category} onClick={handleChangeType} className={cls.tabs} />
    </div>
  );
});
