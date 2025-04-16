/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const SpotifyController = () => import('#controllers/spotify_controller')
const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')
const SpotifyAuthController = () => import('#controllers/spotify_auth_controller')
const FriendsController = () => import('#controllers/friends_controller')

//#region Auth
router
  .group(() => {
    router.post('/login', [AuthController, 'login']).as('login')
    router.post('/logout', [AuthController, 'logout']).as('logout').use(middleware.auth())
    router.get('/me', [AuthController, 'me']).as('me').use(middleware.auth())
  })
  .prefix('auth')
  .as('auth')

router
  .group(() => {
    router.get('redirect', [SpotifyAuthController, 'redirect']).as('redirect')
    router.get('callback', [SpotifyAuthController, 'callback']).as('callback')
  })
  .prefix('spotify')
  .as('spotify')

//#region Users
router.resource('users', UsersController).apiOnly().use(['destroy', 'update'], middleware.auth())
//#endregion

//#region Friends
router
  .resource('users.friends', FriendsController)
  .params({ users: 'id' })
  .params({ friends: 'friendId' })
  .use('*', middleware.auth())
  .apiOnly()
//#endregion

router
  .get('currentTrack', [SpotifyController, 'getCurrentTrack'])
  .as('currentTrack')
  .use(middleware.auth())
