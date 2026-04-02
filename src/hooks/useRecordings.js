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

    return { recordings, loadRecordings, saveRecording };
};
