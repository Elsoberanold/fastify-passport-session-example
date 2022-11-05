import * as dotenv from 'dotenv'
import { buildApp } from './app'

dotenv.config()

const app = buildApp(true)

const PORT = process.env.API_PORT as number | undefined|| 4000

app
  .listen({
    port: PORT,
  })
  .then((serverUrl) => {
    app.log.info(`Serving at ${serverUrl}`)
  })
  .catch((err) => {
    app.log.error(err)
    process.exit(1)
  })