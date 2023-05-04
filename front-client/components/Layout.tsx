import Footer from "./Footer";
import Nav from "./Nav";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
