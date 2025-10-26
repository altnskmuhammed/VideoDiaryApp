import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VideoView, createVideoPlayer } from "expo-video";

export default function VideoDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [video, setVideo] = React.useState<any>(null);
  const [player, setPlayer] = React.useState<any>(null);

  React.useEffect(() => {
    const loadVideo = async () => {
      const data = await AsyncStorage.getItem("videos");
      const list = data ? JSON.parse(data) : [];
      const found = list.find((v: any) => v.id === id);

      if (found) {
        const newPlayer = createVideoPlayer({ uri: found.fileUri });
        setPlayer(newPlayer);
        setVideo(found);
      }
    };

    loadVideo();

    return () => {
      player?.pause();
      player?.unload();
    };
  }, [id]);

  if (!video || !player) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0f0f0f" }}>
        <Text style={{ color: "gray" }}>Loading video...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#0f0f0f", padding: 16 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 16 }}>
        <Text style={{ color: "#ef4444" }}>← Back</Text>
      </TouchableOpacity>

      <Text style={{ color: "white", fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>
        {video.name}
      </Text>
      <Text style={{ color: "gray", marginBottom: 16 }}>{video.description}</Text>

      <View
        style={{
          width: "100%",
          height: 240,
          borderRadius: 12,
          overflow: "hidden",
          backgroundColor: "black",
        }}
      >
        <VideoView
          player={player}
          nativeControls
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    </View>
  );
}
