import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEWS",
  description: "FE트레이닝센터 강남점 소식",
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
