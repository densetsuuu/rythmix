import vine from '@vinejs/vine'

export const USER_ID_SHAPE = vine.number()

export const userNestedResourceObject = vine.object({
  params: vine.object({
    user_id: USER_ID_SHAPE,
  }),
})
