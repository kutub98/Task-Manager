import Navbar from "./components/Navbar";
import "./globals.css";

import { ReactNode } from "react";

export const metadata = { title: "Smart Task Manager" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className=" mx-auto px-6">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
