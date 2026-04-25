import { Toaster } from "@/components/ui/sonner";
import { Suspense, lazy, useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
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

const ROUTE_SEO: Record<string, { title: string; description: string }> = {
  "/": {
    title: "VIOMES S.A. | Πλαστικά Προϊόντα Υψηλής Ποιότητας",
    description:
      "Κορυφαίες λύσεις πλαστικών προϊόντων για σπίτι και επαγγελματική χρήση, σχεδιασμένες και παραγόμενες στην Ελλάδα.",
  },
  "/products": {
    title: "Προϊόντα | VIOMES S.A.",
    description:
      "Ανακαλύψτε τη συλλογή προϊόντων VIOMES για σπίτι, κήπο και επαγγελματικές εφαρμογές.",
  },
  "/products/eidi-spitioy": {
    title: "Είδη Σπιτιού | VIOMES S.A.",
    description:
      "Πρακτικά και ανθεκτικά είδη σπιτιού με σύγχρονο σχεδιασμό και υψηλή ποιότητα κατασκευής.",
  },
  "/products/glastres": {
    title: "Γλάστρες | VIOMES S.A.",
    description:
      "Σειρά από γλάστρες και λύσεις κήπου για οικιακή και επαγγελματική χρήση.",
  },
  "/products/epaggelmatikos-eksoplismos": {
    title: "Επαγγελματικός Εξοπλισμός | VIOMES S.A.",
    description:
      "Επαγγελματικός εξοπλισμός υψηλής αντοχής για αποθήκευση, οργάνωση και καθημερινή χρήση.",
  },
  "/about": {
    title: "Η Εταιρεία | VIOMES S.A.",
    description:
      "Γνωρίστε την ιστορία, τις αξίες και τη δέσμευση της VIOMES στην ποιότητα και τη βιωσιμότητα.",
  },
  "/sustainability": {
    title: "Βιώσιμη Ανάπτυξη | VIOMES S.A.",
    description:
      "Δείτε τις πρωτοβουλίες βιώσιμης ανάπτυξης της VIOMES και τη στρατηγική μας για το περιβάλλον.",
  },
  "/contact": {
    title: "Επικοινωνία | VIOMES S.A.",
    description:
      "Επικοινωνήστε με την ομάδα VIOMES για πληροφορίες προϊόντων, συνεργασίες και υποστήριξη.",
  },
  "/quality": {
    title: "Ποιότητα | VIOMES S.A.",
    description:
      "Η δέσμευση της VIOMES στην ποιότητα, στις πιστοποιήσεις και στη συνεχή βελτίωση.",
  },
  "/industries": {
    title: "Κλάδοι Εφαρμογής | VIOMES S.A.",
    description:
      "Λύσεις πλαστικών προϊόντων για διαφορετικούς κλάδους εφαρμογής και ανάγκες αγοράς.",
  },
  "/news": {
    title: "Νέα & Άρθρα | VIOMES S.A.",
    description:
      "Τελευταία νέα, ενημερώσεις και άρθρα από την VIOMES για προϊόντα και βιωσιμότητα.",
  },
};

const DEFAULT_SEO = {
  title: "VIOMES S.A.",
  description:
    "VIOMES S.A. - Πλαστικά προϊόντα υψηλής ποιότητας για σπίτι και επαγγελματική χρήση.",
};

function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const isProductDetail =
      pathname.startsWith("/products/") && !ROUTE_SEO[pathname];
    const pageSeo = isProductDetail
      ? {
          title: "Λεπτομέρειες Προϊόντος | VIOMES S.A.",
          description:
            "Δείτε αναλυτικές πληροφορίες και τεχνικά χαρακτηριστικά προϊόντων VIOMES.",
        }
      : (ROUTE_SEO[pathname] ?? DEFAULT_SEO);

    document.title = pageSeo.title;

    let descriptionEl = document.querySelector('meta[name="description"]');
    if (!descriptionEl) {
      descriptionEl = document.createElement("meta");
      descriptionEl.setAttribute("name", "description");
      document.head.appendChild(descriptionEl);
    }
    descriptionEl.setAttribute("content", pageSeo.description);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <SeoManager />
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route
              path="/products/eidi-spitioy"
              element={<CategoryHomeItems />}
            />
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
