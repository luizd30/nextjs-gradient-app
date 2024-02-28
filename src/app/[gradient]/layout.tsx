import { Header } from "@/components/header";
import { ColorProvider } from "@/context/color-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-full">
      <ColorProvider>
        <Header></Header>
        {children}
      </ColorProvider>
    </div>
  );
}
