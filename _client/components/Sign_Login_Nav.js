import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator } from '@react-navigation/stack'
import signin from './Signin'
import Login from './login'
const stack = createStackNavigator()

const LoginStack = () => {
    return(
        <stack.Navigator headerMode='none'>
            <stack.Screen name='Log-In' component={Login} />
            <stack.Screen name='Sign-In' component={signin} />
        </stack.Navigator>
    )
}
const LoginNav = () => {
    return(
        <NavigationContainer>
            <LoginStack />
        </NavigationContainer>
    )
}
export default LoginNav