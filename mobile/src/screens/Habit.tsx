import { useRoute } from '@react-navigation/native'
import dayjs from 'dayjs'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { BackButton } from '../components/BackButton'
import { Checkbox } from '../components/Checkbox'
import { ProgressBar } from '../components/ProgressBar'

type HabitParams = {
  date: string
}

export function Habit() {
  const route = useRoute()

  const { date } = route.params as HabitParams

  const parsedDate = dayjs(date)
  const dayOfWeek = parsedDate.format('dddd')
  const dayAndMonth = parsedDate.format('DD/MM')

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

        <ProgressBar progress={60} />

        <View className="mt-6">
          <Checkbox title="Beber 2L de água" checked />
          <Checkbox title="Exercitar" checked={false} />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 100,
  },
})
