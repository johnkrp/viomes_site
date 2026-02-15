import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShoppingCart, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  FileText, 
  Package, 
  Maximize2,
  Info,
  CheckCircle2,
  Share2,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductDetail = () => {
  const [activeImage, setActiveImage] = useState(0);
  
  const product = {
    name: 'Storage Box Pro 45L',
    code: 'V-1024',
    price: '12.90€',
    description: 'Υψηλής ποιότητας κουτί αποθήκευσης με καπάκι που ασφαλίζει. Ιδανικό για οργάνωση σπιτιού και επαγγελματική χρήση. Κατασκευασμένο από ανθεκτικό πολυπροπυλένιο (PP), προσφέρει μέγιστη προστασία και δυνατότητα στοίβαξης.',
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1530124560676-4fbc91abc6f2?auto=format&fit=crop&q=80&w=800',
    ],
    specs: [
      { label: 'Υλικό', value: 'PP (Πολυπροπυλένιο)' },
      { label: 'Διαστάσεις', value: '60 x 40 x 30 cm' },
      { label: 'Χωρητικότητα', value: '45 Λίτρα' },
      { label: 'Βάρος', value: '1.2 kg' },
      { label: 'Συσκευασία', value: '10 τεμάχια / κιβώτιο' },
      { label: 'MOQ (B2B)', value: '100 τεμάχια' },
    ],
    features: [
      'Stackable design for space saving',
      'Secure snap-lock lid',
      'BPA Free & Food Grade',
      'High impact resistance',
      'Recyclable material',
    ]
  };

  const relatedProducts = [
    { name: 'Storage Box Pro 30L', code: 'V-1023', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=400' },
    { name: 'Drawer Organizer', code: 'V-2022', image: 'https://images.unsplash.com/photo-1594913785162-e6786b42eda8?auto=format&fit=crop&q=80&w=400' },
    { name: 'Labeling Set', code: 'V-9010', image: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=400' },
    { name: 'Divider Kit', code: 'V-1024-D', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="hover:text-accent">Αρχική</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products" className="hover:text-accent">Προϊόντα</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products/household" className="hover:text-accent">Οικιακά</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Gallery Column */}
            <div className="space-y-6">
              <div className="relative group aspect-square rounded-3xl overflow-hidden bg-secondary/20 border border-border/50">
                <img 
                  src={product.images[activeImage]} 
                  alt={product.name} 
                  className="w-full h-full object-cover animate-fade-in"
                />
                <Button variant="secondary" size="icon" className="absolute bottom-6 right-6 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-5 h-5" />
                </Button>
                <div className="absolute inset-y-0 left-0 flex items-center p-4">
                   <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full bg-white/50 backdrop-blur-md hover:bg-white"
                    onClick={() => setActiveImage((prev) => (prev > 0 ? prev - 1 : product.images.length - 1))}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center p-4">
                   <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full bg-white/50 backdrop-blur-md hover:bg-white"
                    onClick={() => setActiveImage((prev) => (prev < product.images.length - 1 ? prev + 1 : 0))}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((img, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0",
                      activeImage === i ? "border-accent shadow-md scale-105" : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <img src={img} alt={`${product.name} ${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info Column */}
            <div className="flex flex-col">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-none rounded-md px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    In Stock
                  </Badge>
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest border-l pl-3">
                    Code: {product.code}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">{product.name}</h1>
                <p className="text-3xl font-black text-accent mb-6">{product.price}</p>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                <div className="flex flex-col gap-4">
                  <Button size="lg" className="h-14 bg-primary hover:bg-primary/90 text-white rounded-full text-lg font-bold gap-3 shadow-lg shadow-primary/20">
                    <ShoppingCart className="w-5 h-5" />
                    Στο καλάθι
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 border-2 border-primary text-primary hover:bg-primary/5 rounded-full text-lg font-bold">
                    Ζητήστε Προσφορά
                  </Button>
                </div>
                <div className="flex flex-col gap-2 p-6 bg-secondary/30 rounded-3xl border border-border/50">
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground mb-2 uppercase tracking-widest">
                    <Info className="w-4 h-4 text-accent" />
                    B2B Υποστήριξη
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Είστε επαγγελματίας; Επικοινωνήστε μαζί μας για τιμές χονδρικής και ειδικές παραγγελίες.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-6 border-t border-border/50">
                <button className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-accent transition-colors">
                  <Heart className="w-5 h-5" />
                  Προσθήκη στα Αγαπημένα
                </button>
                <button className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-accent transition-colors">
                  <Share2 className="w-5 h-5" />
                  Κοινοποίηση
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="specs" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-white p-1 rounded-full border border-border/50 h-14 shadow-sm">
                <TabsTrigger value="specs" className="rounded-full px-8 h-12 data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-bold">Προδιαγραφές</TabsTrigger>
                <TabsTrigger value="features" className="rounded-full px-8 h-12 data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-bold">Χαρακτηριστικά</TabsTrigger>
                <TabsTrigger value="downloads" className="rounded-full px-8 h-12 data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-bold">Downloads</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="specs" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="max-w-3xl mx-auto bg-white rounded-3xl p-10 shadow-elegant border border-border/50">
                <table className="w-full">
                  <tbody>
                    {product.specs.map((spec, i) => (
                      <tr key={i} className={cn("border-b border-border/50", i === product.specs.length - 1 ? "border-0" : "")}>
                        <td className="py-4 font-bold text-primary w-1/3">{spec.label}</td>
                        <td className="py-4 text-muted-foreground">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="features" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.features.map((feature, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 flex items-start gap-4 shadow-sm border border-border/50">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                    <span className="font-medium text-primary">{feature}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="downloads" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="max-w-3xl mx-auto flex flex-col gap-4">
                <div className="bg-white rounded-2xl p-6 flex items-center justify-between shadow-sm border border-border/50 hover:border-accent transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold">Τεχνικό Φυλλάδιο (PDF)</h4>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest">2.4 MB | Last updated: 2024</p>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-y-1 transition-all" />
                </div>
                <div className="bg-white rounded-2xl p-6 flex items-center justify-between shadow-sm border border-border/50 hover:border-accent transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
                      <Package className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold">Logistics & Packaging Info</h4>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest">1.1 MB | Last updated: 2024</p>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-y-1 transition-all" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-24">
        <div className="container mx-auto px-4 flex flex-col items-center mb-16">
          <h2 className="text-3xl font-black tracking-tight mb-4">Σχετικά Προϊόντα</h2>
          <div className="w-16 h-1 bg-accent rounded-full" />
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((p, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-square rounded-2xl overflow-hidden bg-secondary/20 border border-border/50 mb-4 relative">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />
              </div>
              <h4 className="font-bold mb-1 group-hover:text-accent transition-colors">{p.name}</h4>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">{p.code}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
