import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import UserService from '#services/user_service'
import { registerValidator } from '#validators/auth'

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

  async show({ params }: HttpContext) {}

  async update({ params, request }: HttpContext) {}

  async destroy({ params }: HttpContext) {}
}
