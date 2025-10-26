// app/crop/index.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import { useRouter } from 'expo-router'

export default function CropStart() {
  const router = useRouter()
  const [videoUri, setVideoUri] = React.useState<string | null>(null)

  const pickVideo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*',
        copyToCacheDirectory: true,
      })

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0]
        setVideoUri(file.uri);
        console.log(file.uri);
        
      } else {
        console.log('Kullanıcı iptal etti')
      }
    } catch (err) {
      console.error('Video seçimi sırasında hata:', err)
    }
  }

  return (
    <View style={{ flex: 1, padding: 16,  backgroundColor: "#0f0f0f" }}>
      <Text style={{ fontSize: 20, fontWeight: '700',color:"white" }}>Select Video</Text>

      <TouchableOpacity
        onPress={pickVideo}
        style={{
          marginTop: 16,
          padding: 12,
          backgroundColor: '#0b84ff',
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontWeight: '600' }}>Pick a video</Text>
      </TouchableOpacity>

      {videoUri && (
        <>
          <Text style={{ marginTop: 12,color:"white" }}>Selected: {videoUri}</Text>

          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/crop/trim',
                params: { uri: videoUri },
              })
            }
            style={{
              marginTop: 12,
              padding: 12,
              backgroundColor: '#10b981',
              borderRadius: 8,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontWeight: '600' }}>
              Go to Trim
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}
