/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import { zodResolver } from '@hookform/resolvers/zod'
import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useCreateHabitMutation } from '../queries/useCreateHabitMutation'

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

const newHabitFormSchema = z.object({
  title: z.string().min(2),
  weekDays: z.array(z.number().min(0).max(6)).max(7),
})

type NewHabitFormData = z.infer<typeof newHabitFormSchema>

function toggleWeekDay(weekdays: number[], weekday: number) {
  if (weekdays.includes(weekday)) {
    const updatedWeekDays = weekdays.filter((day) => day !== weekday)

    return updatedWeekDays
  }

  const updatedWeekDays = [...weekdays, weekday]

  return updatedWeekDays
}

export function NewHabitForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<NewHabitFormData>({
    defaultValues: {
      title: '',
      weekDays: [],
    },
    resolver: zodResolver(newHabitFormSchema),
  })

  const { mutateAsync } = useCreateHabitMutation()

  async function handleCreateNewHabit(data: NewHabitFormData) {
    const { title, weekDays } = data

    await mutateAsync({ title, weekDays })
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateNewHabit)}
      className="w-full flex flex-col mt-6"
    >
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="ex.: Exercícios, dormir bem, etc..."
        autoFocus
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        {...register('title')}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrêcia?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map((weekDay, index) => {
          return (
            <Controller
              key={weekDay}
              name={`weekDays`}
              control={control}
              render={({ field }) => {
                return (
                  <Checkbox.Root
                    className="flex items-center gap-3 group focus:outline-none"
                    checked={field.value.includes(index)}
                    onCheckedChange={() => {
                      const weekDays = toggleWeekDay(field.value, index)
                      field.onChange(weekDays)
                    }}
                  >
                    <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900">
                      <Checkbox.Indicator>
                        <Check size={20} weight="bold" className="text-white" />
                      </Checkbox.Indicator>
                    </div>

                    <span className=" text-white leading-tight">{weekDay}</span>
                  </Checkbox.Root>
                )
              }}
            />
          )
        })}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        disabled={isSubmitting}
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}
