import { QueryFunctionContext, useQuery } from '@tanstack/react-query'

import { api } from '../lib/axios'

export type HabitsInfo = {
  possibleHabits: Array<{
    id: string
    title: string
    created_at: string
  }>
  completedHabits: string[]
}

const getHabitInfo = async (context: QueryFunctionContext) => {
  const [, date] = context.queryKey

  const response = await api.get<HabitsInfo>('/day', { params: { date } })

  return response.data
}

export const useHabitInfoQuery = (date: string) => {
  return useQuery({ queryFn: getHabitInfo, queryKey: ['day', date] })
}
