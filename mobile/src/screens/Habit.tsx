import { useRoute } from '@react-navigation/native'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { BackButton } from '../components/BackButton'
import { Checkbox } from '../components/Checkbox'
import { HabitsEmpty } from '../components/HabitsEmpty'
import { Loading } from '../components/Loading'
import { ProgressBar } from '../components/ProgressBar'
import { useHabitInfoQuery } from '../queries/useHabitInfoQuery'
import { useToggleHabitMutation } from '../queries/useToogleHabitMutation'
import { generateProgressPercentage } from '../utils/generate-progress-percentage'

type HabitParams = {
  date: string
}

export function Habit() {
  const route = useRoute()

  const { date } = route.params as HabitParams

  const { data: habitsInfo, isLoading } = useHabitInfoQuery(date)
  const { mutateAsync } = useToggleHabitMutation()

  const parsedDate = dayjs(date)
  const dayOfWeek = parsedDate.format('dddd')
  const dayAndMonth = parsedDate.format('DD/MM')

  const isDateInPast = parsedDate.endOf('day').isBefore(new Date())

  const amount = habitsInfo?.possibleHabits.length ?? 0
  const completed = habitsInfo?.completedHabits.length ?? 0

  const progress = generateProgressPercentage(amount, completed)

  if (isLoading) {
    return <Loading />
  }

  const hasHabitList =
    habitsInfo?.possibleHabits && habitsInfo.possibleHabits?.length > 0

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={progress} />

        <View className={clsx('mt-6', { 'opacity-50': isDateInPast })}>
          {hasHabitList ? (
            habitsInfo?.possibleHabits.map((habit) => {
              const isChecked = habitsInfo.completedHabits.includes(habit.id)

              async function onPress() {
                await mutateAsync({ date, habitId: habit.id })
              }

              return (
                <Checkbox
                  key={habit.id}
                  title={habit.title}
                  checked={isChecked}
                  onPress={onPress}
                  disabled={isDateInPast}
                />
              )
            })
          ) : (
            <HabitsEmpty />
          )}
        </View>

        {isDateInPast && (
          <Text className="text-white mt-10 text-center">
            Você não pode editar hábitos de uma data passada.
          </Text>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 100,
  },
})
