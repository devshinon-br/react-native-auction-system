import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const LanceListScreen = ({ route }) => {
  const { itemId } = route.params;
  const [lances, setLances] = useState([]);

  useEffect(() => {
    const fetchLances = async () => {
      try {
        const response = await axios.get(`https://leilao-rest-api.herokuapp.com/itemdeleilao/${itemId}`);
        setLances(response.data.lancesRecebidos);
      } catch (error) {
        console.error('Erro ao obter a lista de lances', error);
      }
    };

    fetchLances();
  }, [itemId]);

  const renderItem = ({ item }) => (
    <View style={styles.lanceItem}>
      <Text>Valor: {item.valor}</Text>
      <Text>Arrematante ID: {item.arrematante.id}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={lances}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  lanceItem: {
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
});

export default LanceListScreen;
