import type { HttpContext } from '@adonisjs/core/http'
import SpotifyAccount from '#models/spotify_account'
import UserService from '#services/user_service'
import { inject } from '@adonisjs/core'
import User from '#models/user'
import { spotifyRedirectValidator } from '#validators/spotify_auth'
import encryption from '@adonisjs/core/services/encryption'

interface State {
  redirectUri: string | null
  state: string
}

@inject()
export default class SpotifyAuthController {
  constructor(private userService: UserService) {}

  public async redirect({ ally, request }: HttpContext) {
    const { redirect_uri: redirectUri, state } =
      await request.validateUsing(spotifyRedirectValidator)
    const stateObject: State = { redirectUri, state }

    const encodedState = encryption.encrypt(JSON.stringify(stateObject))

    return await ally.use('spotify').redirect((redirectRequest) => {
      redirectRequest.scopes([
        'user-read-email',
        'user-read-private',
        'user-read-currently-playing',
      ])
      redirectRequest.param('state', encodedState)
    })
  }

  public async callback({ ally, request, response }: HttpContext) {
    const { state: encodedState } = request.all()

    const state: State = JSON.parse(encryption.decrypt(encodedState) || '')

    if (!state) {
      return response.badRequest('Invalid state')
    }

    const spotify = ally.use('spotify').stateless()
    if (spotify.accessDenied()) {
      response.abort('Access denied')
    }

    if (spotify.stateMisMatch()) {
      response.abort('Invalid state')
    }

    if (spotify.hasError()) {
      response.abort(spotify.getError() || 'Something went wrong')
    }

    const { emailVerificationState, token, original, ...spotifyUser } = await spotify.user()
    const spotifyAccount = await SpotifyAccount.updateOrCreate(
      {
        id: spotifyUser.id,
      },
      {
        ...spotifyUser,
        token,
      }
    )

    let userOwningSpotifyAccount =
      await this.userService.getUserOwningSpotifyAccount(spotifyAccount)

    if (!userOwningSpotifyAccount) {
      userOwningSpotifyAccount = await User.create({
        email: spotifyUser.email,
        username: spotifyUser.nickName,
        password: crypto.randomUUID(),
      })
    }

    await userOwningSpotifyAccount.related('profile').save(spotifyAccount)

    const userToken = await User.accessTokens.create(userOwningSpotifyAccount)
    response
      .redirect()
      .toPath(
        `${state.redirectUri}?access_token=${userToken.value!.release()}&state=${state.state}`
      )
  }
}
