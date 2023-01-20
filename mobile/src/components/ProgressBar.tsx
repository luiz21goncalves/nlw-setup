import { StyleProp, View, ViewStyle } from 'react-native'

type ProgressBarProps = {
  progress?: number
}

export function ProgressBar(props: ProgressBarProps) {
  const { progress = 0 } = props

  const progressStyles = getProgressStyles(progress)

  return (
    <View className="w-full h-3 rounded-xl bg-zinc-700 mt-4">
      <View className="h-3 rounded-xl bg-violet-600" style={progressStyles} />
    </View>
  )
}

const getProgressStyles = (progress: number): StyleProp<ViewStyle> => {
  return { width: `${progress}%` }
}
