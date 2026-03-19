"use client";

import { useEffect } from "react";
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
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import type { ImageItem } from "./types";
import SortableImage from "./SortableImage";
import { MAX_IMAGES_PER_POST } from "@/lib/constants";
import styles from "./admin.module.css";

interface Props {
  mode: "create" | "edit";
  title: string;
  body: string;
  published: boolean;
  imageItems: ImageItem[];
  loading: boolean;
  loadingMsg: string;
  error: string;
  onTitleChange: (v: string) => void;
  onBodyChange: (v: string) => void;
  onPublishedChange: (v: boolean) => void;
  onImageItemsChange: (items: ImageItem[]) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function PostForm({
  mode,
  title,
  body,
  published,
  imageItems,
  loading,
  loadingMsg,
  error,
  onTitleChange,
  onBodyChange,
  onPublishedChange,
  onImageItemsChange,
  onSubmit,
  onCancel,
}: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
  );

  // 컴포넌트 언마운트 시 미리보기 URL 메모리 해제
  useEffect(() => {
    return () => {
      imageItems
        .filter((it) => it.type === "new")
        .forEach((it) => URL.revokeObjectURL(it.src));
    };
  }, [imageItems]);

  function handleAddFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const newFiles = Array.from(e.target.files || []);
    const remaining = MAX_IMAGES_PER_POST - imageItems.length;
    if (remaining <= 0) {
      alert(`이미지는 최대 ${MAX_IMAGES_PER_POST}장까지 가능합니다`);
      e.target.value = "";
      return;
    }
    const sliced = newFiles.slice(0, remaining);
    const newItems: ImageItem[] = sliced.map((f, i) => ({
      id: `new-${Date.now()}-${i}`,
      src: URL.createObjectURL(f),
      type: "new",
      file: f,
    }));
    onImageItemsChange([...imageItems, ...newItems]);
    e.target.value = "";
  }

  function removeImage(id: string) {
    const item = imageItems.find((it) => it.id === id);
    if (item?.type === "new") URL.revokeObjectURL(item.src);
    onImageItemsChange(imageItems.filter((it) => it.id !== id));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = imageItems.findIndex((it) => it.id === active.id);
      const newIndex = imageItems.findIndex((it) => it.id === over.id);
      onImageItemsChange(arrayMove(imageItems, oldIndex, newIndex));
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.formBox}>
          <div className={styles.formTitle}>
            {mode === "create" ? "새 게시물" : "게시물 수정"}
          </div>
          <div className={styles.field}>
            <label>제목</label>
            <input value={title} onChange={(e) => onTitleChange(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>내용 (선택)</label>
            <textarea
              className={styles.textarea}
              value={body}
              onChange={(e) => onBodyChange(e.target.value)}
            />
          </div>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => onPublishedChange(e.target.checked)}
            />
            <label htmlFor="published">{published ? "공개" : "비공개"}</label>
          </div>

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
                      multiple
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
            <button className={styles.btnCancel} onClick={onCancel}>
              취소
            </button>
            <button
              className={styles.btnPrimary}
              onClick={onSubmit}
              disabled={loading}
            >
              {loading ? (loadingMsg || "저장 중...") : "저장"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
