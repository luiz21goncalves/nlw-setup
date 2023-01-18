import { ActivityIndicator, StyleSheet, View } from 'react-native'

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#7c3aed" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#09090a',
    flex: 1,
    justifyContent: 'center',
  },
})
