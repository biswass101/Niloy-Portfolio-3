import type { Metadata } from "next";
import "./globals.css";
import AppProviders from "@/components/providers/AppProviders";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Niloy | Portfolio",
  description: "Personal portfolio website of Naeem Biswass Niloy.",
  icons: {
    icon: "/rLogo.png",
  },
};


type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  const year = new Date().getFullYear();

  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <CustomCursor />
        <AppProviders>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <footer className="relative z-20 border-t border-primary/25 bg-background/95 px-6 py-4 text-center font-mono text-xs text-foreground/85 backdrop-blur-sm md:px-12 lg:px-24">
              Copyright © {year} Naeem Biswass Niloy. All rights reserved.
            </footer>
          </div>
        </AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
