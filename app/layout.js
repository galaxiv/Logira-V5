import "./globals.css";

export const metadata = {
  title: "Logira",
  description: "Where thinking feels natural",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
