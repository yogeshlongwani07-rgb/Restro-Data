import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Nav/Navbar";
import Footer from "./footer";
import { locationContext } from "./functions/Context";

/**
 * Layout wraps every page with:
 *  - Navbar (always visible at top)
 *  - Footer (always visible on all pages EXCEPT "/" home page)
 *  - On home page ("/") the footer is fixed at the bottom and only
 *    peeks in when the user scrolls UP (like a reveal-on-scroll-up footer)
 */
export default function Layout({ children, islocation, setIslocation }) {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  /* Track scroll direction for home-page footer reveal */
  const [footerVisible, setFooterVisible] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (!isHome) return;

    function handleScroll() {
      const currentY = window.scrollY;
      const scrollingUp = currentY < lastScrollY.current;
      lastScrollY.current = currentY;

      // Show footer only when scrolling UP and not at very top
      if (scrollingUp && currentY > 60) {
        setFooterVisible(true);
      } else {
        setFooterVisible(false);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <locationContext.Provider value={{ islocation, setIslocation }}>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navbar />
        <main style={{ flex: 1, paddingTop: "50px" }}>{children}</main>

        {isHome ? (
          /* Home page: footer slides up from bottom on scroll-up */
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 900,
              transform: footerVisible ? "translateY(0)" : "translateY(100%)",
              transition: "transform 0.38s cubic-bezier(0.22, 1, 0.36, 1)",
              willChange: "transform",
            }}
          >
            <Footer />
          </div>
        ) : (
          /* All other pages: footer sits naturally at bottom */
          <Footer />
        )}
      </div>
    </locationContext.Provider>
  );
}
