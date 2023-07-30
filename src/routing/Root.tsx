import { Home } from '@/Home';
import { Layout } from '@/Layout';
import { ArticleDetailPage } from '@/article-detail/ArticleDetail';
import { MyArticlesPage } from '@/backoffice/my-articles/MyArticlesPage';
import { LoginPage } from '@/login/LoginPage';
import { Route } from 'react-router-dom';

export const Root = (
  <>
    <Route path="/" element={<Layout />}>
      <Route path="article/:articleId" element={<ArticleDetailPage />} />
      <Route index element={<Home />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="backoffice/my-articles" element={<MyArticlesPage />} />
    </Route>
  </>
);
