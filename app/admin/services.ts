import { upload } from "@vercel/blob/client";
import type { ImageItem, PaginatedPosts, Post } from "./types";
import { resizeToWebP } from "./utils";

export async function login(id: string, password: string): Promise<boolean> {
  const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, password }),
  });
  return res.ok;
}

export async function fetchPosts(page = 1): Promise<PaginatedPosts> {
  const res = await fetch(`/api/admin/posts?page=${page}`, { cache: "no-store" });
  if (res.status === 401) throw new Error("UNAUTHORIZED");
  if (!res.ok) throw new Error("FETCH_FAILED");
  return res.json();
}

export async function uploadImages(
  items: ImageItem[],
  onProgress?: (current: number, total: number) => void
): Promise<string[]> {
  const newFiles = items.filter((it) => it.type === "new" && it.file);
  const uploadedUrls: string[] = [];
  const folderId = `${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Date.now()}`;

  try {
    for (let i = 0; i < newFiles.length; i++) {
      onProgress?.(i + 1, newFiles.length);
      const item = newFiles[i];
      const webpBlob = await resizeToWebP(item.file!);
      const index = String(i + 1).padStart(2, "0");
      const webpFile = new File([webpBlob], `images/${folderId}/${index}.webp`, { type: "image/webp" });
      const blob = await upload(webpFile.name, webpFile, {
        access: "public",
        handleUploadUrl: "/api/admin/blob",
      });
      uploadedUrls.push(blob.url);
    }
  } catch (e) {
    // 실패 시 이미 업로드된 파일 rollback
    if (uploadedUrls.length > 0) {
      await fetch("/api/admin/blob", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls: uploadedUrls }),
      }).catch(() => {});
    }
    throw e;
  }

  return uploadedUrls;
}

export function buildImageUrls(items: ImageItem[], uploadedUrls: string[]): string[] {
  const newCount = items.filter((it) => it.type === "new").length;
  if (uploadedUrls.length !== newCount) {
    throw new Error("UPLOAD_INCOMPLETE");
  }
  const urls = [...uploadedUrls];
  return items.map((it) => (it.type === "existing" ? it.src : urls.shift()!));
}

export async function createPost(
  title: string,
  body: string,
  published: boolean,
  imageUrls: string[]
): Promise<void> {
  const res = await fetch("/api/admin/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body, published, image_urls: imageUrls }),
  });
  if (!res.ok) throw new Error("CREATE_FAILED");
}

export async function updatePost(
  id: string,
  title: string,
  body: string,
  published: boolean,
  imageUrls: string[]
): Promise<void> {
  const res = await fetch(`/api/admin/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body, published, image_urls: imageUrls }),
  });
  if (!res.ok) throw new Error("UPDATE_FAILED");
}

export async function deletePost(id: string): Promise<void> {
  const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("DELETE_FAILED");
}

export async function revalidateNews(): Promise<void> {
  await fetch("/api/revalidate", { method: "POST" });
}
