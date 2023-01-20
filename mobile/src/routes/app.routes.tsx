import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack'

import { Habit } from '../screens/Habit'
import { Home } from '../screens/Home'
import { New } from '../screens/New'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator screenOptions={navigatorStyles}>
      <Screen name="home" component={Home} />
      <Screen name="habit" component={Habit} />
      <Screen name="new" component={New} />
    </Navigator>
  )
}

const navigatorStyles: NativeStackNavigationOptions = {
  headerShown: false,
}
