import React from "react";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView
          edges={["top", "bottom"]}
          style={{
            flex: 1,
            backgroundColor: "#0f0f0f",
            paddingTop: Platform.OS === "android" ? 25 : 20,
            paddingBottom: 20,
         
          }}
        >
          <Stack screenOptions={{ headerShown: false }} />
          <StatusBar style="light" />
        </SafeAreaView>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
