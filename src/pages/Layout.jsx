import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content (flex-grow pushes footer to bottom) */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Fixed Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
