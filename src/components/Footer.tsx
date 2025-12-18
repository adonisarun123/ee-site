import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/ezyelders-logo.png" 
                alt="EzyElders Logo" 
                className="w-12 h-12 object-contain"
              />
              <span className="text-xl font-bold">EzyElders</span>
            </div>
            <p className="text-gray-300 mb-4">
              Enriching the lives of senior citizens through meaningful activities, wellness programs, and community engagement.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/ezyelders"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-pink-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/ezyelders"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-cyan-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-pink-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/offerings" className="text-gray-300 hover:text-pink-600 transition-colors">
                  Our Offerings
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-pink-600 transition-colors">
                  Events & Workshops
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-300 hover:text-pink-600 transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-pink-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/join-us" className="text-gray-300 hover:text-pink-600 transition-colors">
                  Join Us / Volunteer
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 mt-1 text-pink-600" />
                <div>
                  <p className="text-gray-300">+91 98455 80799</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 mt-1 text-cyan-500" />
                <div>
                  <p className="text-gray-300">ezyelders@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1 text-pink-600" />
                <div>
                  <p className="text-gray-300">
                  10, 5th B cross, Sharadamba Nagar, Jalahalli, Bangalore 560013
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 mt-1 text-cyan-500" />
                <div>
                  <p className="text-gray-300">
                    Mon - Fri: 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-cyan-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-cyan-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-cyan-500 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-cyan-500 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} EzyElders. All rights reserved. | Part of EzyHelpers
          </p>
        </div>
      </div>

      {/* SEO Schema Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Organization",
            "name": "EzyElders",
            "url": "https://www.ezyhelpers.com/ezyelders",
            "logo": "https://www.ezyhelpers.com/images/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91 98455 80799",
              "contactType": "Customer Service",
              "areaServed": "IN"
            },
            "sameAs": [
              "https://www.facebook.com/ezyelders",
              "https://www.instagram.com/ezyelders"
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "EzyElders",
            "image": "https://www.ezyhelpers.com/images/elderly.jpg",
            "telephone": "+91 98455 80799",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "No 10, 5th B Cross, Sharadamba Nagar",
              "addressLocality": "Jalahalli",
              "addressRegion": "Bangalore",
              "postalCode": "560013",
              "addressCountry": "IN"
            },
            "openingHours": "Mo-Fr 09:00-18:00",
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "13.0500",
              "longitude": "77.5500"
            }
          })
        }}
      />
    </footer>
  );
};

export default Footer; 
