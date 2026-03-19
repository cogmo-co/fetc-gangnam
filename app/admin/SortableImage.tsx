"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ImageItem } from "./types";
import styles from "./admin.module.css";

export default function SortableImage({
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
