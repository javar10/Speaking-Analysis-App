import { View, Text, Button } from 'react-native';
import { useRecordings } from '../hooks/useRecordings';

const HomeScreen = ({ navigation }) => {
    const { saveRecording } = useRecordings();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Record"
                onPress={() => saveRecording()}
            />
            <Button
                title="Go to Saved Data"
                onPress={() => navigation.navigate('SavedData')}
            />
        </View>
    );
};

export default HomeScreen;