import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { trimVideo } from "expo-trim-video";
import { Platform } from "react-native";

async function ensureContentUri(fileUri: string): Promise<string> {
  if (Platform.OS !== "android") return fileUri;

  try {
    const perm = await MediaLibrary.requestPermissionsAsync();
    if (!perm.granted) throw new Error("MediaLibrary permission denied");

    // ✅ MediaStore’a geçici kopya oluştur
    const destPath = `${FileSystem.documentDirectory}temp_${Date.now()}.mp4`;
    await FileSystem.copyAsync({ from: fileUri, to: destPath });

    const asset = await MediaLibrary.createAssetAsync(destPath);
    console.log("📂 Converted to content://", asset.localUri);
    return asset.localUri || fileUri;
  } catch (e) {
    console.warn("⚠️ Could not copy to MediaStore, fallback to file://:", e);
    return fileUri;
  }
}

export async function trimVideoFile(uri: string, start: number, end: number) {
  if (!uri) throw new Error("URI is required (empty)");

  // 1️⃣ content:// oluştur
  const contentUri = await ensureContentUri(uri);

  // 2️⃣ cache fallback
  const baseCache =
    FileSystem.cacheDirectory ||
    FileSystem.documentDirectory ||
    "/data/user/0/com.muhammed2323.VideoDiaryApp/cache/";
  const outputUri = `${baseCache}trimmed_${Date.now()}.mp4`;

  console.log("🎬 trimVideo input =", contentUri);
  console.log("🎬 trimVideo output =", outputUri);

  // 3️⃣ Trim çağrısı
  const result = await trimVideo({
    source: contentUri,
    start,
    end,
    destination: outputUri,
  });

  console.log("✅ Trim success:", result);
  return result.destination || outputUri;
}
