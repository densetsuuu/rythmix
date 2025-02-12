import type { MakeTuyauRequest, MakeTuyauResponse } from '@tuyau/utils/types'
import type { InferInput } from '@vinejs/vine/types'

type AuthLoginPost = {
  request: MakeTuyauRequest<InferInput<typeof import('../app/validators/auth.ts')['loginValidator']>>
  response: MakeTuyauResponse<
    import('../app/controllers/auth_controller.ts').default['login'],
    true
  >
}
type AuthLogoutPost = {
  request: unknown
  response: MakeTuyauResponse<
    import('../app/controllers/auth_controller.ts').default['logout'],
    false
  >
}
type AuthMeGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/auth_controller.ts').default['me'], false>
}
type SpotifyRedirectGetHead = {
  request: MakeTuyauRequest<InferInput<typeof import('../app/validators/spotify_auth.ts')['spotifyRedirectValidator']>>
  response: MakeTuyauResponse<import('../app/controllers/spotify_auth_controller.ts').default['redirect'],
    true
  >
}
type SpotifyCallbackGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/spotify_auth_controller.ts').default['callback'],
    false
  >
}
type UsersGetHead = {
  request: unknown
  response: MakeTuyauResponse<
    import('../app/controllers/users_controller.ts').default['index'],
    false
  >
}
type UsersPost = {
  request: MakeTuyauRequest<InferInput<typeof import('../app/validators/auth.ts')['registerValidator']>>
  response: MakeTuyauResponse<
    import('../app/controllers/users_controller.ts').default['store'],
    true
  >
}
type UsersIdGetHead = {
  request: unknown
  response: MakeTuyauResponse<
    import('../app/controllers/users_controller.ts').default['show'],
    false
  >
}
type UsersIdPutPatch = {
  request: unknown
  response: MakeTuyauResponse<
    import('../app/controllers/users_controller.ts').default['update'],
    false
  >
}
type UsersIdDelete = {
  request: unknown
  response: MakeTuyauResponse<
    import('../app/controllers/users_controller.ts').default['destroy'],
    false
  >
}
type UsersIdFriendsGetHead = {
  request: MakeTuyauRequest<
    InferInput<(typeof import('../app/validators/friend.ts'))['userFriendsRequestValidator']>
  >
  response: MakeTuyauResponse<
    import('../app/controllers/friends_controller.ts').default['index'],
    true
  >
}
type UsersIdFriendsPost = {
  request: MakeTuyauRequest<
    InferInput<(typeof import('../app/validators/friend.ts'))['sendFriendRequestValidator']>
  >
  response: MakeTuyauResponse<
    import('../app/controllers/friends_controller.ts').default['store'],
    true
  >
}
type UsersIdFriendsIdGetHead = {
  request: unknown
  response: MakeTuyauResponse<
    import('../app/controllers/friends_controller.ts').default['show'],
    false
  >
}
type UsersIdFriendsIdPutPatch = {
  request: MakeTuyauRequest<
    InferInput<(typeof import('../app/validators/friend.ts'))['answerFriendRequestValidator']>
  >
  response: MakeTuyauResponse<
    import('../app/controllers/friends_controller.ts').default['update'],
    true
  >
}
type UsersIdFriendsIdDelete = {
  request: MakeTuyauRequest<
    InferInput<(typeof import('../app/validators/friend.ts'))['accessUserFriendDetailsValidator']>
  >
  response: MakeTuyauResponse<
    import('../app/controllers/friends_controller.ts').default['destroy'],
    true
  >
}
type CurrentTrackGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/spotify_controller.ts').default['getCurrentTrack']>
}
export interface ApiDefinition {
  auth: {
    login: {
      $url: {}
      $post: AuthLoginPost
    }
    logout: {
      $url: {}
      $post: AuthLogoutPost
    }
    me: {
      $url: {}
      $get: AuthMeGetHead
      $head: AuthMeGetHead
    }
  }
  spotify: {
    redirect: {
      $url: {}
      $get: SpotifyRedirectGetHead
      $head: SpotifyRedirectGetHead
    }
    callback: {
      $url: {}
      $get: SpotifyCallbackGetHead
      $head: SpotifyCallbackGetHead
    }
  }
  users: {
    '$url': {}
    '$get': UsersGetHead
    '$head': UsersGetHead
    '$post': UsersPost
    ':id': {
      '$url': {
      };
      '$get': UsersIdGetHead;
      '$head': UsersIdGetHead;
      '$put': UsersIdPutPatch;
      '$patch': UsersIdPutPatch;
      '$delete': UsersIdDelete;
      friends: {
        '$url': {}
        '$get': UsersIdFriendsGetHead
        '$head': UsersIdFriendsGetHead
        '$post': UsersIdFriendsPost
        ':friendId': {
          $url: {}
          $get: UsersIdFriendsIdGetHead
          $head: UsersIdFriendsIdGetHead
          $put: UsersIdFriendsIdPutPatch
          $patch: UsersIdFriendsIdPutPatch
          $delete: UsersIdFriendsIdDelete
        }
      }
    };
  };
  'currentTrack': {
    '$url': {
    };
    '$get': CurrentTrackGetHead;
    '$head': CurrentTrackGetHead;
  };
}
const routes = [
  {
    params: [],
    name: 'auth.login',
    path: '/auth/login',
    method: ["POST"],
    types: {} as AuthLoginPost,
  },
  {
    params: [],
    name: 'auth.logout',
    path: '/auth/logout',
    method: ["POST"],
    types: {} as AuthLogoutPost,
  },
  {
    params: [],
    name: 'auth.me',
    path: '/auth/me',
    method: ["GET","HEAD"],
    types: {} as AuthMeGetHead,
  },
  {
    params: [],
    name: 'spotify.redirect',
    path: '/spotify/redirect',
    method: ["GET","HEAD"],
    types: {} as SpotifyRedirectGetHead,
  },
  {
    params: [],
    name: 'spotify.callback',
    path: '/spotify/callback',
    method: ["GET","HEAD"],
    types: {} as SpotifyCallbackGetHead,
  },
  {
    params: [],
    name: 'test',
    path: '/test',
    method: ["GET","HEAD"],
    types: {} as TestGetHead,
  },
  {
    params: [],
    name: 'users.index',
    path: '/users',
    method: ["GET","HEAD"],
    types: {} as UsersGetHead,
  },
  {
    params: [],
    name: 'users.store',
    path: '/users',
    method: ["POST"],
    types: {} as UsersPost,
  },
  {
    params: ["id"],
    name: 'users.show',
    path: '/users/:id',
    method: ["GET","HEAD"],
    types: {} as UsersIdGetHead,
  },
  {
    params: ["id"],
    name: 'users.update',
    path: '/users/:id',
    method: ["PUT","PATCH"],
    types: {} as UsersIdPutPatch,
  },
  {
    params: ['id'],
    name: 'users.destroy',
    path: '/users/:id',
    method: ['DELETE'],
    types: {} as UsersIdDelete,
  },
  {
    params: ['id'],
    name: 'users.friends.index',
    path: '/users/:id/friends',
    method: ['GET', 'HEAD'],
    types: {} as UsersIdFriendsGetHead,
  },
  {
    params: ['id'],
    name: 'users.friends.store',
    path: '/users/:id/friends',
    method: ['POST'],
    types: {} as UsersIdFriendsPost,
  },
  {
    params: ['id', 'friendId'],
    name: 'users.friends.show',
    path: '/users/:id/friends/:friendId',
    method: ['GET', 'HEAD'],
    types: {} as UsersIdFriendsIdGetHead,
  },
  {
    params: ['id', 'friendId'],
    name: 'users.friends.update',
    path: '/users/:id/friends/:friendId',
    method: ['PUT', 'PATCH'],
    types: {} as UsersIdFriendsIdPutPatch,
  },
  {
    params: ['id', 'friendId'],
    name: 'users.friends.destroy',
    path: '/users/:id/friends/:friendId',
    method: ['DELETE'],
    types: {} as UsersIdFriendsIdDelete,
  },
  {
    params: [],
    name: 'currentTrack',
    path: '/currentTrack',
    method: ['GET', 'HEAD'],
    types: {} as CurrentTrackGetHead,
  },
] as const
export const api = {
  routes,
  definition: {} as ApiDefinition,
}
