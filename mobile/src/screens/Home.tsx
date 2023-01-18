import { useId } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { DAY_SIZE, HabitDay } from '../components/HabitDay'
import { Header } from '../components/Header'
import { generateDateFromYearBeginning } from '../utils/generate-dates-from-year-beginning'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const summaryDates = generateDateFromYearBeginning()

const MINIMUM_SUMMARY_DATES_SIZE = 18 * 5
const amountOfDaysToFill = MINIMUM_SUMMARY_DATES_SIZE + summaryDates.length

export function Home() {
  const id = useId()

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekDay, index) => {
          return (
            <Text
              className="text-zinc-400 text-xl font-bold text-center mx-1"
              key={`${weekDay}-${index}-${id}`}
              style={styles.text}
            >
              {weekDay}
            </Text>
          )
        })}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <View className="flex-row flex-wrap">
          {summaryDates.map((date) => {
            return <HabitDay key={date.toISOString()} />
          })}

          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, index) => {
              return (
                <View
                  key={`${index}-${id}`}
                  style={styles.box}
                  className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                />
              )
            })}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    height: DAY_SIZE,
    width: DAY_SIZE,
  },
  scrollView: {
    paddingBottom: 100,
  },
  text: {
    width: DAY_SIZE,
  },
})
