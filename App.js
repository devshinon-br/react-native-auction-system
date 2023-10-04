import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ItemDeLeilaoList from './screens/leilao/ItemDeLeilaoList';
import ItemDeLeilaoDetail from './screens/leilao/ItemDeLeilaoDetail';
import CreateParticipantScreen from './screens/participant/CreateParticipantScreen';
import ParticipantListScreen from './screens/participant/ParticipantListScreen';
import ParticipantDetailScreen from './screens/participant/ParticipantDetailScreen';
import HomeScreen from './screens/HomeScreen';
import LanceListScreen from './screens/lances/LanceListScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="ItemDeLeilaoList" component={ItemDeLeilaoList} options={{ title: 'Lista dos items de leilão' }} />
        <Stack.Screen name="ItemDetail" component={ItemDeLeilaoDetail} options={{ title: 'Detalhes do item de Leilão' }} />
        <Stack.Screen name="CreateParticipant" component={CreateParticipantScreen} options={{ title: 'Criação de um participante' }} />
        <Stack.Screen name="ParticipantDetail" component={ParticipantDetailScreen} options={{ title: 'Detalhes de um participante' }} />
        <Stack.Screen name="ParticipantList" component={ParticipantListScreen} options={{ title: 'Lista de Participantes' }} />
        <Stack.Screen name="LancesList" component={LanceListScreen} options={{ title: 'Lista de Lances' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
