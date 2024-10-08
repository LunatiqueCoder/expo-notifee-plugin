import { StyleSheet, Text, View } from 'react-native';

import * as ExpoNotifeeRemoteNSE from 'expo-notifee-remote-plugin';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoNotifeeRemoteNSE.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
