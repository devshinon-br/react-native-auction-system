import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToItemDeLeilaoList = () => {
    navigation.navigate('ItemDeLeilaoList');
  };

  const navigateToParticipantList = () => {
    navigation.navigate('ParticipantList');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao App de Leilão</Text>
      <View style={styles.buttonContainer}>
        <Button title="Itens de Leilão" onPress={navigateToItemDeLeilaoList} />
        <View style={styles.buttonSpacer} />
        <Button title="Participantes" onPress={navigateToParticipantList} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    justifyContent: 'flex-start', 
    alignItems: 'center',
    flexDirection: 'column', 
  },
  buttonSpacer: {
    height: 10, 
  },
});

export default HomeScreen;
