import { View, Text, Button } from 'react-native';

const SavedDataScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Saved Data Screen</Text>

      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default SavedDataScreen;