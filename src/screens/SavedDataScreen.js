import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { useRecordings } from '../hooks/useRecordings';

const SavedDataScreen = ({ navigation }) => {
    const { recordings, playRecording, deleteRecording } = useRecordings();

    return (
        <View style={{ flex: 1, paddingTop: 50 }}>
            <FlatList
                data={recordings}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View>
                        <View style={{ padding: 10, borderBottomWidth: 1 }}>
                            <Text>{item.name}</Text>
                            <Text style={{ fontSize: 10, color: 'gray' }}>{item.timestamp}</Text>
                        </View>
                        
                        <TouchableOpacity
                            onPress={() => playRecording(item.recordingUri)}
                        >
                            {/* <Text>{item.timestamp}</Text> */}
                            <Text>▶ Play</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => deleteRecording(item.id)}
                        >
                            <Text>X</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <Button title="New Recording" onPress={() => navigation.navigate('Home')} />
        </View>
    );
};

export default SavedDataScreen;