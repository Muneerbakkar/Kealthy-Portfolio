import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail"; // ✅ Import BlogDetail
import { HelmetProvider } from "react-helmet-async";
import DownloadRedirect from "./components/DownloadRedirect";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/download" element={<DownloadRedirect />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="careers" element={<Careers />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:id" element={<BlogDetail />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
