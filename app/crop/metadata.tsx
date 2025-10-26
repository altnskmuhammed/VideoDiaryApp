import React from "react";
import "react-native-get-random-values";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

export default function MetadataStep() {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  // 🔹 AsyncStorage’a video kaydetme mutation’ı
  const saveVideoMutation = useMutation({
    mutationFn: async (newVideo: any) => {
      const existing = await AsyncStorage.getItem("videos");
      const videos = existing ? JSON.parse(existing) : [];
      const updated = [...videos, newVideo];
      await AsyncStorage.setItem("videos", JSON.stringify(updated));
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      Alert.alert("Saved", "Video added to list!");
      router.replace("/");
    },
  });

  const handleCrop = async () => {
    if (!uri) return Alert.alert("No video selected");

    const newItem = {
      id: uuidv4(),
      name: name || "Untitled Video",
      description,
      fileUri: uri,
      durationSeconds: 5,
      createdAt: new Date().toISOString(),
    };

    saveVideoMutation.mutate(newItem);
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#0f0f0f" }}>
      <Text style={{ fontSize: 20, fontWeight: "700", color: "white" }}>
        Metadata & Crop
      </Text>

      <TextInput
        placeholder="Name"
        placeholderTextColor="#9ca3af"
        value={name}
        onChangeText={setName}
        style={{
          marginTop: 12,
          padding: 10,
          borderWidth: 1,
          borderColor: "#3f3f46",
          borderRadius: 8,
          color: "white",
        }}
      />

      <TextInput
        placeholder="Description"
        placeholderTextColor="#9ca3af"
        value={description}
        onChangeText={setDescription}
        style={{
          marginTop: 8,
          padding: 10,
          borderWidth: 1,
          borderColor: "#3f3f46",
          borderRadius: 8,
          height: 100,
          color: "white",
        }}
        multiline
      />

      <TouchableOpacity
        onPress={handleCrop}
        style={{
          marginTop: 16,
          padding: 12,
          backgroundColor: "#ef4444",
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>Save Metadata</Text>
      </TouchableOpacity>
    </View>
  );
}
