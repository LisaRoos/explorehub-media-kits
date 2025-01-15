import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4 gradient-text">ExploreHub</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Empowering influencers to showcase their true value and connect with brands that matter.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Contact Us</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Mail className="h-5 w-5" />
              <span>contact@explorehub.com</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Phone className="h-5 w-5" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <MapPin className="h-5 w-5" />
              <span>123 Creator Street, Digital City</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">
              <Twitter className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 ExploreHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};