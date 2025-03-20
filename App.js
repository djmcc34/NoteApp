// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NoteListScreen from './src/screens/NoteListScreen';
// Import NoteDetailScreen when you implement it
import NoteDetailScreen from './src/screens/NoteDetailScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NoteList">
        <Stack.Screen
          name="NoteList"
          component={NoteListScreen}
          options={{ title: 'My Notes' }}
        />
        {
        <Stack.Screen
          name="NoteDetail"
          component={NoteDetailScreen}
          options={{ title: 'Note Details' }}
        />
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
