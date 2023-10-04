import React, { useState, useCallback } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';

const CreateParticipantScreen = ({ navigation }) => {
  const [cpf, setCPF] = useState('');
  const [nome, setNome] = useState('');

  const handleCreateParticipant = useCallback(async () => {
    if (!cpf || !nome) {
      console.error('Por favor, insira o CPF e o nome do participante.');
      return;
    }

    const newParticipant = { cpf, nome };

    try {
      const response = await axios.post('https://leilao-rest-api.herokuapp.com/participantes', newParticipant);
      console.log('Novo participante criado com sucesso', response.data);

      navigation.navigate('ParticipantDetail', { participantId: response.data.id });
    } catch (error) {
      console.error('Erro ao criar o novo participante', error);
    }
  }, [cpf, nome, navigation]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={text => setCPF(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={text => setNome(text)}
      />
      <Button title="Criar Participante" onPress={handleCreateParticipant} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default CreateParticipantScreen;
