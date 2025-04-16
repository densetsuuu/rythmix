import vine from '@vinejs/vine'

export const spotifyTrackValidator = vine.compile(
  vine.object({
    trackId: vine.string().trim().maxLength(255),
  })
)
