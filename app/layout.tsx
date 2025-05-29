import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          suppressHydrationWarning
        >
          {" "}
          <header className="flex justify-between items-center p-4 h-16">
            <Toaster />
            <nav className="flex gap-6">
              <SignedIn>
                <Link className="hover:text-blue-500" href="/schedule">
                  Schedule Calls
                </Link>
                <Link className="hover:text-blue-500" href="/analytics">
                  Analytics
                </Link>
                <Link className="hover:text-blue-500" href="/call-records">
                  Call Records
                </Link>
              </SignedIn>
            </nav>
            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton
                  forceRedirectUrl="/auth-callback"
                  signUpForceRedirectUrl="/auth-callback"
                />
                <SignUpButton signInForceRedirectUrl="/auth-callback" />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
