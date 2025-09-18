import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSEO } from '../hooks/useSEO';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Heart, Users, CheckCircle, Star } from 'lucide-react';
import { contactService } from '../lib/supabase';
import { emailService } from '../lib/emailService';

const ContactPage: React.FC = () => {
  // SEO for contact page
  useSEO({
    title: "Contact EzyElders - Get in Touch for Senior Care Services",
    description: "Contact EzyElders for inquiries about our senior care services. Reach out via phone, email, or visit our center. We're here to answer questions about elder care, wellness programs, and community activities.",
    keywords: "contact EzyElders, senior care inquiries, elder care contact, senior services phone number, senior care consultation",
    url: "/contact"
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [requestId, setRequestId] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    setErrorMessage('');

    try {
      // Save to Supabase
      const result = await contactService.create(formData);
      
      // Set request ID from response
      setRequestId(result.requestId);
      
      // Send email notification
      await emailService.notifyContactInquiry(formData);
      
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setSubmitStatus('idle');
        setRequestId('');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }, 5000);
      
    } catch (error: any) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Failed to submit your message. Please try again.');
      
      // Clear error after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setErrorMessage('');
        setRequestId('');
      }, 5000);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us Anytime',
      details: ['+91-73496 53339'],
      description: 'Speak directly with our care coordinators who understand senior needs',
      action: 'tel:+917349653339',
      color: 'bg-pink-100 text-pink-600'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Support',
      details: ['info@ezyhelpers.com'],
      description: 'Send us detailed questions and receive comprehensive responses',
      action: 'mailto:info@ezyhelpers.com',
      color: 'bg-cyan-100 text-cyan-500'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Visit Our Center',
      details: [
        'No.1794, 36/3, 27th Main Rd, near Power Station, 2nd Sector, ITI Layout, 7th Sector, HSR Layout, Bengaluru, Karnataka 560102'
      ],
      description: 'Tour our facilities and meet our team in person',
      action: 'https://maps.google.com/?q=12.900768690963808, 77.65054254952277',
      color: 'bg-pink-100 text-pink-600'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Operating Hours',
      details: [
        'Monday - Friday: 9:00 AM - 6:00 PM',
        'Saturday: 9:00 AM - 1:00 PM',
        'Sunday: Emergency support only'
      ],
      description: 'Extended hours for your convenience and peace of mind',
      color: 'bg-cyan-100 text-cyan-500'
    }
  ];

  const reasons = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Personalized Care',
      description: 'Every senior receives individual attention tailored to their unique needs and preferences'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Family Involvement',
      description: 'We keep families informed and involved in all aspects of care and activities'
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Proven Experience',
      description: 'Years of dedicated service to the senior community with countless success stories'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Quality Assurance',
      description: 'Regular feedback and continuous improvement ensure the highest standards of service'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white via-gray-50 to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-gray-800 mb-6">Get in Touch with EzyElders</h1>
            <p className="text-xl text-gray-800 leading-relaxed mb-8">
              We're here to answer your questions, address your concerns, and help you or your loved ones join our caring senior community. Our experienced team understands the unique needs of seniors and their families.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="bg-white px-6 py-3 rounded-lg shadow-md border border-gray-300">
                <span className="text-pink-600 font-semibold">24/7 Emergency Support</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-lg shadow-md border border-gray-300">
                <span className="text-cyan-500 font-semibold">Family-Friendly Service</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-lg shadow-md border border-gray-300">
                <span className="text-pink-600 font-semibold">Senior Care Experts</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-8">Multiple Ways to Reach Us</h2>
              <p className="text-lg text-gray-800 mb-8">
                Choose the communication method that works best for you. We're committed to making it easy for seniors and their families to connect with us.
              </p>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex gap-4">
                      <div className={`${info.color} p-3 rounded-lg flex-shrink-0`}>
                        {info.icon}
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{info.title}</h3>
                        <p className="text-sm text-gray-800 mb-3">{info.description}</p>
                        {info.action ? (
                          <a 
                            href={info.action}
                            target={info.action.startsWith('http') ? '_blank' : undefined}
                            rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-gray-800 hover:text-pink-600 transition-colors font-medium"
                          >
                            {info.details.map((detail, idx) => (
                              <p key={idx} className="mb-1">{detail}</p>
                            ))}
                          </a>
                        ) : (
                          info.details.map((detail, idx) => (
                            <p key={idx} className="text-gray-800 font-medium mb-1">{detail}</p>
                          ))
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                  Instant WhatsApp Support
                </h3>
                <p className="text-gray-800 mb-4">
                  Get immediate responses to urgent questions or schedule a visit through WhatsApp. Our team is ready to help you right away.
                </p>
                <a
                  href="https://wa.me/917349653339?text=Hello,%20I%20need%20information%20about%20EzyElders%20services%20for%20seniors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  <MessageCircle className="w-5 h-5" />
                  Start WhatsApp Chat
                </a>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-300"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
              <p className="text-lg text-gray-800 mb-8">
                Fill out this form and we'll get back to you within 24 hours. For urgent matters, please call us directly.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-800 font-semibold mb-2 text-lg">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent text-lg"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-gray-800 font-semibold mb-2 text-lg">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent text-lg"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-gray-800 font-semibold mb-2 text-lg">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent text-lg"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-gray-800 font-semibold mb-2 text-lg">
                    How Can We Help You? *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent text-lg"
                  >
                    <option value="">Select your inquiry type</option>
                    <option value="membership">Membership & Enrollment Information</option>
                    <option value="programs">Programs & Services Details</option>
                    <option value="health">Health & Wellness Programs</option>
                    <option value="technology">Technology Training Classes</option>
                    <option value="outings">Tours & Outings Schedule</option>
                    <option value="spiritual">Spiritual & Cultural Activities</option>
                    <option value="family">Family Member Concerns</option>
                    <option value="volunteer">Volunteer Opportunities</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="emergency">Emergency Support</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-800 font-semibold mb-2 text-lg">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent resize-none text-lg"
                    placeholder="Please tell us about your specific needs, questions, or concerns. The more details you provide, the better we can assist you."
                  />
                </div>

                {submitStatus === 'loading' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-blue-100 text-blue-700 p-4 rounded-lg border border-blue-300"
                  >
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-5 h-5 border-2 border-blue-700 border-t-transparent rounded-full"></div>
                      <span className="font-semibold">Sending your message...</span>
                    </div>
                  </motion.div>
                )}

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-100 text-green-700 p-4 rounded-lg border border-green-300"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">Thank you for your message!</span>
                    </div>
                    <p className="mt-1">We'll get back to you within 24 hours. For urgent matters, please call us directly.</p>
                    {requestId && (
                      <div className="mt-2 p-2 bg-green-50 rounded border border-green-200">
                        <p className="text-sm font-medium">Reference ID: <span className="font-mono">{requestId}</span></p>
                        <p className="text-xs text-green-600 mt-1">Please save this ID for your records</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-100 text-red-700 p-4 rounded-lg border border-red-300"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 text-red-700">⚠️</div>
                      <span className="font-semibold">Message failed to send!</span>
                    </div>
                    <p className="mt-1">{errorMessage}</p>
                  </motion.div>
                )}

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-pink-600 text-white rounded-lg font-semibold text-lg hover:bg-pink-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={submitStatus === 'loading' || submitStatus === 'success'}
                >
                  {submitStatus === 'loading' ? (
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  {submitStatus === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose EzyElders */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Families Choose EzyElders</h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              When you contact us, you're not just reaching a service provider – you're connecting with a team that truly cares about senior well-being
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="bg-pink-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 text-pink-600">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{reason.title}</h3>
                <p className="text-gray-800">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Visit Our Welcoming Center</h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              Our facility is designed with seniors in mind – accessible, comfortable, and located in a peaceful neighborhood. Schedule a visit to see our programs in action.
            </p>
          </motion.div>
          
          <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.11059410574!2d77.64569587827908!3d12.900609554941338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae156b204005b5%3A0x9576fc560c8a1ed5!2sBHIVE%20Workspace%20HSR%2027th%20Main!5e0!3m2!1sen!2sin!4v1758190875465!5m2!1sen!2sin"
              title="EzyElders Location Map - Senior Care Center in Bangalore"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-lg"
            ></iframe>
          </div>
          
          <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-300">
              <h3 className="font-semibold text-gray-800 mb-2">Accessible Parking</h3>
              <p className="text-gray-800">Dedicated parking spaces for seniors and disabled visitors</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-300">
              <h3 className="font-semibold text-gray-800 mb-2">Public Transport</h3>
              <p className="text-gray-800">Bus stops and auto-rickshaw stands nearby for easy access</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-300">
              <h3 className="font-semibold text-gray-800 mb-2">Safe Neighborhood</h3>
              <p className="text-gray-800">Located in a quiet, senior-friendly residential area</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey with EzyElders?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Don't wait to enhance your quality of life or that of your loved ones. Contact us today and discover how we can make the senior years truly golden.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="tel:+917349653339">
                <button className="bg-white text-pink-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call Us Now
                </button>
              </a>
              <a
                href="https://wa.me/917349653339?text=Hello,%20I%20would%20like%20to%20schedule%20a%20visit%20to%20EzyElders"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-pink-600 transition-all flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Schedule a Visit
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage; 