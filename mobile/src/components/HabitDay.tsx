import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

const WEEK_DAYS = 7
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5

export const DAY_MARGIN_BETWEEN = 8
export const DAY_SIZE =
  Dimensions.get('screen').width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5)

type HabitDayProps = TouchableOpacityProps

export function HabitDay(props: HabitDayProps) {
  return (
    <TouchableOpacity
      className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800"
      activeOpacity={0.7}
      style={styles.container}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    height: DAY_SIZE,
    width: DAY_SIZE,
  },
})
