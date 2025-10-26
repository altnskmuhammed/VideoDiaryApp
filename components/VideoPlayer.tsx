// components/VideoPlayer.tsx
import React from 'react';
import { View } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';

export default function VideoPlayer({ uri }: { uri: string }) {
  // VideoPlayer nesnesi oluştur
  const player = useVideoPlayer(uri, player => {
    player.loop = true;
  });

  return (
    <View
      style={{
        width: '100%',
        height: 220,
        backgroundColor: '#000',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      <VideoView
        style={{ width: '100%', height: '100%' }}
        player={player}
        nativeControls  
         contentFit="cover"
      />
    </View>
  );
}
