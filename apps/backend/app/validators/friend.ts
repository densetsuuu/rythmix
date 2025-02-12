import vine from '@vinejs/vine'
import { USER_ID_SHAPE } from '#validators/user'
import { FRIEND_STATUSES } from '#services/friends_service'

export const friendRequestObject = vine.object({
  params: vine.object({
    id: USER_ID_SHAPE,
    friendId: USER_ID_SHAPE,
  }),
})

export const sendFriendRequestValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: USER_ID_SHAPE,
    }),
    friendId: USER_ID_SHAPE,
  })
)

export const answerFriendRequestValidator = vine.compile(
  vine.object({
    ...friendRequestObject.getProperties(),
    action: vine.enum(['accept', 'reject']),
  })
)

export const userFriendsRequestValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: USER_ID_SHAPE,
    }),
    status: vine.enum(FRIEND_STATUSES).optional(),
  })
)

export const accessUserFriendDetailsValidator = vine.compile(friendRequestObject)
