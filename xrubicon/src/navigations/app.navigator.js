import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from '../scenes/register';
import Verification from '../scenes/verification';
import Dashboard from '../scenes/Dashboard';

const Stack = createStackNavigator();
const { Navigator, Screen } = Stack;

const AppNavigator = () => (
    <NavigationContainer>
        <Navigator headerMode="none" initialRouteName="Register">
            <Screen name="Register" component={ Register }></Screen>
            <Screen name="Verification" component={ Verification }></Screen>
            <Screen name="Dashboard" component={ Dashboard }></Screen>
        </Navigator>
    </NavigationContainer>
);

export default AppNavigator;