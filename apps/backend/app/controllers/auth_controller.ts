import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import UserDto from '#dtos/user'

import { loginValidator } from '#validators/auth'

export default class AuthController {
  async login({ request, auth, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)

    return User.accessTokens.create(user)
  }

  async me({ auth, response, request }: HttpContext) {
    const user = auth.getUserOrFail()
    await user.load('profile')
    return new UserDto(user)
  }

  async logout({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    return { message: 'success' }
  }
}
