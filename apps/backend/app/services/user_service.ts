import User from '#models/user'
import { Infer } from '@vinejs/vine/types'
import { registerValidator } from '#validators/auth'
import SpotifyAccount from '#models/spotify_account'

type RegisterParams = Infer<typeof registerValidator>

export default class UserService {
  all() {
    return User.all()
  }

  create(data: RegisterParams) {
    return User.create(data)
  }

  async find(id: string | number) {
    return await User.findOrFail(id)
  }

  update(user: User, data: User) {
    user.merge(data)
    return user.save()
  }

  async getUserOwningSpotifyAccount(spotifyAccount: SpotifyAccount) {
    if (!spotifyAccount.userId) {
      return null
    }
    return this.find(spotifyAccount.userId)
  }
}
