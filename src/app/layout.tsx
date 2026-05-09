import type { Metadata } from "next";
import "./globals.css";
import AppProviders from "@/components/providers/AppProviders";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Niloy | Portfolio",
  description: "Personal portfolio website of Naeem Biswass Niloy.",
    icons: {
        icon: "/favicon.svg",
    }
};


type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <CustomCursor />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
