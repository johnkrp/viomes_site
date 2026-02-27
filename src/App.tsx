import { Toaster } from "@/components/ui/sonner";
import { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/layout/ScrollToTop";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const CategoryHomeItems = lazy(() => import("./pages/CategoryHomeItems"));
const CategoryPlanters = lazy(() => import("./pages/CategoryPlanters"));
const CategoryProfessional = lazy(() => import("./pages/CategoryProfessional"));
const About = lazy(() => import("./pages/About"));
const Sustainability = lazy(() => import("./pages/Sustainability"));
const Contact = lazy(() => import("./pages/Contact"));

// Loading component
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-background">
    <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/eidi-spitioy" element={<CategoryHomeItems />} />
            <Route path="/products/glastres" element={<CategoryPlanters />} />
            <Route
              path="/products/epaggelmatikos-eksoplismos"
              element={<CategoryProfessional />}
            />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/quality" element={<About />} />
            <Route path="/industries" element={<Home />} />
            <Route path="/news" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </Layout>
      <Toaster position="top-right" richColors />
    </Router>
  );
}

export default App;
