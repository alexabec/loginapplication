import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
const HomeStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: () => ({
            headerShown: false,
            gestureEnabled: false,
        }),
    },
    
    initialRouteName: 'Home',
});

const ProfileStack = createStackNavigator({
    Profile: {
        screen: ProfileScreen,
        navigationOptions: () => ({
            headerShown: false,
            gestureEnabled: false,
        }),
    },
    
    initialRouteName: 'Profile',
});

const SingleTabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-home" color={tintColor} size={20} />
            )
        }
    },
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-person" color={tintColor} size={20} />
            )
        }
    }
},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarOptions: {
                activeTintColor: '#bab9b6',
                inactiveTintColor: '#616161',
                style: {
                    backgroundColor: '#000',
                }
            },

        })
    }
);

const AppNavigator = createStackNavigator(
    {
        TabNavigator: {
            screen: SingleTabNavigator,
            navigationOptions:() => ({
                headerShown: false,
                gestureEnabled: false
            })
        },
        Login: {
            screen: LoginScreen,
            navigationOptions: () => ({
                headerShown: false,
                gestureEnabled: false,
            }),
        },
        
        // SignUp: {
        //     screen: CustomerSignUpScreen,
        //     navigationOptions: () => ({
        //         headerShown: false,
        //         gestureEnabled: false,
        //     }),
        // },
        initialRouteName: 'Login',
    });

const Application = createAppContainer(AppNavigator);

export default Application;