
import { NavigationContainer } from '@react-navigation/native'
import { View } from 'react-native'
import { AppRoutes } from './app.routes'

export function Routes() {
  return (
    /*A estilização dessa view, vai manter a transição da navegação
    com a mesma cor de background */
    <View className='flex-1 bg-background'>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </View>
  )
}