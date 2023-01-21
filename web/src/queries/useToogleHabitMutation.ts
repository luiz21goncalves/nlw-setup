import { useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'

import { api } from '../lib/axios'
import { HabitsInfo } from './useHabitInfoQuery'
import { Summary } from './useSummaryQuery'

type ToggleHabitMutationData = {
  habitId: string
  date: string
}

const patchToggleHabit = async (habitId: string) => {
  await api.patch(`/habits/${habitId}/toggle`)
}

export const useToggleHabitMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ToggleHabitMutationData) => {
      const { habitId } = data
      return patchToggleHabit(habitId)
    },
    onSuccess(_, variables) {
      const { date, habitId } = variables
      let completedAmountOfHabits = 0

      queryClient.setQueryData<HabitsInfo>(['day', date], (habitsInfo) => {
        if (habitsInfo && habitsInfo.completedHabits) {
          const isHabitAlreadyCompleted =
            habitsInfo?.completedHabits.includes(habitId)

          let completedHabits: string[] = []

          if (isHabitAlreadyCompleted) {
            completedHabits = habitsInfo.completedHabits.filter(
              (id) => id !== habitId,
            )
          } else {
            completedHabits = [...habitsInfo?.completedHabits, habitId]
          }

          completedAmountOfHabits = completedHabits.length

          return { ...habitsInfo, completedHabits }
        }

        return habitsInfo
      })

      queryClient.setQueryData<Summary>(['summary'], (summary) => {
        if (summary && summary.length > 0) {
          const updatedSummary = summary.map((day) => {
            const isDayInSummary = dayjs(date).isSame(day.date, 'day')

            if (isDayInSummary) {
              return { ...day, completed: completedAmountOfHabits }
            }

            return day
          })

          return updatedSummary
        }

        return summary
      })
    },
  })
}
