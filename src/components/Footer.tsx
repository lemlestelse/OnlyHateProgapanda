import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blackmetal-800 border-t border-blackmetal-600 text-grimdark-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
            </Link>
            <p className="text-sm mb-4">
              Onlyhate Propaganda is a black metal label dedicated to preserving the raw, 
              uncompromising essence of black metal through quality releases and artistic integrity.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-grimdark-300 hover:text-blood-red transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-grimdark-300 hover:text-blood-red transition-colors duration-300">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-grimdark-100 text-lg mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-grimdark-300 hover:text-blood-red transition-colors duration-300">Home</Link></li>
              <li><Link to="/releases" className="text-grimdark-300 hover:text-blood-red transition-colors duration-300">Releases</Link></li>
              <li><Link to="/bands" className="text-grimdark-300 hover:text-blood-red transition-colors duration-300">Bands</Link></li>
              <li><Link to="/contact" className="text-grimdark-300 hover:text-blood-red transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>

          {/* Latest Releases */}
          <div className="col-span-1">
            <h4 className="text-grimdark-100 text-lg mb-4">Latest Releases</h4>
            <ul className="space-y-2">
              <li><Link to="/releases/1" className="text-grimdark-300 hover:text-blood-red transition-colors duration-300">Galdra - Hexennacht</Link></li>
              <li><Link to="/releases/2" className="text-grimdark-300 hover:text-blood-red transition-colors duration-300">Castrivenian / Necropsyum / Wotanskald - Renascidos das Cinzas</Link></li>
              <li><Link to="/releases/3" className="text-grimdark-300 hover:text-blood-red transition-colors duration-300">Kodorah - Fuh</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h4 className="text-grimdark-100 text-lg mb-4">Contact Us</h4>
            <address className="not-italic">
              <p className="mb-4">onlyhatepropaganda@gmail.com</p>
            </address>
            <p className="text-xs mt-4">
              For wholesale inquiries or distribution offers, 
              please contact us directly through our email.
            </p>
          </div>
        </div>

        <div className="border-t border-blackmetal-600 mt-8 pt-8 text-center text-xs">
          <p>&copy; {currentYear} Onlyhate Propaganda. All Rights Reserved.</p>
          <p className="mt-2">
            <Link to="/privacy-policy" className="text-grimdark-300 hover:text-blood-red transition-colors duration-300">Privacy Policy</Link>
            {' • '}
            <Link to="/terms" className="text-grimdark-300 hover:text-blood-red transition-colors duration-300">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;