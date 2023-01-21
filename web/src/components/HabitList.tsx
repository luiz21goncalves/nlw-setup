import * as Checkbox from '@radix-ui/react-checkbox'
import dayjs from 'dayjs'
import { Check } from 'phosphor-react'

import { useHabitInfoQuery } from '../queries/useHabitInfoQuery'
import { useToggleHabitMutation } from '../queries/useToogleHabitMutation'

type HabitListProps = {
  date: Date
}

export function HabitList(props: HabitListProps) {
  const { date } = props

  const { data: habitInfo } = useHabitInfoQuery(date.toISOString())
  const { mutate, isLoading } = useToggleHabitMutation()

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitInfo?.possibleHabits.map((habit) => {
        const isChecked = habitInfo.completedHabits.includes(habit.id)

        function onCheckedChange() {
          mutate({ date: date.toISOString(), habitId: habit.id })
        }

        return (
          <Checkbox.Root
            key={habit.id}
            className="flex items-center gap-3 group disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none"
            checked={isChecked}
            disabled={isDateInPast || isLoading}
            onCheckedChange={onCheckedChange}
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors  group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
              <Checkbox.Indicator>
                <Check size={20} weight="bold" className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400 transition-all">
              {habit.title}
            </span>
          </Checkbox.Root>
        )
      })}
    </div>
  )
}
