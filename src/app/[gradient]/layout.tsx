import { Header } from "@/components/header";
import { ColorProvider } from "@/context/color-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <ColorProvider>
        <Header></Header>
        {children}
        </ColorProvider>
    </div>
  );
}
