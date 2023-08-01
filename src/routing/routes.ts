export function getLoginRoute() {
  return '/login';
}

export function getArticleDetailRoute(id: string) {
  return `/article/${id}`;
}

export function getCreateArticleRoute() {
  return '/backoffice/add-article';
}

export function getRecentArticlesRoute() {
  return '/';
}

export function getMyArticlesRoute() {
  return '/backoffice/my-articles';
}
