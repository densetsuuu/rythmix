import { inject } from '@adonisjs/core'
import SpotifyService from '#services/spotify_service'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class SpotifyController {
  constructor(private _spotifyService: SpotifyService) {}

  async getCurrentTrack({ auth }: HttpContext) {
    const user = await auth.getUserOrFail()
    return await this._spotifyService.getCurrentTrack(user)
  }
}
