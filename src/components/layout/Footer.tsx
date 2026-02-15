import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-accent flex items-center justify-center rounded-lg">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">VIOMES</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Κορυφαίος κατασκευαστής πλαστικών προϊόντων στην Ελλάδα από το 1978. Ποιότητα, καινοτομία και βιωσιμότητα σε κάθε μας προϊόν.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Σύνδεσμοι</h4>
            <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
              <li><Link to="/products" className="hover:text-accent transition-colors">Προϊόντα</Link></li>
              <li><Link to="/industries" className="hover:text-accent transition-colors">Βιομηχανίες</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors">Η Εταιρεία</Link></li>
              <li><Link to="/quality" className="hover:text-accent transition-colors">Ποιότητα & Πιστοποιήσεις</Link></li>
              <li><Link to="/private-label" className="hover:text-accent transition-colors">Private Label</Link></li>
              <li><Link to="/careers" className="hover:text-accent transition-colors">Καριέρα</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Επικοινωνία</h4>
            <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <span>Θέση Πάτημα, Οινόφυτα Βοιωτίας, 32011, Ελλάδα</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>+30 22620 31234</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span>info@viomes.gr</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-6">
              Εγγραφείτε για να μαθαίνετε πρώτοι τα νέα και τα νέα μας προϊόντα.
            </p>
            <div className="flex gap-2">
              <Input 
                placeholder="Email address" 
                className="bg-white/10 border-white/20 text-white placeholder:text-muted-foreground focus-visible:ring-accent"
              />
              <Button size="icon" className="bg-accent hover:bg-accent/90 shrink-0">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} VIOMES S.A. All rights reserved. | <a href="#" className="hover:text-white transition-colors">Privacy Policy</a> | <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </p>
          <div className="flex items-center gap-6">
            <img src="https://img.icons8.com/color/48/iso.png" alt="ISO 9001" className="h-8 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" />
            <img src="https://img.icons8.com/color/48/quality.png" alt="Quality" className="h-8 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;