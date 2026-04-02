import { View, Text, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useRecordings } from '../hooks/useRecordings';

const SavedDataScreen = ({ navigation }) => {
    const { recordings } = useRecordings();

    return (
        <View style={{ flex: 1, paddingTop: 50 }}>
            <FlatList
                data={recordings}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ padding: 10, borderBottomWidth: 1 }}>
                        <Text>{item.name}</Text>
                        <Text style={{ fontSize: 10, color: 'gray' }}>{item.timestamp}</Text>
                    </View>
                )}
            />

            <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
    );
};

export default SavedDataScreen;