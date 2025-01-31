import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks = {
    shop: {
      title: 'Shop',
      links: ['Women', 'Men', 'Accessories', 'New Arrivals', 'Sale']
    },
    help: {
      title: 'Help',
      links: ['Shipping', 'Returns', 'Size Guide', 'Contact Us']
    },
    about: {
      title: 'About',
      links: ['Our Story', 'Careers', 'Press', 'Sustainability']
    }
  };

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          {/* Newsletter Section */}
          <div className="max-w-xl mx-auto text-center mb-12">
            <h3 className="text-2xl font-light mb-4">Join Our Newsletter</h3>
            <p className="text-gray-600 mb-6">Stay updated with our latest collections, style guides and exclusive offers.</p>
            <div className="flex flex-col low:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              />
              <button className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-900 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
            {Object.entries(footerLinks).map(([key, section]) => (
              <div key={key}>
                <h4 className="font-medium text-lg mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link
                        
                        className="text-gray-600 hover:text-black transition-colors duration-200"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-100 pt-8">
            <div className="flex flex-col lg:flex-row md:gap-4 justify-between v-low:items-center space-y-4 md:space-y-0">
              <div className="flex flex-col gap-5 v-low:flex-row v-low:space-x-3 low:space-x-6">
                <Link  className="text-gray-600 hover:text-black transition-colors duration-200">
                  Privacy Policy
                </Link>
                <Link  className="text-gray-600 hover:text-black transition-colors duration-200">
                  Terms of Service
                </Link>
                <Link  className="text-gray-600 hover:text-black transition-colors duration-200">
                  Cookie Policy
                </Link>
              </div>
              
              <div className="flex space-x-3 low:space-x-6 justify-center">
                {['Facebook', 'Instagram', 'Twitter', 'Pinterest'].map((social) => (
                  <Link
                    key={social}
                    
                    className="text-gray-600 hover:text-black transition-colors duration-200"
                  >
                    {social}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="text-center text-gray-600 text-sm mt-8">
              © {new Date().getFullYear()} STORE. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);