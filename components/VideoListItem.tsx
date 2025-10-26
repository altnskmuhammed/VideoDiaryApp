// components/VideoListItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

// 🎬 Video tipini tanımla (AsyncStorage ve TanStack Query ile tutulan yapıya göre)
export interface VideoItem {
  id: string;
  name: string;
  description: string;
  fileUri: string;
  createdAt: string;
}

export default function VideoListItem({ video }: { video: VideoItem }) {
  return (
    <Link href={`/details?id=${video.id}`} asChild>
      <TouchableOpacity
        style={{
          padding: 12,
          borderRadius: 8,
          backgroundColor: '#1e1e1e',
          marginBottom: 8,
        }}
      >
        <Text style={{ fontWeight: '600', color: 'white', fontSize: 16 }}>
          {video.name}
        </Text>

        <Text numberOfLines={1} style={{ color: '#9ca3af', fontSize: 13 }}>
          {video.description}
        </Text>

        <Text
          style={{
            marginTop: 4,
            fontSize: 12,
            color: '#6b7280',
          }}
        >
          {new Date(video.createdAt).toLocaleString()}
        </Text>
      </TouchableOpacity>
    </Link>
  );
}
