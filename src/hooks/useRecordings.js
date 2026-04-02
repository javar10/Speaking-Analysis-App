import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RECORDINGS_LIST_KEY } from '../constants/storageKeys';

export const useRecordings = () => {
    const [recordings, setRecordings] = useState([]);

    // Load recordings initially
    useEffect(() => {
        loadRecordings();
    }, []);

    const loadRecordings = async () => {
        try {
            const existing = await AsyncStorage.getItem(RECORDINGS_LIST_KEY);
            const parsed = existing ? JSON.parse(existing) : [];
            setRecordings(parsed);
            return parsed; // Return for manual calls
        } catch (error) {
            console.error(error);
        }
    };

    const saveRecording = async () => {
        try {
            const newRecording = {
                id: Date.now().toString(),
                timestamp: new Date().toLocaleString(),
            };

            const updated = [newRecording, ...recordings];
            setRecordings(updated);
            await AsyncStorage.setItem(RECORDINGS_LIST_KEY, JSON.stringify(updated));
        } catch (error) {
            console.error(error);
        }
    };

    const deleteRecording = async (id) => {
        try {
            // 1. Filter out the specific item by ID
            const updatedList = recordings.filter(item => item.id !== id);

            // 2. Update the local state so the UI refreshes immediately
            setRecordings(updatedList);

            // 3. Save the new filtered array back to AsyncStorage
            await AsyncStorage.setItem(RECORDINGS_LIST_KEY, JSON.stringify(updatedList));
        } catch (error) {
            console.error("Failed to delete recording:", error);
        }
    };


    return { recordings, loadRecordings, saveRecording, deleteRecording };
};
