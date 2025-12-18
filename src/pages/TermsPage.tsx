import React from 'react';
import { motion } from 'framer-motion';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-lavender to-sky py-20">
        <div className="section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-gray-800 mb-6">Terms of Service</h1>
            <p className="text-xl text-gray-700">Last updated: January 2024</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="section-padding">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By joining EzyElders and participating in our programs, you agree to these terms of service.
            </p>

            <h2>2. Services</h2>
            <p>
              EzyElders provides wellness programs, social activities, and support services for senior citizens. 
              Services are subject to availability and may change.
            </p>

            <h2>3. Member Responsibilities</h2>
            <p>
              Members must provide accurate information, follow safety guidelines, and treat staff and 
              other members with respect.
            </p>

            <h2>4. Contact Information</h2>
            <p>
              For questions about these terms, contact us at ezyelders@gmail.com or +91 98455 80799.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage; 
