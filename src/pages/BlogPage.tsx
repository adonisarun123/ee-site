import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Clock, ChevronRight, Calendar, Send, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { newsletterService } from '../lib/supabase';
import { emailService } from '../lib/emailService';

const BlogPage: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [requestId, setRequestId] = useState<string>('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    setErrorMessage('');

    try {
      // Save to Supabase
      const subscriptionData = { email: newsletterEmail, source: 'blog' as const };
      const result = await newsletterService.subscribe(subscriptionData);
      
      // Set request ID from response
      setRequestId(result.requestId);
      
      // Send email notification
      await emailService.notifyNewsletterSubscription(subscriptionData);
      
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setSubmitStatus('idle');
        setRequestId('');
        setNewsletterEmail('');
      }, 5000);
      
    } catch (error: any) {
      console.error('Error subscribing to newsletter:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Failed to subscribe. Please try again.');
      
      // Clear error after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setErrorMessage('');
        setRequestId('');
      }, 5000);
    }
  };
  const blogPosts = [
    {
      id: 1,
      slug: 'yoga-benefits-senior-citizens',
      title: '10 Benefits of Yoga for Senior Citizens',
      excerpt: 'Discover how yoga can improve flexibility, balance, and overall well-being for seniors. Learn about gentle poses perfect for older adults and how to start your yoga journey safely.',
      author: 'Dr. Priya Sharma',
      date: '2024-01-15',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Health & Wellness'
    },
    {
      id: 2,
      slug: 'technology-tips-for-elders',
      title: 'Staying Connected: Technology Tips for Elders',
      excerpt: 'Simple, step-by-step guide to using smartphones, video calls, and messaging apps. Learn how technology can help you stay connected with family and friends.',
      author: 'Rajesh Kumar',
      date: '2024-01-10',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1576633587382-13ddf37b1fc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Technology'
    },
    {
      id: 3,
      slug: 'social-connections-golden-years',
      title: 'The Power of Social Connections in Golden Years',
      excerpt: 'Why maintaining friendships and building new relationships is crucial for mental health and happiness in retirement. Practical tips for staying socially active.',
      author: 'Anita Patel',
      date: '2024-01-05',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Lifestyle'
    },
    {
      id: 4,
      slug: 'healthy-eating-seniors',
      title: 'Nutritious Eating Made Simple for Seniors',
      excerpt: 'Easy-to-follow nutrition guidelines for seniors, including meal planning tips, essential nutrients, and simple recipes for healthy aging.',
      author: 'Dr. Meera Reddy',
      date: '2024-01-20',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Health & Wellness'
    },
    {
      id: 5,
      slug: 'staying-active-home',
      title: 'Staying Active at Home: Simple Exercises for Seniors',
      excerpt: 'Discover safe and effective exercises you can do at home to maintain strength, flexibility, and balance. No gym membership required!',
      author: 'Fitness Coach Suresh',
      date: '2024-01-25',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Health & Wellness'
    },
    {
      id: 6,
      slug: 'digital-banking-seniors',
      title: 'Digital Banking Safety for Senior Citizens',
      excerpt: 'Learn how to safely use online banking, recognize scams, and protect your financial information in the digital age.',
      author: 'Financial Advisor Ramesh',
      date: '2024-01-30',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Technology'
    }
  ];

  const categories = ['All', 'Health & Wellness', 'Technology', 'Lifestyle'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Senior Care Blog - Health, Wellness & Lifestyle Tips for Seniors"
        description="Discover expert tips, insights, and guidance on senior health, wellness, technology, and lifestyle. Stay informed with EzyElders' blog featuring articles on nutrition, fitness, digital literacy, and more for senior citizens."
        keywords="senior health blog, elder care tips, senior wellness articles, healthy aging, senior lifestyle, senior nutrition, senior fitness, senior technology tips"
        url="/blog"
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white via-gray-50 to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-gray-800 mb-6">EzyElders Blog</h1>
            <p className="text-xl text-gray-800 leading-relaxed mb-8">
              Expert insights, practical tips, and inspiring stories about senior wellness, healthy aging, and living your golden years to the fullest
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="bg-white px-6 py-3 rounded-lg shadow-md border border-gray-300">
                <span className="text-pink-600 font-semibold">Health & Wellness</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-lg shadow-md border border-gray-300">
                <span className="text-cyan-500 font-semibold">Technology Tips</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-lg shadow-md border border-gray-300">
                <span className="text-pink-600 font-semibold">Lifestyle Guides</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white sticky top-20 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-pink-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-800 hover:bg-pink-100 hover:text-pink-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg border border-gray-300 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-pink-100 text-pink-600 text-sm font-medium rounded-lg">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{post.title}</h2>
                  <p className="text-gray-800 mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-800 mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4 text-pink-600" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-cyan-500" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-sm text-gray-800">
                      <Calendar className="w-4 h-4 text-pink-600" />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="text-pink-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all hover:text-pink-700"
                    >
                      Read More <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold mb-4">Stay Updated with Our Latest Posts</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get the latest health tips, technology guides, and lifestyle advice delivered to your inbox
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex gap-4 mb-4">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                  disabled={submitStatus === 'loading'}
                />
                <button 
                  type="submit"
                  className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={submitStatus === 'loading' || submitStatus === 'success'}
                >
                  {submitStatus === 'loading' ? (
                    <div className="animate-spin w-5 h-5 border-2 border-pink-600 border-t-transparent rounded-full"></div>
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  {submitStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/20 text-white p-3 rounded-lg backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2 justify-center">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Successfully subscribed!</span>
                  </div>
                  <p className="text-center text-sm mt-1">You'll receive our latest posts in your inbox.</p>
                  {requestId && (
                    <div className="mt-2 p-2 bg-white/30 rounded border border-white/40">
                      <p className="text-center text-sm font-medium">Reference ID: <span className="font-mono">{requestId}</span></p>
                      <p className="text-center text-xs mt-1">Please save this ID for your records</p>
                    </div>
                  )}
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-100 text-red-700 p-3 rounded-lg border border-red-300"
                >
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-5 h-5 text-red-700">⚠️</div>
                    <span className="font-semibold">Subscription failed!</span>
                  </div>
                  <p className="text-center text-sm mt-1">{errorMessage}</p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage; 