import type { Metadata } from "next";
import { Geist, Geist_Mono, Playwrite_ES, Rowdies } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Script from "next/script";
import { Afacad_Flux } from "next/font/google";
import { Bounce, ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const afacad_Flux = Afacad_Flux({
  variable: "--font-afacad-flux",
  display: 'swap',
  subsets: ["latin"],
});
const playwrite_ES = Playwrite_ES({
  variable: "--font-playwrite-es",
  display: 'swap',
});
const rowdies = Rowdies({
  variable: "--font-rowdies",
  display: 'swap',
  subsets: ['latin'],
  weight:"400"
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rowdies.variable} ${playwrite_ES.variable} ${geistSans.variable} ${geistMono.variable} ${afacad_Flux.variable} antialiased`}
      >
        <script src="https://sdk.mercadopago.com/js/v2"></script>
        <GoogleOAuthProvider clientId="1072765750170-3epf8sq91g6j4ihl8gm36lekkkke2iat.apps.googleusercontent.com">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
          />
        {children}
        </GoogleOAuthProvider>
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
