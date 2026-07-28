import type { AbstractIntlMessages } from "next-intl";

// 클라이언트로 넘길 네임스페이스만 골라 NextIntlClientProvider payload 축소.
// 서버 컴포넌트는 서버 config에서 읽으므로 영향 없음.
export function pickMessages(
  messages: AbstractIntlMessages,
  namespaces: string[],
): AbstractIntlMessages {
  const result: AbstractIntlMessages = {};
  for (const ns of namespaces) {
    if (ns in messages) result[ns] = messages[ns];
  }
  return result;
}
