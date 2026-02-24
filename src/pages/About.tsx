import React from 'react';
import { 
  History, 
  Target, 
  Users, 
  Globe2, 
  Lightbulb, 
  FlaskConical, 
  ClipboardCheck, 
  Ship,
  ArrowRight,
  Factory,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const About = () => {
  const stats = [
    { label: 'Έτος Ίδρυσης', value: '1978', icon: History },
    { label: 'Εξαγωγές σε Χώρες', value: '25+', icon: Globe2 },
    { label: 'Εξειδικευμένο Προσωπικό', value: '150+', icon: Users },
    { label: 'Γραμμές Παραγωγής', value: '24', icon: Factory },
  ];

  const timeline = [
    { year: '1978', title: 'Ίδρυση', desc: 'Η VIOMES ξεκινά την πορεία της στην Αθήνα, εστιάζοντας σε βασικά οικιακά είδη.' },
    { year: '1995', title: 'Νέες Εγκαταστάσεις', desc: 'Μεταφορά σε ιδιόκτητες εγκαταστάσεις στα Οινόφυτα και επέκταση της παραγωγής.' },
    { year: '2008', title: 'Τεχνολογική Αναβάθμιση', desc: 'Επένδυση σε υπερσύγχρονες μηχανές injection και αυτοματισμούς.' },
    { year: '2018', title: 'Εξαγωγικό Άνοιγμα', desc: 'Δυναμική παρουσία σε διεθνείς αγορές της Ευρώπης και της Μέσης Ανατολής.' },
    { year: '2024', title: 'Σήμερα', desc: 'Κορυφαία εταιρεία στον κλάδο των πλαστικών με έμφαση στην κυκλική οικονομία.' },
  ];

  return (
    <div className="pt-32 md:pt-36 min-h-screen">
      {/* About Hero */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1500" 
            alt="Viomes Factory" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-[2px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 animate-slide-up">
            Πάνω από 45 χρόνια <br />
            <span className="text-accent">Ηγετικής Παρουσίας.</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed animate-slide-up [animation-delay:100ms]">
            Στην VIOMES, συνδυάζουμε την παράδοση στην ποιότητα με την τεχνολογική καινοτομία για να δημιουργήσουμε προϊόντα που βελτιώνουν την καθημερινότητα.
          </p>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-20 bg-white relative z-20 -mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-elegant border border-border/50 flex flex-col items-center text-center group hover:border-accent transition-all duration-500">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                  <stat.icon className="w-8 h-8" />
                </div>
                <h3 className="text-4xl font-black mb-2 tracking-tight">{stat.value}</h3>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl font-black tracking-tight">Όραμα & Αποστολή</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Αποστολή μας είναι να αποτελούμε την πρώτη επιλογή των πελατών μας, προσφέροντας καινοτόμες και βιώσιμες λύσεις πλαστικών προϊόντων, διατηρώντας τα υψηλότερα πρότυπα ποιότητας και ηθικής.
                </p>
              </div>
              <div className="flex flex-col gap-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shrink-0">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Στόχος μας</h4>
                    <p className="text-muted-foreground">Η συνεχής επέκταση της γκάμας μας και η διείσδυση σε νέες αγορές παγκοσμίως.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-white shrink-0">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Καινοτομία</h4>
                    <p className="text-muted-foreground">Επένδυση στην έρευνα και ανάπτυξη για τη δημιουργία προϊόντων φιλικών προς το περιβάλλον.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-square shadow-2xl">
                <img src="https://images.unsplash.com/photo-1530124560676-4fbc91abc6f2?auto=format&fit=crop&q=80&w=800" alt="Innovation" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-accent text-white p-10 rounded-3xl hidden md:block animate-fade-in shadow-2xl">
                <p className="text-4xl font-black mb-1">45+</p>
                <p className="text-xs font-bold uppercase tracking-widest opacity-80">Years of Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 mb-20">
          <h2 className="text-4xl font-black tracking-tight text-center">Η Διαδρομή μας</h2>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border hidden lg:block" />
          <div className="flex flex-col gap-12 lg:gap-0">
            {timeline.map((item, i) => (
              <div key={i} className={cn(
                "flex flex-col lg:flex-row items-center justify-between lg:h-48 relative",
                i % 2 === 0 ? "lg:flex-row-reverse" : ""
              )}>
                <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-accent border-4 border-white z-10" />
                <div className="lg:w-[45%] bg-secondary/30 p-8 rounded-3xl border border-border/50 hover:border-accent transition-all duration-300">
                  <span className="text-accent font-black text-2xl mb-2 block">{item.year}</span>
                  <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
                <div className="lg:w-[45%]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* R&D and Quality */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6 p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
              <FlaskConical className="w-12 h-12 text-accent group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold">Έρευνα & Ανάπτυξη</h3>
              <p className="text-white/60 leading-relaxed">
                Σχεδιάζουμε in-house νέα καλούπια και προϊόντα, εστιάζοντας στην εργονομία και τη λειτουργικότητα.
              </p>
            </div>
            <div className="space-y-6 p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
              <ClipboardCheck className="w-12 h-12 text-accent group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold">Έλεγχος Ποιότητας</h3>
              <p className="text-white/60 leading-relaxed">
                Αυστηροί έλεγχοι σε κάθε παρτίδα παραγωγής για τη διασφάλιση των υψηλότερων προδιαγραφών αντοχής.
              </p>
            </div>
            <div className="space-y-6 p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
              <Ship className="w-12 h-12 text-accent group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold">Logistics & Εξαγωγές</h3>
              <p className="text-white/60 leading-relaxed">
                Ιδιόκτητος στόλος και συνεργασίες με διεθνή δίκτυα για ασφαλή και άμεση παράδοση παγκοσμίως.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-accent overflow-hidden relative">
        <div className="absolute top-0 right-0 p-20 opacity-10">
          <Globe2 className="w-96 h-96 text-white" />
        </div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-4xl font-black mb-4 tracking-tight">Ενδιαφέρεστε για συνεργασία;</h2>
            <p className="text-lg text-white/80">Επικοινωνήστε μαζί μας για να συζητήσουμε τις δικές σας ανάγκες.</p>
          </div>
          <Button size="lg" className="bg-white text-accent hover:bg-white/90 rounded-full px-12 h-16 text-lg font-bold group">
            Επικοινωνήστε Μαζί μας
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
