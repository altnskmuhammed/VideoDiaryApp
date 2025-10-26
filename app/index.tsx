// app/index.tsx veya app/video-list.tsx
import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function getVideos() {
  const data = await AsyncStorage.getItem("videos");
  return data ? JSON.parse(data) : [];
}

export default function VideoList() {
  const router = useRouter();
  const { data: videos = [], refetch } = useQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#0f0f0f", padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "white", marginBottom: 16 }}>
        🎬 My Video Diary
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/crop")}
        style={{
          backgroundColor: "#ef4444",
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>+ Add Video</Text>
      </TouchableOpacity>

      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/details/${item.id}`)}
            style={{
              backgroundColor: "#1e1e1e",
              marginBottom: 10,
              borderRadius: 8,
              padding: 12,
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>{item.name}</Text>
            <Text style={{ color: "gray", fontSize: 12 }}>{item.description}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ color: "gray", textAlign: "center", marginTop: 40 }}>
            No videos yet. Add one!
          </Text>
        }
      />
    </View>
  );
}
