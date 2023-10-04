import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const ParticipantListScreen = ({ navigation }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    axios.get('https://leilao-rest-api.herokuapp.com/participantes')
      .then(response => setParticipants(response.data))
      .catch(error => console.error('Erro ao obter a lista de participantes', error));
  }, []);

  const handleParticipantPress = (participantId) => {
    navigation.navigate('ParticipantDetail', { participantId });
  };

  const handleDeleteParticipant = async (participantId) => {
    try {
      await axios.delete(`https://leilao-rest-api.herokuapp.com/participantes/${participantId}`);
      setParticipants(participants.filter(participant => participant.id !== participantId));
    } catch (error) {
      console.error('Erro ao excluir o participante', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.participantItem}>
      <TouchableOpacity
        style={styles.participantItemText}
        onPress={() => handleParticipantPress(item.id)}
      >
        <Text>{item.nome}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteParticipant(item.id)}>
        <Icon name="trash" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <FlatList
        data={participants}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  participantItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  participantItemText: {
    flex: 1,
  },
});

export default ParticipantListScreen;
