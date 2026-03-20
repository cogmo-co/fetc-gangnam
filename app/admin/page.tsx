"use client";

import { useState, useEffect } from "react";
import type { Post, View, ImageItem } from "./types";
import * as api from "./services";
import LoginForm from "./LoginForm";
import PostForm from "./PostForm";
import PostList from "./PostList";
import styles from "./admin.module.css";

export default function AdminPage() {
  const [view, setView] = useState<View>("loading");
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [error, setError] = useState("");

  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");

  const [editId, setEditId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formBody, setFormBody] = useState("");
  const [formPublished, setFormPublished] = useState(true);
  const [imageItems, setImageItems] = useState<ImageItem[]>([]);

  async function loadPosts(page = 1) {
    setLoading(true);
    try {
      const data = await api.fetchPosts(page);
      setPosts(data.posts);
      setCurrentPage(data.page);
      setTotalPages(Math.ceil(data.total / data.limit));
    } catch (e: unknown) {
      if (e instanceof Error && e.message === "UNAUTHORIZED") {
        setView("login");
        return;
      }
      setError("목록 불러오기 실패");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin() {
    setError("");
    setLoading(true);
    try {
      const ok = await api.login(loginId, loginPw);
      if (!ok) {
        setError("ID 또는 비밀번호가 틀렸습니다");
        return;
      }
      await loadPosts();
      setView("list");
    } catch {
      setError("로그인 실패");
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditId(null);
    setFormTitle("");
    setFormBody("");
    setFormPublished(true);
    setImageItems([]);
    setView("create");
  }

  function openEdit(post: Post) {
    setEditId(post.id);
    setFormTitle(post.title);
    setFormBody(post.body || "");
    setFormPublished(post.published);
    setImageItems(
      (post.image_urls || []).map((url, i) => ({
        id: `existing-${i}`,
        src: url,
        type: "existing",
      }))
    );
    setView("edit");
  }

  async function handleSubmit() {
    setError("");
    setLoading(true);
    try {
      if (view === "create" && (!formTitle || imageItems.length === 0)) {
        setError("제목과 이미지는 필수입니다");
        setLoading(false);
        return;
      }

      const uploadedUrls = await api.uploadImages(imageItems, (cur, total) =>
        setLoadingMsg(`이미지 업로드 중 (${cur}/${total})...`)
      );
      setLoadingMsg("저장 중...");
      const allUrls = api.buildImageUrls(imageItems, uploadedUrls);

      if (view === "create") {
        await api.createPost(formTitle, formBody, formPublished, allUrls);
      } else if (view === "edit" && editId) {
        await api.updatePost(editId, formTitle, formBody, formPublished, allUrls);
      }

      for (let i = 0; i < 3; i++) {
        try { await api.revalidateNews(); break; } catch {
          if (i === 2) setError("저장 완료, NEWS 목록 캐시 갱신 실패 ─ 최대 1시간 후 반영됩니다.");
        }
      }
      await loadPosts();
      setView("list");
    } catch {
      setError("저장 실패");
    } finally {
      setLoading(false);
      setLoadingMsg("");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    setLoading(true);
    try {
      await api.deletePost(id);
      await api.revalidateNews();
      await loadPosts();
    } catch {
      setError("삭제 실패");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    api
      .fetchPosts(1)
      .then((data) => {
        setPosts(data.posts);
        setCurrentPage(data.page);
        setTotalPages(Math.ceil(data.total / data.limit));
        setView("list");
      })
      .catch(() => setView("login"));
  }, []);

  if (view === "loading") {
    return (
      <div className={styles.wrap}>
        <div className={styles.loading}>로딩 중...</div>
      </div>
    );
  }

  if (view === "login") {
    return (
      <LoginForm
        loginId={loginId}
        loginPw={loginPw}
        loading={loading}
        error={error}
        onIdChange={setLoginId}
        onPwChange={setLoginPw}
        onLogin={handleLogin}
      />
    );
  }

  if (view === "create" || view === "edit") {
    return (
      <PostForm
        mode={view}
        title={formTitle}
        body={formBody}
        published={formPublished}
        imageItems={imageItems}
        loading={loading}
        loadingMsg={loadingMsg}
        error={error}
        onTitleChange={setFormTitle}
        onBodyChange={setFormBody}
        onPublishedChange={setFormPublished}
        onImageItemsChange={setImageItems}
        onSubmit={handleSubmit}
        onCancel={() => setView("list")}
      />
    );
  }

  return (
    <PostList
      posts={posts}
      loading={loading}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={loadPosts}
      onEdit={openEdit}
      onDelete={handleDelete}
      onCreate={openCreate}
    />
  );
}
