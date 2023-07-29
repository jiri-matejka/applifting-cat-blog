import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { Home } from './Home';
import { ArticleDetailPage } from './article-detail/ArticleDetail';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="article/:articleId" element={<ArticleDetailPage />} />
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}
