# Frontend

## Run

For running development:

1. `yarn install`
2. `yarn dev`

FE runs on localhost:9000 and connects to backend on localhost:3000 (both local and docker).
It can be configured in [constants.ts](frontend/src/api/constants.ts)

Production build can be created and served by

1. `yarn build`
2. (`yarn global add serve`)
3. `serve -p 9000 ./dist`

## Tech stack:

- React 18
- TypeScript
- Webpack
- React Router for routing
- Chakra UI 2
- axios
- react-hook-form for editing articles
- react-markdown for displaying Markdown in articles
- Jest

I am using Chakra [design tokens](https://chakra-ui.com/docs/styled-system/semantic-tokens) for spacing which have size
1 "unit" = 0.25 rem = 16px

## Responsiveness

The app is not responsive, targeting only desktop.

## Code structure

- api - backend integration
- "front-office" folders: article-detail, article-list, login
- back-ofice folder with pages that require authenticated user

## Integration to API

App is using only REST API because I didn't have time to create GraphQl server.
Realtime commenting and voting feature is implemented by websockets.

## Missing or incomplete features

- Integration tests, I don't have time left for this. I have only a single unit test.

- Featured image uploads, I don't have time left for this.

- Pagination in article lists is missing. Implementation would be standard, to accept `offset` and `limit` query parameters, propagate them to the postgres' LIMIT and OFFSET, and return page information to the client.

- Deleting of articles - this would be very straightforward to do so I omitted that. Regarding implementation, it depends if it would be a soft delete (with a new column `deletedAt`) or hard delete, including deleting comments and votes (by delete cascade for example).

## Extra features

When commenting, author is is saved, in case of an autenticated user.

## State management and Caching

I don't need to maintain any state except useState hooks (and react-hook-form field values), mainly to keep fetched data. The only application-wide state is auth_token in local storage.

Currently there is no caching implemented. Caching would be easy to implement, but the downside would be that server changes from other users would be invisible for client until he does a full reload (or uses an extra button).

If caching would be required, I would use https://axios-cache-interceptor.js.org/ which sets up an interceptor in Axios for caching GET requests. It would require to invalidate its cache when modifiying data on backend (POST AND PATCH operations). Also it would need to invalidate the cache for opened article when an events comes from a websocket.

Note that in dev mode, I use React.StrictMode which double calls useEffects, thus you can see double requests to the API. This does not happen in production build.

## Possible enhancements

- Server side rendering at least for front-office pages, which would SEO-enable the site. For that, NextJs would be good option.
- Adding SEO and OG attributes to front-office pages.
- i18n
- displaying if and how (authenticated) user voted on a comment (like on StackOverflow). For that, REST + WS would need to JOIN the `comment_vote` table, and return e.g. `{ yourVote: 1 | 0 |-1 }`. This would not be possible for anonymous user without storing a cookie.

- Receiving realtime updates only for comments belonging to currently opened article. Currently the WS sends all updates for all articles which is not efficient.
  This could be improved by sending an upstream event when user opens an article. Backend would filter comment updates to just opened article.

- User avatars - Currently I have only one sample avatar. They could be stored in a table `user` and returned in auth_token from the server (more correctly the server should return id_token with user name and avatar, and auth_token would server only to authenticate to the API).

- Authentication - Currently the auth token cannot be revoked. I would be better to include refresh token support and shorten the authentication token expiration period. Due to this fact, there is no server side logout. Generally it would be better to use an existing authentication library like Passport or Auth0.

  Also there is no token expiration detection on frontend. It would be easy to check HTTP 401 error in the axios interceptor and redirect to login screen.

- Sharing TypeScript types between frontend and backend. This can be simply done by extracting shared types to the root level and using a module alias, e.g. `shared-types`.
