import { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useRecordings } from '../hooks/useRecordings';

const HomeScreen = ({ navigation }) => {
    const { startRecording, stopRecording, saveRecording } = useRecordings();
    const [buttonTitle, setButtonTitle] = useState('Record');
    const [isRecording, setIsRecording] = useState(false);

    const handleRecord = async () => {
        if (!isRecording) {
            await startRecording();
            setIsRecording(true);
            setButtonTitle('Stop');
            console.log('Recording started');
        }
        else {
            const recordingUri = await stopRecording();
            if (recordingUri) {
                await saveRecording(recordingUri);
            }
            setIsRecording(false);
            setButtonTitle('Record');
            console.log('Recording stopped and saved');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title={buttonTitle}
                onPress={handleRecord}
            />
            <Button
                title="Go to Saved Data"
                onPress={() => navigation.navigate('SavedData')}
            />
        </View>
    );
};

export default HomeScreen;