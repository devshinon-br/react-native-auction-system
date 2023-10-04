import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const ParticipantDetailScreen = ({ route }) => {
  const { participantId } = route.params;
  const [participant, setParticipant] = useState(null);

  const fetchParticipantDetails = useCallback(async () => {
    try {
      const response = await axios.get(`https://leilao-rest-api.herokuapp.com/participantes/${participantId}`);
      setParticipant(response.data);
    } catch (error) {
      console.error('Erro ao obter detalhes do participante', error);
    }
  }, [participantId]);

  useEffect(() => {
    fetchParticipantDetails();
  }, [fetchParticipantDetails]);

  if (!participant) {
    return (
      <View style={styles.container}>
        <Text>Carregando detalhes do participante...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Detalhes do Participante:</Text>
      <Text>CPF: {participant.cpf}</Text>
      <Text>Nome: {participant.nome}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default ParticipantDetailScreen;
