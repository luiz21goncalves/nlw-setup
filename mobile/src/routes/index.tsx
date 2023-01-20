import { NavigationContainer } from '@react-navigation/native'
import { QueryClientProvider } from '@tanstack/react-query'
import { View } from 'react-native'

import { queryClient } from '../lib/react-query'
import { AppRoutes } from './app.routes'

export function Routes() {
  return (
    <View className="flex-1 bg-background">
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <AppRoutes />
        </NavigationContainer>
      </QueryClientProvider>
    </View>
  )
}
