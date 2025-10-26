
import * as FileSystem from "expo-file-system/legacy";
import * as MediaLibrary from "expo-media-library";
import { trimVideo } from "expo-trim-video";
import { Platform } from "react-native";

async function ensureContentUri(fileUri: string): Promise<string> {
  if (Platform.OS !== "android") return fileUri;
  try {
    const perm = await MediaLibrary.requestPermissionsAsync();
    if (!perm.granted) throw new Error("MediaLibrary permission denied");

    
    const destPath = `${FileSystem.cacheDirectory}temp_${Date.now()}.mp4`;
    await FileSystem.copyAsync({ from: fileUri, to: destPath });

    const asset = await MediaLibrary.createAssetAsync(destPath);


    const contentUri = asset.uri || asset.localUri || fileUri;
    console.log("📂 Converted (content/file) URI =", contentUri);
    return contentUri;
  } catch (e) {
    console.warn("⚠️ ensureContentUri fallback:", e);
    return fileUri;
  }
}

export async function trimVideoFile(uri: string, start: number, end: number) {
  if (!uri) throw new Error("URI is required (empty)");

  
  const inputUri = await ensureContentUri(uri);

 
  console.log("🎬 trimVideo input =", inputUri);
  const result = await trimVideo({
    uri: inputUri,   
    start,
    end,
  });

  
  console.log("✅ Trim success, output uri =", result?.uri);
  if (!result?.uri) {
    throw new Error("Trim returned no uri");
  }

  

  return result.uri;
}
