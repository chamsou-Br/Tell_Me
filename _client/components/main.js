import React , {useState} from 'react'
import {createBottomTabNavigator , BottomTabBar ,BottomTabScreenProps,BottomTabView} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {colors, Icon, SearchBar} from 'react-native-elements'
import {Animated , View , Dimensions,Text} from 'react-native'
import Compte from './compte'
import Messenger from './messenger'
import Recherche from './recherche'
import Saraha from './saraha'
import ModifyInfo from './modifyinfo'
import sendSaraha from './sendSaraha'
import ComponentRech from './ComponentRech'
import saraha from './saraha'

const tab = createBottomTabNavigator()
const stack = createStackNavigator()



const CompteNav = () => {
    return(
        <stack.Navigator screenOptions={{
            headerStyle : {
                backgroundColor : '#FFF',
                borderBottomWidth : 2,
                borderColor : '#000'
            },
         headerTintColor : '#000'
        }
        }>
            <stack.Screen component={Compte} options={{headerTitleStyle : {letterSpacing : 1 , fontWeight : 'bold'}}} name='compte' />
            <stack.Screen component={ModifyInfo} name='Modify Personal Info' />
        </stack.Navigator>
    )
}

const RechercheNav = () => {
    return(
        <stack.Navigator headerMode='none' >
            <stack.Screen component={Recherche}   name='Recherche' />
        </stack.Navigator>
    )
}
const SarahaNav = () => {
    return(
        <stack.Navigator  >
            <stack.Screen component={saraha}   name='Saraha' />
        </stack.Navigator>
    )
}

const TabNav = () => {
    return(
        <tab.Navigator //tabBar={(props) => <CustomBottomBar {...props} />} 
      tabBarOptions={{
            activeTintColor : '#BD1E51' ,
            activeBackgroundColor : '#FFF' ,
            labelStyle : {
                marginBottom : 10,
                fontWeight : 'bold',
                letterSpacing : 1.2,
            },
            iconStyle : {
                marginTop : 8,
            },
            style : {
                height : 60 ,
                backgroundColor : '#FFF' ,
               
            },
        }}>
            <tab.Screen name='compte' component={CompteNav} options={{ tabBarIcon : ({focused}) => {
                const   Color = focused ? '#BD1E51' : '#000' ;
                return <Icon name='home' size={24} color={Color} /> 
            }}} />
            <tab.Screen name='messages' component={Messenger} options={{ tabBarIcon : ({focused}) => {
                let color = focused ? '#BD1E51' : null ;
                return <Icon name='comment' size={24} color={color} /> 
            }}} />
            <tab.Screen name="recherche"  component={RechercheNav} options={{ tabBarIcon : ({focused}) => {
                let color = focused ? '#BD1E51' : null ;
                return <Icon name='search' size={24} color={color} /> 
            }}} />
            <tab.Screen name='saraha' component={SarahaNav} options={{ tabBarIcon : ({focused}) => {
                let color = focused ? '#BD1E51' : null ;
                return <Icon name='send' size={24} color={color} /> 
            }}} />
        </tab.Navigator>
    )
}

const Main =() => {
    return(
        <NavigationContainer>
            <TabNav />
        </NavigationContainer>
    )
}
export default Main