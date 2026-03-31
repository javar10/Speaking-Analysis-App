import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>

      <Button
        title="Go to Saved Data"
        onPress={() => navigation.navigate('SavedData')}
      />
    </View>
  );
};

export default HomeScreen;