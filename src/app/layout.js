import "../styles/globals.scss";
import HeaderWrapper from "../layouts/Header/HeaderWrapper.jsx";
import Footer from "../layouts/Footer/Footer.jsx";
import { ShopProvider } from "../context/ShopContext.jsx";

export const metadata = {
  title: "Stone Island Store",
  description: "Интернет-магазин премиальной одежды",
  formatDetection: {
    telephone: false,
    date: false,
    email: false,
    address: false,
  },
};



export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <ShopProvider>
          <HeaderWrapper />
          <main className="main-content">{children}</main>
          <Footer />
        </ShopProvider>
      </body>
    </html>
  );
}