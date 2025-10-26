import { StatusBar } from "expo-status-bar";
import { Slot } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Platform } from "react-native";

export default function App() {
  return (
    <SafeAreaProvider>
      {/* Safe area boşluklarını hem üst hem alt için etkinleştiriyoruz */}
      
        <View style={styles.inner}>
          <Slot />
        
        </View>
  
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({

  inner: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },
});
