import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import axios from 'axios';

const ItemDeLeilaoDetail = ({ route, navigation }) => {
  const { id, participantId } = route.params;
  const [lanceValue, setLanceValue] = useState('');

  const handleLance = () => {
    const parsedValue = parseFloat(lanceValue);

    if (isNaN(parsedValue) || parsedValue <= 0) {
      console.error('Por favor, insira um valor de lance válido.');
      return;
    }

    const lancePayload = {
      valor: parsedValue,
      arrematante: {
        id: participantId,
      },
    };

    axios.post(`https://leilao-rest-api.herokuapp.com/itemdeleilao/${id}`, lancePayload)
      .then(response => {
        console.log('Lance registrado com sucesso', response.data);
        navigation.navigate('LancesList', { itemId: id });
      })
      .catch(error => console.error('Erro ao registrar o lance', error));
  };

  return (
    <View>
      <Text>Item de Leilão ID: {id}</Text>
      <Text>Valor do Lance: {lanceValue}</Text>
      <TextInput
        placeholder="Digite o valor do lance"
        keyboardType="numeric"
        value={lanceValue}
        onChangeText={text => setLanceValue(text)}
      />
      <Button title="Registrar Lance" onPress={handleLance} />
    </View>
  );
};

export default ItemDeLeilaoDetail;
