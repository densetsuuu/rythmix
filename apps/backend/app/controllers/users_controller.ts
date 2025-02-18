import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import UserService from '#services/user_service'
import { registerValidator } from '#validators/auth'
import logger from '@adonisjs/core/services/logger'
import {userEditValidator} from "#validators/user";

@inject()
export default class UsersController {
  constructor(private _userService: UserService) {}

  async index({}: HttpContext) {
    return await this._userService.all()
  }

  async store({ request, session, response }: HttpContext) {
    const data = await request.validateUsing(registerValidator)

    const user = await this._userService.create(data)

    session.flash('success', 'Successfully registered')
  }

  async show({ params, response }: HttpContext) {
    const user = await this._userService.find(params.id)
    if (!user) {
      return response.status(404).json({ message: 'User not found' })
    }
    return response.json(user)
  }

  async update({ request, auth, response }: HttpContext) {
    const user = await auth.authenticate()
    const { description } = await request.validateUsing(userEditValidator)
    logger.info(request.body())
    logger.info(description)
    await this._userService.update(user, { description: description })
  }

  async destroy({ params, response }: HttpContext) {
    const deleted = await this._userService.delete(params.id)
    if (!deleted) {
      return response.status(404).json({ message: 'User not found or not deleted' })
    }
    return response.json({ message: 'User deleted successfully' })
  }
}
