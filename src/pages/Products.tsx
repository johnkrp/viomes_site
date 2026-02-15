import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/check-box";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ChevronDown,
  Filter,
  LayoutGrid,
  List,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const products = [
    {
      id: 1,
      name: "Storage Box Pro 45L",
      code: "V-1024",
      material: "PP",
      size: "60x40x30cm",
      image:
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 2,
      name: "Kitchen Organizer Set",
      code: "V-2055",
      material: "PET",
      size: "Various",
      image:
        "https://images.unsplash.com/photo-1594913785162-e6786b42eda8?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 3,
      name: "Industrial Crate XL",
      code: "V-5080",
      material: "HDPE",
      size: "80x60x40cm",
      image:
        "https://images.unsplash.com/photo-1530124560676-4fbc91abc6f2?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 4,
      name: "Cleaning Bucket 15L",
      code: "V-3012",
      material: "PP",
      size: "Ø32cm",
      image:
        "https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 5,
      name: "Modular Shelf Unit",
      code: "V-4040",
      material: "PP",
      size: "120x40x180cm",
      image:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 6,
      name: "Garden Pot 30cm",
      code: "V-6030",
      material: "PP",
      size: "Ø30cm",
      image:
        "https://images.unsplash.com/photo-1592150621344-828ec9639a0c?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 7,
      name: "Waste Bin 60L",
      code: "V-3060",
      material: "HDPE",
      size: "40x40x70cm",
      image:
        "https://images.unsplash.com/photo-1530124560676-4fbc91abc6f2?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 8,
      name: "Drawer Organizer",
      code: "V-2022",
      material: "PS",
      size: "10x30x5cm",
      image:
        "https://images.unsplash.com/photo-1594913785162-e6786b42eda8?auto=format&fit=crop&q=80&w=400",
    },
  ];

  const filters = [
    {
      title: "Κατηγορία",
      options: ["Αποθήκευση", "Κουζίνα", "Καθαρισμός", "Βιομηχανικά", "Κήπος"],
    },
    {
      title: "Υλικό",
      options: ["PP (Πολυπροπυλένιο)", "HDPE", "PET", "PS (Πολυστυρένιο)"],
    },
    { title: "Χρήση", options: ["Οικιακή", "Επαγγελματική", "Βιομηχανική"] },
    {
      title: "Χρώμα",
      options: ["Λευκό", "Διαφανές", "Γκρι", "Μπλε", "Πράσινο"],
    },
  ];

  return (
    <div className="pt-24 min-h-screen bg-secondary/30">
      {/* Category Hero */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1530124560676-4fbc91abc6f2?auto=format&fit=crop&q=80&w=1200"
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/"
                  className="text-white/60 hover:text-white"
                >
                  Αρχική
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/40" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">Προϊόντα</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-5xl font-black tracking-tight">
            Όλα τα Προϊόντα
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:w-72 shrink-0">
            <div className="bg-white rounded-2xl p-8 sticky top-28 shadow-sm border border-border/50">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Filter className="w-4 h-4 text-accent" />
                  Φίλτρα
                </h3>
                <Button
                  variant="link"
                  className="text-xs text-muted-foreground p-0 h-auto"
                >
                  Καθαρισμός
                </Button>
              </div>

              <div className="flex flex-col gap-8">
                {filters.map((filter, i) => (
                  <div key={i}>
                    <h4 className="text-sm font-bold mb-4 flex items-center justify-between group cursor-pointer">
                      {filter.title}
                      <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </h4>
                    <div className="flex flex-col gap-3">
                      {filter.options.map((opt, j) => (
                        <div key={j} className="flex items-center space-x-3">
                          <Checkbox
                            id={`${i}-${j}`}
                            className="rounded border-border data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                          />
                          <label
                            htmlFor={`${i}-${j}`}
                            className="text-sm text-muted-foreground cursor-pointer hover:text-primary transition-colors"
                          >
                            {opt}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full mt-8 bg-primary hover:bg-primary/90 text-white rounded-full">
                Εφαρμογή
              </Button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border border-border/50 shadow-sm">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="font-medium text-primary">124</span> προϊόντα
                βρέθηκαν
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg overflow-hidden mr-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "rounded-none h-9 w-9",
                      viewMode === "grid" ? "bg-secondary text-primary" : "",
                    )}
                    onClick={() => setViewMode("grid")}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "rounded-none h-9 w-9 border-l",
                      viewMode === "list" ? "bg-secondary text-primary" : "",
                    )}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                <Select defaultValue="popular">
                  <SelectTrigger className="w-[180px] h-9 rounded-lg">
                    <SelectValue placeholder="Ταξινόμηση" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Δημοφιλή</SelectItem>
                    <SelectItem value="newest">Νεότερα</SelectItem>
                    <SelectItem value="price-low">
                      Τιμή: Χαμηλή σε Υψηλή
                    </SelectItem>
                    <SelectItem value="price-high">
                      Τιμή: Υψηλή σε Χαμηλή
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Product Grid */}
            <div
              className={cn(
                "grid gap-8",
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1",
              )}
            >
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className={cn(
                    "group bg-white rounded-2xl border border-border/50 overflow-hidden hover:border-accent transition-all duration-300 hover:shadow-elegant",
                    viewMode === "list" ? "flex flex-col md:flex-row" : "",
                  )}
                >
                  <div
                    className={cn(
                      "relative overflow-hidden bg-secondary/20 flex items-center justify-center p-4",
                      viewMode === "list"
                        ? "md:w-64 md:h-64 shrink-0"
                        : "aspect-square",
                    )}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-xl transition-transform group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold text-muted-foreground border">
                        {product.code}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-between flex-1 text-left">
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
                        <div className="text-xs">
                          <span className="text-muted-foreground block mb-0.5 uppercase tracking-wider">
                            Υλικό
                          </span>
                          <span className="font-bold">{product.material}</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-muted-foreground block mb-0.5 uppercase tracking-wider">
                            Διαστάσεις
                          </span>
                          <span className="font-bold">{product.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-accent font-bold p-0 h-auto flex items-center group-hover:gap-3 transition-all">
                        Περισσότερα <ArrowRight className="ml-2 w-4 h-4" />
                      </div>
                      <Button
                        size="sm"
                        className="rounded-full bg-secondary text-primary hover:bg-accent hover:text-white transition-colors"
                        onClick={(e) => {
                          e.preventDefault(); /* cart logic */
                        }}
                      >
                        Στο καλάθι
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-16 flex justify-center gap-2">
              <Button variant="outline" className="w-10 h-10 p-0 rounded-lg">
                1
              </Button>
              <Button
                variant="ghost"
                className="w-10 h-10 p-0 rounded-lg text-muted-foreground"
              >
                2
              </Button>
              <Button
                variant="ghost"
                className="w-10 h-10 p-0 rounded-lg text-muted-foreground"
              >
                3
              </Button>
              <span className="w-10 h-10 flex items-center justify-center text-muted-foreground">
                ...
              </span>
              <Button
                variant="ghost"
                className="w-10 h-10 p-0 rounded-lg text-muted-foreground"
              >
                12
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
