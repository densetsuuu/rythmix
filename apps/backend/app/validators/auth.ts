import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(2).maxLength(20),
    email: vine
      .string()
      .maxLength(254)
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const exists = await db.from('users').where('email', value).select('id').first()
        return !exists
      }),
    password: vine
      .string()
      .minLength(8)
      .trim()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!-%*?&])[A-Za-z\d@$!-%*?&]{8,}$/)
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim().normalizeEmail(),
    password: vine.string().trim(),
  })
)
