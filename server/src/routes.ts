import dayjs from 'dayjs'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from './lib/prisma'

export async function appRoutes (app: FastifyInstance): Promise<void> {
  app.post('/habits', async (request, replay) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6))
    })

    const { title, weekDays } = createHabitBody.parse(request.body)

    const today = dayjs().startOf('day').toDate()

    await prisma.habit.create({
      data: {
        created_at: today,
        title,
        weekDays: {
          create: weekDays.map(weekDay => {
            return { week_day: weekDay }
          })
        }
      }
    })

    return await replay.code(201).send()
  })

  app.get('/day', async (request) => {
    const getdayParams = z.object({ date: z.coerce.date() })

    const { date } = getdayParams.parse(request.query)

    const parsedDate = dayjs(date).startOf('day')
    const weekDay = parsedDate.get('day')

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date
        },
        weekDays: {
          some: {
            week_day: weekDay
          }
        }
      }
    })

    const day = await prisma.day.findUnique({
      include: {
        dayHabits: true
      },
      where: {
        date: parsedDate.toDate()
      }
    })

    const completedHabits = day?.dayHabits.map(dayHabit => {
      return dayHabit.habit_id
    })

    return { completedHabits, possibleHabits }
  })
}
