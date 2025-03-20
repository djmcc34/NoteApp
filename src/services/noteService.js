// src/services/noteService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTES_KEY = 'notes';

// Helper to get current notes from storage
const fetchNotes = async () => {
  try {
    const notesString = await AsyncStorage.getItem(NOTES_KEY);
    return notesString ? JSON.parse(notesString) : [];
  } catch (error) {
    console.error('Error fetching notes:', error);
    return [];
  }
};

// Helper to save notes to storage
const saveNotes = async (notes) => {
  try {
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('Error saving notes:', error);
  }
};

export const getAllNotes = async () => {
  return await fetchNotes();
};

export const createNote = async (note) => {
  const notes = await fetchNotes();
  const newNote = { ...note, id: Date.now() }; // Use a timestamp as a simple unique id
  const updatedNotes = [...notes, newNote];
  await saveNotes(updatedNotes);
  return newNote;
};

export const updateNote = async (updatedNote) => {
  const notes = await fetchNotes();
  const index = notes.findIndex((note) => note.id === updatedNote.id);
  if (index === -1) {
    throw new Error('Note not found');
  }
  notes[index] = updatedNote;
  await saveNotes(notes);
  return updatedNote;
};

export const deleteNote = async (id) => {
  const notes = await fetchNotes();
  const updatedNotes = notes.filter((note) => note.id !== id);
  await saveNotes(updatedNotes);
  return true;
};

export const deleteAllNotes = async () => {
  try {
    await AsyncStorage.removeItem(NOTES_KEY);
    return true;
  } catch (error) {
    console.error('Error deleting all notes:', error);
    throw error;
  }
};

export const shareNote = async (id) => {
  const notes = await fetchNotes();
  const note = notes.find((note) => note.id === id);
  if (!note) {
    throw new Error('Note not found');
  }
  // Later integrate with React Native's Share API here.
  return note;
};


