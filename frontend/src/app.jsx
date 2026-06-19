import { BrowserRouter, Route, Routes } from "react-router-dom";

import PublicLayout from "./layouts/public-layout";
import AdminLayout from "./layouts/admin-layout";

import Home from "./pages/home";
import Umrah from "./pages/umrah";
import Hajj from "./pages/hajj";
import Visa from "./pages/visa";
import Contact from "./pages/contact";
import FeaturedUmrah from "./pages/featured-umrah";
import PackageDetail from "./pages/package-detail";

import Login from "./pages/login";

import Dashboard from "./pages/admin/dashboard";
import HajjPackages from "./pages/admin/hajj-packages";
import UmrahPackages from "./pages/admin/umrah-packages";
import AdminInquiries from "./pages/admin/inquiries";

import ScrollToTop from "./components/scroll-to-top";
import ComingSoon from "./components/coming-soon";
import ProtectedRoute from "./guards/protected-route";

import { AuthProvider } from "./context/auth-context";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="no-scroll">
          <ScrollToTop />

          <Routes>
            {/* LOGIN */}
            <Route path="/login" element={<Login />} />

            {/* ADMIN — protected, renders inside AdminLayout */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="hajj-packages" element={<HajjPackages />} />
              <Route path="umrah-packages" element={<UmrahPackages />} />
              <Route path="inquiries" element={<AdminInquiries />} />
            </Route>

            {/* PUBLIC SITE */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="umrah" element={<Umrah />} />
              
              {/* Dynamic route catching the package ID */}
              <Route path="umrah/:id" element={<PackageDetail />} />
              
              <Route path="featured-umrah-packages" element={<FeaturedUmrah />} />
              <Route path="hajj" element={<Hajj />} />
              <Route path="visa" element={<Visa />} />
              <Route path="contact-us" element={<Contact />} />

              <Route path="soon" element={<ComingSoon />} />
              <Route path="*" element={<ComingSoon />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;