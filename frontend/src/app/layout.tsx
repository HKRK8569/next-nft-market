import Header from "@/components/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="h-screen w-screen flex flex-col">
        <Header />
        <div className="h-full w-full px-4">{children}</div>
      </body>
      <div></div>
    </html>
  );
}
