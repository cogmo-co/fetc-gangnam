import { upload } from "@vercel/blob/client";
import type { Post, ImageItem } from "./types";
import { resizeToWebP } from "./utils";

export async function login(id: string, password: string): Promise<boolean> {
  const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, password }),
  });
  return res.ok;
}

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch("/api/admin/posts", { cache: "no-store" });
  if (res.status === 401) throw new Error("UNAUTHORIZED");
  if (!res.ok) throw new Error("FETCH_FAILED");
  return res.json();
}

export async function uploadImages(items: ImageItem[]): Promise<string[]> {
  const newFiles = items.filter((it) => it.type === "new" && it.file);
  const uploadedUrls: string[] = [];

  for (const item of newFiles) {
    const webpBlob = await resizeToWebP(item.file!);
    const webpFile = new File([webpBlob], `${Date.now()}.webp`, { type: "image/webp" });
    const blob = await upload(webpFile.name, webpFile, {
      access: "public",
      handleUploadUrl: "/api/admin/upload",
    });
    uploadedUrls.push(blob.url);
  }

  return uploadedUrls;
}

export function buildImageUrls(items: ImageItem[], uploadedUrls: string[]): string[] {
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
