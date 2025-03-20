// src/screens/NoteListScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getAllNotes } from '../services/noteService';
import { useFocusEffect } from '@react-navigation/native';

const NoteListScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // repalce with actual service call
    getAllNotes().then(setNotes);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getAllNotes().then((notes) => {
        setNotes([...notes]);
      });
    }, [])
  );
  

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.noteItem}
      onPress={() => navigation.navigate('NoteDetail', { noteId: item.id })}
    >
      <Text style={styles.noteTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Notes</Text>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('NoteDetail')}>
        <Text style={styles.addButtonText}>+ Add Note</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  noteItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  noteTitle: {
    fontSize: 18,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default NoteListScreen;
