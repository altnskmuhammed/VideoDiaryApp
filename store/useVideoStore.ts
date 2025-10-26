// app/api/videoApi.ts
import { useQueryClient, useMutation } from '@tanstack/react-query';
import * as FileSystem from 'expo-file-system';
import * as TrimVideo from 'expo-trim-video';



export function useTrimVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      uri,
      start,
      end,
    }: {
      uri: string;
      start: number;
      end: number;
    }) => {
      // 🔧 FileSystem tipleri eksikse 'as any' ile erişim sağla
      const fs = FileSystem as any;
      const cacheDir = fs.cacheDirectory || fs.documentDirectory;
      const outputUri = `${cacheDir}trimmed_${Date.now()}.mp4`;

      // 🎬 Videoyu kırp
      await (TrimVideo as any).trim(uri, { start, end, outputUri });


      // 📁 Yeni dosyanın yolunu döndür
      return { fileUri: outputUri };
    },

    // ✅ Başarılı olduğunda cache'i temizle
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    },
  });
}
