import cors from '@fastify/cors'
import Fastify from 'fastify'

import { appRoutes } from './routes'

const PORT = 3333

const app = Fastify()

app.register(cors)
app.register(appRoutes)

app.listen({
  host: '0.0.0.0',
  port: PORT
}).then(url => {
  console.log(`HTTP Server running on ${url}`)
})
