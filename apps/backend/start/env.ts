/*
|--------------------------------------------------------------------------
| Environment variables service
|--------------------------------------------------------------------------
|
| The `Env.create` method creates an instance of the Env service. The
| service validates the environment variables and also cast values
| to JavaScript data types.
|
*/

import { Env } from '@adonisjs/core/env'

const isTestEnv = process.env.NODE_ENV === 'test'

export default await Env.create(new URL('../', import.meta.url), {
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  APP_URL: Env.schema.string.optionalWhen(isTestEnv, {
    format: 'url',
    protocol: false,
    tld: false,
  }),
  HOST: Env.schema.string({ format: 'host' }),
  LOG_LEVEL: Env.schema.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),

  /*
  |----------------------------------------------------------
  | Variables for configuring database connection
  |----------------------------------------------------------
  */
  DB_HOST: Env.schema.string.optionalWhen(isTestEnv, { format: 'host' }),
  DB_PORT: Env.schema.number.optionalWhen(isTestEnv),
  DB_USER: Env.schema.string.optionalWhen(isTestEnv),
  DB_PASSWORD: Env.schema.string.optionalWhen(isTestEnv),
  DB_DATABASE: Env.schema.string.optionalWhen(isTestEnv),

  /*
  |----------------------------------------------------------
  | Variables for configuring session package
  |----------------------------------------------------------
  */
  SESSION_DRIVER: Env.schema.enum(['cookie', 'memory'] as const),

  /*
  |----------------------------------------------------------
  | Variables for configuring ally package
  |----------------------------------------------------------
  */
  SPOTIFY_CLIENT_ID: Env.schema.string.optionalWhen(isTestEnv),
  SPOTIFY_CLIENT_SECRET: Env.schema.string.optionalWhen(isTestEnv),
})
