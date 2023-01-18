import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'
import Fastify from 'fastify'

const PORT = 3333

const app = Fastify()
const prisma = new PrismaClient()

app.register(cors)

app.get('/', async () => {
  const habits = await prisma.habit.findMany()

  return { habits }
})

app.listen({
   port: PORT
}).then(url => {
  console.log(`HTTP Server running on ${url}`)
})
