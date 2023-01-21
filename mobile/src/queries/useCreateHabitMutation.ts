import { useMutation } from '@tanstack/react-query'

import { api } from '../lib/axios'

type CreateHabitData = {
  title: string
  weekDays: number[]
}

export const useCreateHabitMutation = () => {
  return useMutation({
    mutationFn: (data: CreateHabitData) => {
      const { title, weekDays } = data

      return api.post('/habits', { title, weekDays })
    },
  })
}
