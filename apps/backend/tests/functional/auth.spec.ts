import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import app from '@adonisjs/core/services/app'
import UserService from '#services/user_service'
import { ApiClient } from '@japa/api-client'

async function setup(client: ApiClient) {
  const userService = await app.container.make(UserService)
  const userPayload = {
    username: 'test',
    email: 'test@test.com',
    password: 'Test123*',
    confirmPassword: 'Test123*',
  }

  const registerResponse = await client.post('/users').json(userPayload)

  return { userService, userPayload, registerResponse }
}

test.group('Auth', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('should not be able to register with an already existing email', async ({ client }) => {
    const { userPayload } = await setup(client)

    const response = await client.post('/users').fields(userPayload)
    response.assertStatus(422)
  })

  test('should be able to login with the correct credentials', async ({ client, assert }) => {
    const { userPayload } = await setup(client)

    const response = await client.post('auth/login').json({
      email: userPayload.email,
      password: userPayload.password,
    })
    response.assertStatus(200)
    assert.exists(response.body().token)
  })

  test('should not be able to login with the wrong credentials', async ({ client }) => {
    const { userPayload } = await setup(client)

    const response = await client.post('auth/login').json({
      email: userPayload.email,
      password: 'wrongpassword',
    })
    response.assertStatus(400)
    response.assertTextIncludes('Invalid user credentials')
  })
})
