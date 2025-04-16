import User from '#models/user'

export default class SpotifyService {
  async getCurrentTrack(user: User) {
    await user.load('profile')
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${user.profile.token.token}`,
      },
    })
    return await response.json()
  }
}

