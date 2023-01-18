import dayjs from 'dayjs'

export function generateDateFromYearBeginning() {
  const today = dayjs()
  const firstDayOfTheYear = today.startOf('year')

  const daysQuantityUntilToday = today.diff(firstDayOfTheYear, 'day') + 1

  const dates = Array.from({ length: daysQuantityUntilToday }).map(
    (_, index) => {
      return firstDayOfTheYear.add(index, 'day').toDate()
    },
  )

  return dates
}
