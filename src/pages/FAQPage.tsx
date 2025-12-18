import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQPage: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqs: FAQItem[] = [
    {
      category: 'General',
      question: 'What is EzyElders?',
      answer: 'EzyElders is a comprehensive senior care and engagement platform that offers a wide range of activities, wellness programs, and social opportunities specifically designed for senior citizens. We focus on enriching the lives of elders through meaningful activities, health programs, and community building.'
    },
    {
      category: 'General',
      question: 'Who can join EzyElders?',
      answer: 'EzyElders welcomes all senior citizens aged 55 and above. Whether you\'re newly retired, looking for social connections, wanting to learn new skills, or seeking wellness activities, our programs are designed to accommodate various interests and abilities.'
    },
    {
      category: 'Membership',
      question: 'How do I become a member?',
      answer: 'Becoming a member is simple! You can visit our center, call us at +91 98455 80799, or fill out the contact form on our website. Our team will guide you through the registration process, help you choose the right membership plan, and get you started with our activities.'
    },
    {
      category: 'Membership',
      question: 'What are the membership fees?',
      answer: 'We offer flexible membership plans to suit different needs and budgets. We have monthly, quarterly, and annual membership options. The fees vary based on the type and frequency of activities you choose. Contact us for detailed pricing information and current offers.'
    },
    {
      category: 'Activities',
      question: 'What types of activities do you offer?',
      answer: 'We offer a diverse range of activities including yoga and meditation sessions, technology workshops, social gatherings, temple visits, cultural events, health workshops, art and craft sessions, music and dance programs, and much more. Our activities are designed to promote physical health, mental wellness, and social engagement.'
    },
    {
      category: 'Activities',
      question: 'How often are activities conducted?',
      answer: 'Activities are conducted daily with a varied schedule throughout the week. Some activities like yoga happen every morning, while others like technology workshops or cultural events are scheduled weekly or monthly. We provide a monthly calendar to all members with detailed schedules.'
    },
    {
      category: 'Health & Safety',
      question: 'Are the activities safe for seniors with health conditions?',
      answer: 'Yes, all our activities are designed with senior safety in mind. Our instructors are trained to work with elderly participants and modify activities based on individual capabilities. We recommend consulting with your doctor before starting any new physical activity, and we maintain emergency protocols at all venues.'
    },
    {
      category: 'Health & Safety',
      question: 'Do you provide health monitoring?',
      answer: 'We conduct regular health check-up camps and basic health monitoring during certain activities. While we don\'t provide medical treatment, we help track vital parameters and can alert you or your family if we notice any concerns. We also maintain emergency contact information for all members.'
    },
    {
      category: 'Technology',
      question: 'I\'m not tech-savvy. Can I still join technology classes?',
      answer: 'Absolutely! Our technology classes are specifically designed for beginners. We start with the basics like turning on a smartphone, making calls, and gradually progress to using apps like WhatsApp. Our patient instructors ensure everyone learns at their own pace with hands-on practice.'
    },
    {
      category: 'Transportation',
      question: 'Do you provide transportation?',
      answer: 'We offer transportation assistance for group outings and special events. For daily activities, we can help coordinate carpooling among members from the same area. Some of our centers are also easily accessible by public transport.'
    },
    {
      category: 'Family',
      question: 'Can family members participate?',
      answer: 'While our programs are designed for seniors, we encourage family involvement! We have special family days, festival celebrations, and events where family members are welcome. We also keep families updated about their elder\'s participation and progress.'
    },
    {
      category: 'Volunteering',
      question: 'How can I volunteer with EzyElders?',
      answer: 'We welcome volunteers who are passionate about senior care! You can help with activity coordination, teaching skills, organizing events, or providing companionship. Visit our "Join Us" page or contact us to learn about current volunteer opportunities and the application process.'
    },
    {
      category: 'Spiritual',
      question: 'Do you organize religious activities?',
      answer: 'Yes, we organize various spiritual activities including satsangs, bhajan sessions, temple visits, and festival celebrations. We respect all faiths and organize activities for major festivals across religions. These activities are optional and based on member interests.'
    },
    {
      category: 'Custom Programs',
      question: 'Can you organize special programs for our group?',
      answer: 'Yes! We offer custom engagement programs for residential communities, corporate groups for their retired employees, or any senior group. We can tailor activities based on specific needs, interests, and group size. Contact us to discuss your requirements.'
    },
    {
      category: 'Payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept various payment methods including cash, bank transfers, UPI payments, and cheques. For recurring memberships, we can also set up automatic payment options for your convenience.'
    }
  ];

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-lavender to-sky py-20">
        <div className="section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Find answers to common questions about EzyElders, our programs, and how to get started
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-8 bg-white border-b">
        <div className="section-padding">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  const element = document.getElementById(category);
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-2 bg-lavender/20 rounded-full text-gray-700 hover:bg-lavender/30 transition-colors"
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-20 bg-gray-50">
        <div className="section-padding">
          <div className="max-w-4xl mx-auto">
            {categories.map((category, categoryIndex) => (
              <motion.div
                key={category}
                id={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-dark-lavender" />
                  {category}
                </h2>
                
                <div className="space-y-4">
                  {faqs
                    .filter(faq => faq.category === category)
                    .map((faq, index) => {
                      const globalIndex = faqs.indexOf(faq);
                      const isOpen = openItems.includes(globalIndex);
                      
                      return (
                        <motion.div
                          key={globalIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white rounded-xl shadow-md overflow-hidden"
                        >
                          <button
                            onClick={() => toggleItem(globalIndex)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                          >
                            <h3 className="text-lg font-semibold text-gray-800 pr-4">
                              {faq.question}
                            </h3>
                            <ChevronDown 
                              className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <div className="px-6 pb-4">
                                  <p className="text-gray-700 leading-relaxed">
                                    {faq.answer}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-20 bg-gradient-to-r from-dark-lavender to-purple-700 text-white">
        <div className="section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our friendly team is here to help. Reach out to us through any of these channels
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="tel:+919845580799">
                <button className="bg-white text-dark-lavender px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors">
                  Call Us Now
                </button>
              </a>
              <a
                href="https://wa.me/919845580799?text=Hi,%20I%20have%20a%20question%20about%20EzyElders"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-dark-lavender transition-all">
                  WhatsApp Us
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage; 
