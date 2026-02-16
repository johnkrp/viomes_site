import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ArrowRight,
  CheckCircle2,
  Factory,
  ShieldCheck,
  Truck,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    "/SCROLL1(1).JPG",
    "/AND_6099.JPG",
    "/DSC_3421.JPG",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const categories = [
    {
      title: "Είδη Σπιτιού",
      en: "Home Items",
      image: "/ΕΙΔΗ ΣΠΙΤΙΟΥ.JPG",
    },
    {
      title: "Γλάστρες",
      en: "Planters",
      image: "/ΓΛΑΣΤΡΕΣ.JPG",
    },
    {
      title: "Επαγγελματικός Εξοπλισμός",
      en: "Professional Equipment",
      image: "/ΚΑΔΟΙ.JPG",
    },
  ];

  const features = [
    {
      title: "Κορυφαία Ποιότητα",
      desc: "Χρήση πρωτογενών υλικών υψηλής αντοχής για μέγιστη διάρκεια ζωής.",
      icon: ShieldCheck,
    },
    {
      title: "Μεγάλη Παραγωγή",
      desc: "Σύγχρονες γραμμές παραγωγής με δυνατότητα κάλυψης μεγάλων παραγγελιών.",
      icon: Factory,
    },
    {
      title: "Private Label",
      desc: "Εξειδίκευση στην παραγωγή προϊόντων με το δικό σας brand.",
      icon: Zap,
    },
    {
      title: "Άμεση Παράδοση",
      desc: "Μεγάλο απόθεμα και ιδιόκτητος στόλος για γρήγορη εξυπηρέτηση.",
      icon: Truck,
    },
  ];

  const featuredProducts = [
    {
      name: "Storage Box Pro 45L",
      price: "12.90€",
      image:
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Kitchen Organizer Set",
      price: "24.50€",
      image:
        "https://images.unsplash.com/photo-1594913785162-e6786b42eda8?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Industrial Crate XL",
      price: "18.00€",
      image:
        "https://images.unsplash.com/photo-1530124560676-4fbc91abc6f2?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Cleaning Bucket 15L",
      price: "8.90€",
      image:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Modular Shelf Unit",
      price: "45.00€",
      image:
        "https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=400",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center bg-background overflow-hidden">
        <div className="w-1/2 px-12 relative z-10 flex flex-col justify-center h-full">
          <div className="text-foreground">
            <span className="inline-block px-4 py-1.5 bg-accent text-white text-xs font-bold rounded-full mb-6 tracking-wider uppercase animate-slide-up">
              Est. 1978 | EU Manufacturing
            </span>
            <h1 className="text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6 animate-slide-up [animation-delay:100ms] text-foreground">
              Πλαστικά Προϊόντα Υψηλής Ποιότητας.
            </h1>
            <p className="text-lg text-foreground/70 mb-10 leading-relaxed animate-slide-up [animation-delay:200ms] max-w-lg">
              Κορυφαίες λύσεις για το σπίτι και τη βιομηχανία. Σχεδιάζουμε και
              παράγουμε στην Ελλάδα με σεβασμό στο περιβάλλον.
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up [animation-delay:300ms]">
              <Link to="/products">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-white px-8 h-14 rounded-full text-lg group"
                >
                  Προϊόντα
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="bg-white border-2 border-accent text-accent hover:bg-accent/5 h-14 px-8 rounded-full text-lg font-semibold"
              >
                Ζητήστε Προσφορά
              </Button>
            </div>
          </div>
        </div>

        {/* Image - Right Side - Full Width (with top/bottom inset to avoid touching the page top) */}
        <div className="hidden lg:block absolute right-0 top-20 bottom-12 w-1/2 overflow-hidden bg-muted rounded-bl-[40px]">
          <img
            key={currentImageIndex}
            src={heroImages[currentImageIndex]}
            alt="Viomes Factory & Products"
            className="w-full h-full object-cover animate-fade-in transition-all duration-1000 ease-in-out hover:scale-105"
            style={{
              animation: `fadeInScale 0.8s ease-in-out forwards`,
            }}
          />
        </div>
      </section>

      {/* Category Tiles */}
      <section className="py-24 bg-background" id="products">
        <div className="px-12 lg:px-20">

          <div>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {categories.map((cat, i) => (
                  <CarouselItem
                    key={i}
                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <Link
                      to="/products"
                      className="group block border rounded-2xl overflow-hidden bg-white text-foreground hover:border-accent transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <div className="aspect-square overflow-hidden relative">
                        <img
                          src={cat.image}
                          alt={cat.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <span className="text-sm text-foreground/70 block mb-2">
                          {cat.en}
                        </span>
                        <h4 className="font-bold text-lg text-foreground mb-2">
                          {cat.title}
                        </h4>
                        <div className="flex items-center justify-between">
                          <Button
                            variant="link"
                            className="text-accent font-semibold p-0"
                          >
                            Δείτε προϊόντα
                          </Button>
                          <ArrowRight className="w-5 h-5 text-accent" />
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-4 mt-6">
                <CarouselPrevious className="static translate-y-0 h-10 w-10 border-2" />
                <CarouselNext className="static translate-y-0 h-10 w-10 border-2" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Sustainability Section (swapped sides) */}
      <section className="py-24 bg-background text-foreground relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10 px-8 lg:px-12 relative z-10">
          {/* Image on the left for large screens */}
          <div className="w-full lg:w-[54%] mb-10 lg:mb-0 flex-shrink-0">
            <div className="relative w-full h-64 lg:h-[400px] rounded-3xl overflow-hidden shadow-lg">
              <img
                src="/circular-economy.jpg"
                alt="Sustainability"
                className="w-full h-full object-cover"
                style={{ opacity: 0.9 }}
              />
              <div className="absolute inset-0 bg-secondary opacity-20" />
            </div>
          </div>
          {/* Text on the right */}
          <div className="w-full lg:w-[46%] max-w-none">
            <h2 className="text-4xl font-black mb-6">Βιωσιμότητα & Ευθύνη</h2>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              Στην VIOMES, η παραγωγή μας ευθυγραμμίζεται με τις αρχές της
              κυκλικής οικονομίας. Χρησιμοποιούμε ανακυκλωμένα υλικά και
              βελτιστοποιούμε τις διαδικασίες μας για την ελαχιστοποίηση του
              περιβαλλοντικού αποτυπώματος.
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
            <Button className="bg-white text-secondary hover:bg-white/90 rounded-full px-8 h-12 font-bold uppercase tracking-widest text-xs">
              Μάθετε περισσότερα
            </Button>
          </div>
        </div>
      </section>

      {/* News / Blog Section */}
      <section className="py-24 bg-primary text-primary-foreground" id="news">
        <div className="px-12 lg:px-20">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-black tracking-tight mb-2">
                Νέα & Άρθρα
              </h2>
              <p className="text-primary-foreground/80">
                Τελευταίες ειδήσεις από την VIOMES
              </p>
            </div>
            <Button variant="link" className="text-primary-foreground font-bold">
              Δείτε όλα
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/** Sample posts rendered; replace with CMS data when available */}
            {[
              {
                title: "Νέα γραμμή παραγωγής με χαμηλότερο αποτύπωμα",
                date: "2026-02-01",
                excerpt:
                  "Εγκαταστήσαμε μια νέα γραμμή παραγωγής που μειώνει την κατανάλωση ενέργειας.",
                image:
                  "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=800",
              },
              {
                title: "Συνεργασία με διεθνή εταίρο",
                date: "2026-01-15",
                excerpt: "Νέα συνεργασία για επέκταση σε ευρωπαϊκές αγορές.",
                image:
                  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
              },
              {
                title: "Οδηγός για την ανακύκλωση πλαστικών προϊόντων",
                date: "2025-12-20",
                excerpt:
                  "Συμβουλές για σωστή διαχείριση και ανακύκλωση προϊόντων στο σπίτι.",
                image:
                  "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=800",
              },
            ].map((post, i) => (
              <article
                key={i}
                className="group border rounded-2xl overflow-hidden bg-background text-foreground hover:shadow-md transition-all"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <p className="text-xs text-muted-foreground mb-2">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                  <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {post.excerpt}
                  </p>
                  <Button
                    variant="link"
                    className="text-accent font-semibold p-0"
                  >
                    Διαβάστε περισσότερα →
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Removed Featured Products and duplicate Sustainability section per request */}
    </div>
  );
};

export default Home;


