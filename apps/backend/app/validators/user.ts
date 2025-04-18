import vine from '@vinejs/vine'

export const USER_ID_SHAPE = vine.number()

export const userNestedResourceObject = vine.object({
  params: vine.object({
    id: USER_ID_SHAPE,
  }),
})

export const userEditValidator = vine.compile(
  vine.object({
    description: vine.string(),
  })
)
