import "./globals.css";
import Providers from "./Providers";

export const metadata = {
  title: "OTC Market",
  description: "OTC Market",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bgImg">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
