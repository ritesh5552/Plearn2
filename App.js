import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Toast from 'react-native-toast-message';

import UserScreen from './screens/UserScreen';
import UserDetailScreen from './screens/UserDetailScreen';
import ScoreCard from './screens/ScoreCard';

const Stack = createStackNavigator();

  
function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
       
        headerShown: false
          
        }}>
    
      <Stack.Screen 
        name="UserScreen" 
        component={UserScreen} 
        options={{    title: 'Categories' }}
      />
      <Stack.Screen 
       name="UserDetailScreen" 
       
       component={UserDetailScreen} 
       options={{  title: 'Quiz'
       }}
      />
      <Stack.Screen 
       name="ScoreCard" 
       
       component={ScoreCard} 
       options={{  title: 'ScoreCard', headerLeft: null,
       }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
    
  );
 
}
