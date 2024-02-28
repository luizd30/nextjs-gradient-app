import { ColorProvider } from "@/context/color-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <ColorProvider>{children}</ColorProvider>
    </div>
  );
}
