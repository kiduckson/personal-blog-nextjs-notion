export const siteTitle = "kds notion blog";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content="notion blog" />
      {/* 나중에 open graph image 넣는곳; og: embedded img */}
      <meta property="og:image" content={"#"} />
      <meta property="og:title" content={siteTitle} />
      {/* 트위터에 임베드 될때 다른 소셜미디어도 추가하기 */}
      <meta name="twitter:card" content="summary_large_image" />
    </div>
  );
}
