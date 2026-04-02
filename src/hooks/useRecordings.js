import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAudioRecorder } from 'expo-audio';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
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
    
    //Start, Stop and Save recording functions
    const [recordingInstance, setRecordingInstance] = useState(null);
    const startRecording = async () => {
        try {
            // 1. Request Permission
            const { granted } = await Audio.requestPermissionsAsync();
            if (!granted) return;

            // 2. Set Audio Mode (Critical for iOS/Android)
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            // 3. Prepare and Start
            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecordingInstance(recording);
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };

    const stopRecording = async () => {
        try {
            await recordingInstance.stopAndUnloadAsync();
            const uri = recordingInstance.getURI();
            setRecordingInstance(null);
            return uri;
        } catch (err) {
            console.error('Failed to stop recording', err);
        }
    };

    const saveRecording = async (uri) => {
        if (!uri) return;
        const newEntry = {
            id: Date.now().toString(),
            timestamp: new Date().toLocaleString(),
            recordingUri: uri,
        };

        const updated = [newEntry, ...recordings];
        setRecordings(updated);
        await AsyncStorage.setItem(RECORDINGS_LIST_KEY, JSON.stringify(updated));
        console.log('Recording saved:', newEntry);
    };

    //Delete recording function
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

    return { recordings, loadRecordings, startRecording, stopRecording, saveRecording, deleteRecording };
};
