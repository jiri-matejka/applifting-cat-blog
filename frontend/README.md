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

## Incomplete features

- Deleting of articles - this would be very straightforward to do so I omitted that. Regarding implementation, it depends if it would be a soft delete (with a new column `deletedAt`) or hard delete, including deleting comments and votes (by delete cascade for example).

- User avatars - Currently I have only one sample avatar. They could be stored in a table `user` and returned in auth_token from the server (more correctly the server should return id_token with user name and avatar, and auth_token would server only to authenticate to the API).

- Authentication - Currently the auth token cannot be revoked. I would be better to include refresh token support and shorten the authentication token expiration period. Due to this fact, there is no server side logout. Generally it would be better to use an existing authentication library like Passport or Auth0.

  Also there is no token expiration detection on frontend. It would be easy to check HTTP 401 error in the axios interceptor and redirect to login screen.

## Extra features

When commenting, author is is saved, in case of an autenticated user.

## Caching of data

Caching of GET requests is automatic thanks to ETag being sent from Express.

## Possible enhancements

- Server side rendering at least for front-office pages, which would SEO-enable the site. For that, NextJs would be good option.
- Adding SEO and OG attributes to front-office pages.
- i18n
- displaying if and how (authenticated) user voted on a comment (like on StackOverflow). For that, REST + WS would need to JOIN the `comment_vote` table, and return e.g. `{ yourVote: 1 | 0 |-1 }`. This would not be possible for anonymous user without storing a cookie.
- Receiving realtime updated only for comments belonging to currently opened article. Currently the WS sends all updates for all articles which is not efficient.
  This could be improved by sending an upstream event when user opens an article. Backend would filter comment updates to just opened article.

## Technical enhancements

Sharing TypeScript types between frontend and backend. This can be simply done by extracting shared types to the root level and using a module alias, e.g. `shared-types`.
