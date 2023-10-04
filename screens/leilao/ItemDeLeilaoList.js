import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importe o ícone FontAwesome

import axios from 'axios';

const ItemDeLeilaoList = ({ navigation }) => {
  const [items, setItems] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('https://leilao-rest-api.herokuapp.com/itemdeleilao');
      setItems(response.data);
    } catch (error) {
      console.error('Erro ao obter a lista de itens de leilão', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = useCallback(async (itemId) => {
    try {
      await axios.delete(`https://leilao-rest-api.herokuapp.com/itemdeleilao/${itemId}`);
      setItems((prevItems) => prevItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Erro ao excluir o item de leilão', error);
    }
  }, []);

  const navigateToDetail = useCallback((itemId) => {
    navigation.navigate('ItemDetail', { id: itemId });
  }, [navigation]);

  const handleCreateItem = () => {
    navigation.navigate('CreateItem');
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.nome}</Text>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Icon name="trash" size={24} color="red" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToDetail(item.id)}>
        <Icon name="info" size={24} color="blue" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
  
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          onPress={handleCreateItem}
          style={styles.addButton}
        >
          <Icon name="plus" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    marginLeft: 10,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addButton: {
    backgroundColor: 'green',
    borderRadius: 50,
    padding: 10,
  },
});

export default ItemDeLeilaoList;
