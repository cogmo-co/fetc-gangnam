const RSS_URL = "https://fetc-gangnam.tistory.com/rss";
const MAX_POSTS = 10;

export interface TistoryPost {
  title: string;
  link: string;
  thumbnail: string | null;
}

/** RSS XML에서 item 목록 파싱 */
function parseRss(xml: string): { title: string; link: string }[] {
  const items: { title: string; link: string }[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null && items.length < MAX_POSTS) {
    const block = match[1];
    const title = block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1]
      ?? block.match(/<title>(.*?)<\/title>/)?.[1]
      ?? "";
    const link = block.match(/<link>(.*?)<\/link>/)?.[1] ?? "";
    if (title && link) items.push({ title, link });
  }
  return items;
}

/** 글 페이지에서 og:image 추출 */
async function fetchOgImage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const html = await res.text();
    const ogMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["'](.*?)["']/i)
      ?? html.match(/<meta\s+content=["'](.*?)["']\s+property=["']og:image["']/i);
    return ogMatch?.[1] ?? null;
  } catch {
    return null;
  }
}

/** 티스토리 최신 글 + 썸네일 가져오기 */
export async function fetchTistoryPosts(): Promise<TistoryPost[]> {
  try {
    const res = await fetch(RSS_URL, { next: { revalidate: 3600 } });
    const xml = await res.text();
    const items = parseRss(xml);

    const posts = await Promise.all(
      items.map(async (item) => ({
        title: item.title,
        link: item.link,
        thumbnail: await fetchOgImage(item.link),
      }))
    );

    return posts;
  } catch {
    return [];
  }
}
