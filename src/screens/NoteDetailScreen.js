// src/screens/NoteDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getAllNotes, createNote, updateNote, deleteNote } from '../services/noteService';

const NoteDetailScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState(new Date(Date.now()).toString());
  const [content, setContent] = useState('');
  const [isExistingNote, setIsExistingNote] = useState(false);
  
  // Check if a noteId was passed to determine if we are editing an existing note
  const noteId = route.params ? route.params.noteId : null;

  const NOTES_KEY = 'notes';

  useEffect(() => {
    if (noteId) {
      // For simplicity, we use getAllNotes to find the note.
      // Later you might want to implement a getNoteById function.
      getAllNotes().then((notes) => {
        console.log(notes);
        const note = notes.find((n) => n.id === noteId);
        if (note) {
          setTitle(note.title);
          setContent(note.content);
          setIsExistingNote(true);
        }
      });
    }
  }, [noteId]);

  const checkLengths = () => {
    if (title.trim() === '' && content.trim() === '') {
        Alert.alert('Error', 'Note must have a title and content');
        return false;
        }
        else if (title.trim() === '') {
        Alert.alert('Error', 'Note must have a title');
        return false;
        }
        else if (content.trim() === '') {
        Alert.alert('Error', 'Note must have content');
        return false; 
        }
        return true;
  };


  const handleSave = async () => {
    if (!checkLengths()) {
        return;
    }
    try {
      if (isExistingNote) {
        await updateNote({ id: noteId, title: title.trim(), content: content.trim() });
      } else {
        await createNote({ title: title.trim(), content: content.trim() });
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleDelete = async () => {
    try {
      if (isExistingNote) {
        await deleteNote(noteId);
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter note title"
      />
      <Text style={styles.label}>Content</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={content}
        onChangeText={setContent}
        placeholder="Enter note content"
        multiline
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      {isExistingNote && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default NoteDetailScreen;
