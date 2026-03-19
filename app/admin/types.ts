export interface Post {
  id: string;
  title: string;
  body?: string;
  image_urls: string[];
  created_at: string;
  updated_at: string;
  published: boolean;
}

export type View = "loading" | "login" | "list" | "create" | "edit";

export interface ImageItem {
  id: string;
  src: string;
  type: "existing" | "new";
  file?: File;
}
