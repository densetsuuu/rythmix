import env from '#start/env'
import { defineConfig, services } from '@adonisjs/ally'

const allyConfig = defineConfig({
  spotify: services.spotify({
    clientId: env.get('SPOTIFY_CLIENT_ID') || '',
    clientSecret: env.get('SPOTIFY_CLIENT_SECRET') || '',
    callbackUrl: `${env.get('APP_URL')}/spotify/callback`,
    scopes: ['user-read-email', 'streaming'],
    showDialog: true,
  }),
})

export default allyConfig

declare module '@adonisjs/ally/types' {
  interface SocialProviders extends InferSocialProviders<typeof allyConfig> {}
}
