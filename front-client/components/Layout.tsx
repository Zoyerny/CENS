import { useRouter } from "next/router";
import Footer from "./Footer";
import Nav from "./Nav";
import NavDashBord from "./nav/NavDashBord";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <>
      <Nav />
      <main>
        {router.pathname.startsWith("/acount/") ? (
          <div id="acount">
            <NavDashBord />
            <div id="comptePage">{children}</div>
          </div>
        ) : (
          <>{children}</>
        )}
      </main>
      <Footer />
    </>
  );
}
