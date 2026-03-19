/** 브라우저에서 이미지를 1080x1350 WebP로 변환 */
export async function resizeToWebP(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 1350;
      const ctx = canvas.getContext("2d")!;
      const scale = Math.max(1080 / img.width, 1350 / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (1080 - w) / 2;
      const y = (1350 - h) / 2;
      ctx.drawImage(img, x, y, w, h);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("변환 실패"))),
        "image/webp",
        0.8
      );
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
