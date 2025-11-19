import "./globals.css";
import Navbar from "./components/Navbar";
import { ReactNode } from "react";

export const metadata = { title: "Smart Task Manager" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-6xl mx-auto p-6">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
