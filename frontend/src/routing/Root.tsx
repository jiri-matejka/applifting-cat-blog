import { Layout } from '@/Layout';
import { lazy } from 'react';
import { Route } from 'react-router-dom';
import { SuspenseRoute } from './SuspenseRoute';

const LazyArticleDetailPage = lazy(
  () => import('@/article-detail/ArticleDetail'),
);
const LazyHomePage = lazy(() => import('@/Home'));
const LazyLoginPage = lazy(() => import('@/login/LoginPage'));
const LazyMyArticlesPage = lazy(
  () => import('@/backoffice/my-articles/MyArticlesPage'),
);
const LazyCreateArticlePage = lazy(
  () => import('@/backoffice/edit-article/CreateArticlePage'),
);
const LazyEditArticlePage = lazy(
  () => import('@/backoffice/edit-article/EditArticlePage'),
);

export const Root = (
  <>
    <Route path="/" element={<Layout />}>
      <Route
        path="article/:articleId"
        element={
          <SuspenseRoute>
            <LazyArticleDetailPage />
          </SuspenseRoute>
        }
      />
      <Route
        index
        element={
          <SuspenseRoute>
            <LazyHomePage />
          </SuspenseRoute>
        }
      />
      <Route
        path="login"
        element={
          <SuspenseRoute>
            <LazyLoginPage />
          </SuspenseRoute>
        }
      />
      <Route
        path="backoffice/my-articles"
        element={
          <SuspenseRoute>
            <LazyMyArticlesPage />
          </SuspenseRoute>
        }
      />
      <Route
        path="backoffice/my-articles/:articleId"
        element={
          <SuspenseRoute>
            <LazyEditArticlePage />
          </SuspenseRoute>
        }
      />
      <Route
        path="backoffice/add-article"
        element={
          <SuspenseRoute>
            <LazyCreateArticlePage />
          </SuspenseRoute>
        }
      />
    </Route>
  </>
);
