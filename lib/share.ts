export async function sharePost(title: string, postId: string) {
  const url = `${window.location.origin}/news/${postId}`;
  if (navigator.share) {
    try {
      await navigator.share({ title, url });
    } catch {}
  } else {
    await navigator.clipboard.writeText(url);
    alert("링크가 복사되었습니다");
  }
}
