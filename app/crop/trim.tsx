import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { VideoView, useVideoPlayer } from 'expo-video';
import CropScrubber from '../../components/CropScrubber';
import { trimVideoFile } from '../../lib/trimVideo';

export default function TrimStep() {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const router = useRouter();
  const player = useVideoPlayer(uri || '', (p) => (p.loop = false));
  const [start, setStart] = React.useState(0);
  const [end, setEnd] = React.useState(5);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleTrim = async () => {
    console.log("🎬 handleTrim uri =", uri);
    if (!uri) return Alert.alert("❌", "Video URI bulunamadı");
  
    setLoading(true);
    try {
      const trimmedUri = await trimVideoFile(uri, start, end);
      console.log("✅ Trimmed file:", trimmedUri);
  
      Alert.alert("✅ Trim complete", `Saved at: ${trimmedUri}`);
  
      router.push({
        pathname: "/crop/metadata",
        params: { uri: trimmedUri },
      });
    } catch (err) {
      console.error("❌ Trim failed:", err);
      Alert.alert("❌ Trim failed", String(err));
    } finally {
      setLoading(false);
    }
  };
  

  const togglePlay = () => {
    if (isPlaying) player.pause();
    else player.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0f0f0f', padding: 16 }}>
      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Trim Video</Text>

      <View style={{ marginTop: 16, borderRadius: 8, overflow: 'hidden', height: 220, backgroundColor: '#000' }}>
        <VideoView style={{ flex: 1 }} player={player} contentFit="cover" />
        <TouchableOpacity
          onPress={togglePlay}
          style={{
            position: 'absolute',
            bottom: 16,
            alignSelf: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: 'white', fontWeight: '600' }}>
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </Text>
        </TouchableOpacity>
      </View>

      <CropScrubber
        duration={30}
        onChange={(s, e) => {
          setStart(s);
          setEnd(e);
          player.currentTime = s;
        }}
      />

      <TouchableOpacity
        onPress={handleTrim}
        disabled={loading}
        style={{
          marginTop: 16,
          padding: 12,
          backgroundColor: loading ? '#9ca3af' : '#ef4444',
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontWeight: '600' }}>
          {loading ? 'Trimming...' : 'Trim & Save'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
