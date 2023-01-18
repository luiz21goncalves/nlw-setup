import cors from '@fastify/cors'
import Fastify from 'fastify'

import { appRoutes } from './routes'

const PORT = 3333

const app = Fastify()

app.register(cors)
app.register(appRoutes)

app.listen({
  port: PORT
}).then(url => {
  console.log(`HTTP Server running on ${url}`)
})
