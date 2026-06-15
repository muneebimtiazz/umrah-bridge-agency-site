import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function PublicLayout() {
  const location = useLocation();

  const darkRoutes = [
    "/visa",
    "/featured-umrah-packages",
    "/contact-us",
     "/umrah",
  ];

  const isDarkNav = darkRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen overflow-hidden text-gray-800">
      <nav
        className={
          isDarkNav
            ? "bg-linear-to-b from-white from-50% via-white via-60% to-transparent"
            : "absolute top-0 left-0 z-50 w-full"
        }
      >
        <div className="max-w-375 mx-auto px-4 sm:px-6 lg:px-8">
          <Navbar />
        </div>
      </nav>

      <main className="w-full mx-auto">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default PublicLayout;