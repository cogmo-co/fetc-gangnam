"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./admin.module.css";

interface Post {
  id: string;
  title: string;
  body?: string;
  image_urls: string[];
  created_at: string;
  updated_at: string;
  published: boolean;
}

type View = "loading" | "login" | "list" | "create" | "edit";

interface ImageItem {
  id: string;
  src: string;
  type: "existing" | "new";
  file?: File;
}

function SortableImage({
  item,
  onRemove,
}: {
  item: ImageItem;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={styles.previewItem}
      {...attributes}
      {...listeners}
    >
      <img src={item.src} alt="" className={styles.previewImg} />
      <button
        className={styles.removeImg}
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        ×
      </button>
    </div>
  );
}

export default function AdminPage() {
  const [view, setView] = useState<View>("loading");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 로그인
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");

  // 폼
  const [editId, setEditId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formBody, setFormBody] = useState("");
  const [formPublished, setFormPublished] = useState(true);
  const [imageItems, setImageItems] = useState<ImageItem[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
  );

  async function handleLogin() {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: loginId, password: loginPw }),
      });
      if (!res.ok) {
        setError("ID 또는 비밀번호가 틀렸습니다");
        return;
      }
      await fetchPosts();
      setView("list");
    } catch {
      setError("로그인 실패");
    } finally {
      setLoading(false);
    }
  }

  async function fetchPosts() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/posts", { cache: "no-store" });
      if (res.status === 401) {
        setView("login");
        return;
      }
      const data = await res.json();
      setPosts(data);
    } catch {
      setError("목록 불러오기 실패");
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

  function handleAddFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const newFiles = Array.from(e.target.files || []);
    const newItems: ImageItem[] = newFiles.map((f, i) => ({
      id: `new-${Date.now()}-${i}`,
      src: URL.createObjectURL(f),
      type: "new",
      file: f,
    }));
    setImageItems((prev) => [...prev, ...newItems]);
    e.target.value = "";
  }

  function removeImage(id: string) {
    setImageItems((prev) => {
      const item = prev.find((it) => it.id === id);
      if (item?.type === "new") URL.revokeObjectURL(item.src);
      return prev.filter((it) => it.id !== id);
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setImageItems((prev) => {
        const oldIndex = prev.findIndex((it) => it.id === active.id);
        const newIndex = prev.findIndex((it) => it.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }

  async function handleSubmit() {
    setError("");
    setLoading(true);
    try {
      const newFiles = imageItems.filter((it) => it.type === "new" && it.file);

      if (view === "create") {
        if (!formTitle || newFiles.length === 0) {
          setError("제목과 이미지는 필수입니다");
          setLoading(false);
          return;
        }
        const fd = new FormData();
        fd.append("title", formTitle);
        fd.append("body", formBody);
        fd.append("published", String(formPublished));
        newFiles.forEach((it) => fd.append("images", it.file!));

        const res = await fetch("/api/admin/posts", { method: "POST", body: fd });
        if (!res.ok) throw new Error();
      } else if (view === "edit" && editId) {
        const orderedUrls = imageItems
          .filter((it) => it.type === "existing")
          .map((it) => it.src);
        const res = await fetch(`/api/admin/posts/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formTitle,
            body: formBody,
            published: formPublished,
            image_urls: orderedUrls,
          }),
        });
        if (!res.ok) throw new Error();
      }

      await fetch("/api/revalidate", { method: "POST" });
      await fetchPosts();
      setView("list");
    } catch {
      setError("저장 실패");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      await fetch("/api/revalidate", { method: "POST" });
      await fetchPosts();
    } catch {
      setError("삭제 실패");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetch("/api/admin/posts")
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setPosts(data);
            setView("list");
          });
        } else {
          setView("login");
        }
      })
      .catch(() => setView("login"));
  }, []);

  useEffect(() => {
    return () =>
      imageItems
        .filter((it) => it.type === "new")
        .forEach((it) => URL.revokeObjectURL(it.src));
  }, [imageItems]);

  // 로딩
  if (view === "loading") {
    return (
      <div className={styles.wrap}>
        <div className={styles.loading}>로딩 중...</div>
      </div>
    );
  }

  // 로그인
  if (view === "login") {
    return (
      <div className={styles.wrap}>
        <div className={styles.loginBox}>
          <div className={styles.loginTitle}>관리자 로그인</div>
          <div className={styles.field}>
            <label>ID</label>
            <input
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>
          <div className={styles.field}>
            <label>비밀번호</label>
            <input
              type="password"
              value={loginPw}
              onChange={(e) => setLoginPw(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <button
            className={styles.btnPrimary}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </div>
      </div>
    );
  }

  // 생성/수정 폼
  if (view === "create" || view === "edit") {
    return (
      <div className={styles.wrap}>
        <div className={styles.inner}>
          <div className={styles.formBox}>
            <div className={styles.formTitle}>
              {view === "create" ? "새 게시물" : "게시물 수정"}
            </div>
            <div className={styles.field}>
              <label>제목</label>
              <input
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>내용 (선택)</label>
              <textarea
                className={styles.textarea}
                value={formBody}
                onChange={(e) => setFormBody(e.target.value)}
              />
            </div>
            <div className={styles.checkbox}>
              <input
                type="checkbox"
                id="published"
                checked={formPublished}
                onChange={(e) => setFormPublished(e.target.checked)}
              />
              <label htmlFor="published">
                {formPublished ? "공개" : "비공개"}
              </label>
            </div>

            {/* 이미지 섹션 */}
            <div className={styles.imageSection}>
              <label>이미지</label>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={imageItems.map((it) => it.id)}
                  strategy={horizontalListSortingStrategy}
                >
                  <div className={styles.imageRow}>
                    <label className={styles.addImageBtn}>
                      +
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAddFiles}
                        style={{ display: "none" }}
                      />
                    </label>
                    {imageItems.map((item) => (
                      <SortableImage
                        key={item.id}
                        item={item}
                        onRemove={() => removeImage(item.id)}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>

            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.formActions}>
              <button
                className={styles.btnCancel}
                onClick={() => setView("list")}
              >
                취소
              </button>
              <button
                className={styles.btnPrimary}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "저장 중..." : "저장"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 목록
  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.toolbar}>
          <div className={styles.title}>NEWS 관리</div>
          <button className={styles.btnNew} onClick={openCreate}>
            새 게시물
          </button>
        </div>
        {loading && <div className={styles.loading}>불러오는 중...</div>}
        {!loading && posts.length === 0 && (
          <div className={styles.empty}>게시물이 없습니다</div>
        )}
        <div className={styles.postList}>
          {posts.map((post) => (
            <div key={post.id} className={styles.postItem}>
              {post.image_urls?.[0] && (
                <img
                  src={post.image_urls[0]}
                  alt=""
                  className={styles.postThumb}
                />
              )}
              <div className={styles.postInfo}>
                <div className={styles.postTitle}>{post.title}</div>
                <div className={styles.postDate}>
                  {new Date(post.created_at).toLocaleDateString("ko-KR")} ·{" "}
                  이미지 {post.image_urls?.length ?? 0}장
                </div>
              </div>
              <span
                className={`${styles.postBadge} ${
                  post.published ? styles.published : styles.draft
                }`}
              >
                {post.published ? "공개" : "비공개"}
              </span>
              <div className={styles.postActions}>
                <button
                  className={styles.btnEdit}
                  onClick={() => openEdit(post)}
                >
                  수정
                </button>
                <button
                  className={styles.btnDelete}
                  onClick={() => handleDelete(post.id)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
