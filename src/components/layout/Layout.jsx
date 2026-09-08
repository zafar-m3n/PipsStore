import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar.jsx";
import { Footer } from "@/components/layout/Footer.jsx";

/* Persistent Navbar + Footer shell for every route. */
export function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-pips-bg">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
