import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-lavender to-sky py-20">
        <div className="section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
            <p className="text-xl text-gray-700">Last updated: January 2024</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="section-padding">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>1. Information We Collect</h2>
            <p>
              EzyElders collects information to provide better services to our senior community. 
              This includes personal information, health data (with consent), and participation records.
            </p>

            <h2>2. How We Use Information</h2>
            <p>
              We use the information collected to provide our services, ensure safety, 
              communicate with members, and improve our programs.
            </p>

            <h2>3. Data Protection</h2>
            <p>
              We implement appropriate security measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2>4. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at 
              ezyelders@gmail.com or call +91 98455 80799.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage; 
