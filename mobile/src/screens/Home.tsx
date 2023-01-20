import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import { useId } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'

import { DAY_SIZE, HabitDay } from '../components/HabitDay'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import { useSummaryQuery } from '../queries/useSummaryQuery'
import { generateDateFromYearBeginning } from '../utils/generate-dates-from-year-beginning'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const summaryDates = generateDateFromYearBeginning()

const MINIMUM_SUMMARY_DATES_SIZE = 18 * 5
const amountOfDaysToFill = MINIMUM_SUMMARY_DATES_SIZE + summaryDates.length

export function Home() {
  const id = useId()

  const navigation = useNavigation()

  const { data: summary, error, isError, isLoading } = useSummaryQuery()

  function handleNavigateToHabit(date: string) {
    navigation.navigate('habit', { date })
  }

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    Alert.alert('Ops', 'Não foi possível carregar o sumário de hábitos.')
    console.error(JSON.stringify(error))
  }

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
            const dayInSummary = summary?.find((day) => {
              return dayjs(date).isSame(day.date, 'day')
            })

            function onPress() {
              handleNavigateToHabit(date.toISOString())
            }

            return (
              <HabitDay
                key={date.toISOString()}
                onPress={onPress}
                amount={dayInSummary?.amount}
                completed={dayInSummary?.completed}
                date={date}
              />
            )
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
