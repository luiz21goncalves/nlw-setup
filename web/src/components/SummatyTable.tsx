import { useId } from 'react'

import { generateDateFromYearBeginning } from '../utils/generate-dates-from-year-beginning'
import { HabitDay } from './HabitDay'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateDateFromYearBeginning()

const MINIMUM_SUMMARY_DATES_SIZE = 18 * 7
const amountOfDayToFill = MINIMUM_SUMMARY_DATES_SIZE - summaryDates.length

export function SummaryTable() {
  const id = useId()

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekday, index) => {
          return (
            <div
              key={`${weekday}-${index}-${id}`}
              className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center"
            >
              {weekday}
            </div>
          )
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((date) => {
          return <HabitDay key={date.toISOString()} />
        })}

        {amountOfDayToFill > 0 &&
          Array.from({ length: amountOfDayToFill }).map((_, index) => {
            return (
              <div
                key={`${index}-${id}`}
                className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
              />
            )
          })}
      </div>
    </div>
  )
}
