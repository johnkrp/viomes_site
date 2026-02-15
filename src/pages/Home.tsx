import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Factory, Truck, CheckCircle2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Search, User, Globe, Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Home = () => {
  const categories = [
    { title: 'Οικιακά & Αποθήκευση', en: 'Household & Storage', image: 'https://v3b.fal.media/files/b/0a8e4e5b/avWYgEBa80l0zBpSkcjX5_6Uir9IRV.png' },
    { title: 'Κουζίνα & Οργάνωση', en: 'Kitchen & Organization', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800' },
    { title: 'Καθαρισμός', en: 'Cleaning', image: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=800' },
    { title: 'Βιομηχανικά Προϊόντα', en: 'Industrial Products', image: 'https://v3b.fal.media/files/b/0a8e4e5b/a4QGBjH7ig_iFAgLmGjHy_M9Fh1dBc.png' },
    { title: 'Custom & Private Label', en: 'Custom & Private Label', image: 'https://images.unsplash.com/photo-1530124560676-4fbc91abc6f2?auto=format&fit=crop&q=80&w=800' },
  ];

  const features = [
    { title: 'Κορυφαία Ποιότητα', desc: 'Χρήση πρωτογενών υλικών υψηλής αντοχής για μέγιστη διάρκεια ζωής.', icon: ShieldCheck },
    { title: 'Μεγάλη Παραγωγή', desc: 'Σύγχρονες γραμμές παραγωγής με δυνατότητα κάλυψης μεγάλων παραγγελιών.', icon: Factory },
    { title: 'Private Label', desc: 'Εξειδίκευση στην παραγωγή προϊόντων με το δικό σας brand.', icon: Zap },
    { title: 'Άμεση Παράδοση', desc: 'Μεγάλο απόθεμα και ιδιόκτητος στόλος για γρήγορη εξυπηρέτηση.', icon: Truck },
  ];

  const featuredProducts = [
    { name: 'Storage Box Pro 45L', price: '12.90€', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=400' },
    { name: 'Kitchen Organizer Set', price: '24.50€', image: 'https://images.unsplash.com/photo-1594913785162-e6786b42eda8?auto=format&fit=crop&q=80&w=400' },
    { name: 'Industrial Crate XL', price: '18.00€', image: 'https://images.unsplash.com/photo-1530124560676-4fbc91abc6f2?auto=format&fit=crop&q=80&w=400' },
    { name: 'Cleaning Bucket 15L', price: '8.90€', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400' },
    { name: 'Modular Shelf Unit', price: '45.00€', image: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center pt-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://v3b.fal.media/files/b/0a8e4e59/OfAX0aNsLnRXJfrKzLjj3_WfvAFjNB.png" 
            alt="Viomes Factory & Products" 
            className="w-full h-full object-cover scale-105 animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white">
            <span className="inline-block px-4 py-1.5 bg-accent text-white text-xs font-bold rounded-full mb-6 tracking-wider uppercase animate-slide-up">
              Est. 1978 | EU Manufacturing
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6 animate-slide-up [animation-delay:100ms]">
              Πλαστικά Προϊόντα <br />
              <span className="text-accent">Υψηλής Ποιότητας.</span>
            </h1>
            <p className="text-xl text-white/80 mb-10 leading-relaxed animate-slide-up [animation-delay:200ms]">
              Κορυφαίες λύσεις για το σπίτι και τη βιομηχανία. Σχεδιάζουμε και παράγουμε στην Ελλάδα με σεβασμό στο περιβάλλον.
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up [animation-delay:300ms]">
              <Link to="/products">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-8 h-14 rounded-full text-lg group">
                  Προϊόντα
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-14 px-8 rounded-full text-lg">
                Ζητήστε Προσφορά
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tiles */}
      <section className="py-24 bg-white" id="products">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-black tracking-tight mb-4">Κατηγορίες Προϊόντων</h2>
              <p className="text-muted-foreground leading-relaxed">
                Εξερευνήστε τη μεγάλη γκάμα προϊόντων μας για κάθε ανάγκη. Από οικιακά είδη μέχρι εξειδικευμένες βιομηχανικές λύσεις.
              </p>
            </div>
            <Button variant="link" className="text-accent font-bold group p-0">
              Δείτε όλες τις κατηγορίες <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <Link 
                key={i} 
                to="/products"
                className={cn(
                  "group relative overflow-hidden rounded-2xl h-[400px] cursor-pointer",
                  i === 0 ? "md:col-span-2" : ""
                )}
              >
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">{cat.en}</span>
                  <h3 className="text-2xl font-bold mb-4">{cat.title}</h3>
                  <div className="h-1 w-12 bg-accent group-hover:w-24 transition-all duration-500" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Viomes */}
      <section className="py-24 bg-secondary" id="quality">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-4xl font-black tracking-tight mb-4">Γιατί VIOMES;</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Δέσμευσή μας είναι η αριστεία σε κάθε στάδιο της παραγωγής, προσφέροντας προϊόντα που αντέχουν στο χρόνο.
          </p>
        </div>

        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <Card key={i} className="border-none shadow-elegant hover:shadow-lg transition-all duration-300 group overflow-hidden">
              <CardContent className="p-8 pt-10 relative">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <feature.icon className="w-24 h-24" />
                </div>
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-500">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold mb-3">{feature.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col items-center mb-12">
          <h2 className="text-4xl font-black tracking-tight mb-4">Δημοφιλή Προϊόντα</h2>
          <div className="w-24 h-1.5 bg-accent rounded-full" />
        </div>

        <div className="container mx-auto px-4">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-7xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {featuredProducts.map((product, i) => (
                <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/4">
                  <Link to={`/products/${i + 1}`} className="group block border rounded-2xl overflow-hidden bg-white hover:border-accent transition-all duration-300 shadow-sm hover:shadow-md">
                    <div className="aspect-square overflow-hidden relative">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                      <div className="absolute top-4 right-4">
                        <Button variant="secondary" size="icon" className="rounded-full shadow-sm bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          <ShoppingCart className="w-4 h-4 text-primary" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-6">
                      <h5 className="font-bold text-lg mb-1">{product.name}</h5>
                      <p className="text-accent font-black">{product.price}</p>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-12">
              <CarouselPrevious className="static translate-y-0 h-12 w-12 border-2" />
              <CarouselNext className="static translate-y-0 h-12 w-12 border-2" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none">
           <img 
            src="https://v3b.fal.media/files/b/0a8e4e5b/aG9W4QPU_6VT-E5efRjNa_mWgtvmrb.png" 
            alt="Sustainability" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black mb-6">Βιωσιμότητα & Ευθύνη</h2>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              Στην VIOMES, η παραγωγή μας ευθυγραμμίζεται με τις αρχές της κυκλικής οικονομίας. Χρησιμοποιούμε ανακυκλωμένα υλικά και βελτιστοποιούμε τις διαδικασίες μας για την ελαχιστοποίηση του περιβαλλοντικού αποτυπώματος.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-accent w-6 h-6" />
                <span className="font-medium">100% Ανακυκλώσιμα Υλικά</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-accent w-6 h-6" />
                <span className="font-medium">Εξοικονόμηση Ενέργειας</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-accent w-6 h-6" />
                <span className="font-medium">Μηδενικά Απόβλητα</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-accent w-6 h-6" />
                <span className="font-medium">Πιστοποίηση ISO 14001</span>
              </div>
            </div>
            <Button className="bg-white text-primary hover:bg-white/90 rounded-full px-8 h-12 font-bold uppercase tracking-widest text-xs">
              Μάθετε περισσότερα
            </Button>
          </div>
        </div>
      </section>

      {/* Logos Strip */}
      <section className="py-16 bg-white border-b">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-10">Trusted by Global Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
             <span className="text-2xl font-bold text-primary italic">PARTNER_1</span>
             <span className="text-2xl font-bold text-primary italic">PARTNER_2</span>
             <span className="text-2xl font-bold text-primary italic">PARTNER_3</span>
             <span className="text-2xl font-bold text-primary italic">PARTNER_4</span>
             <span className="text-2xl font-bold text-primary italic">PARTNER_5</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;