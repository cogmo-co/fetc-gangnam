import { put, list, del } from "@vercel/blob";

/** 이미지 업로드 */
export async function uploadImage(
  key: string,
  buffer: Buffer,
  contentType: string = "image/webp"
): Promise<string> {
  const blob = await put(key, buffer, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType,
  });
  return blob.url;
}

/** 특정 prefix의 모든 blob 삭제 */
export async function deleteByPrefix(prefix: string): Promise<void> {
  const { blobs } = await list({ prefix });
  if (blobs.length > 0) {
    await del(blobs.map((b) => b.url));
  }
}
