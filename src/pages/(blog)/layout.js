
import { Ubuntu } from "next/font/google";

const inter = Ubuntu({ weight: "300", subsets: ["latin"] });

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
