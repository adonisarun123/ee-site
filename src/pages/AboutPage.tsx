import React from 'react';
import { motion } from 'framer-motion';
import { useSEO } from '../hooks/useSEO';
import { Heart, Target, Users, Award, CheckCircle, Clock, MapPin, Phone } from 'lucide-react';

const AboutPage: React.FC = () => {
  // SEO for about page
  useSEO({
    title: "About EzyElders - Our Mission & Vision for Senior Care",
    description: "Learn about EzyElders' dedication to senior care excellence. Discover our mission, values, and commitment to providing comprehensive wellness services, community engagement, and personalized care for senior citizens.",
    keywords: "about EzyElders, senior care mission, elder care philosophy, senior wellness center, senior community services, elder care values",
    url: "/about"
  });

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Compassion',
      description: 'We treat every elder with love, respect, and dignity they deserve',
      color: 'bg-pink-100 text-pink-600'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community',
      description: 'Building strong bonds and friendships that last a lifetime',
      color: 'bg-cyan-100 text-cyan-500'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Purpose',
      description: 'Helping seniors find meaning and joy in their golden years',
      color: 'bg-pink-100 text-pink-600'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Excellence',
      description: 'Delivering high-quality programs and services consistently',
      color: 'bg-cyan-100 text-cyan-500'
    }
  ];

  const team = [
    {
      name: 'Dr. Priya Sharma',
      role: 'Founder & Director',
      image: 'https://placehold.co/300x300/E91E63/FFFFFF?text=Dr.+Priya',
      bio: 'With 20 years in geriatric care, Dr. Sharma founded EzyElders to transform senior living experiences'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Program Coordinator',
      image: 'https://placehold.co/300x300/00BCD4/FFFFFF?text=Rajesh',
      bio: 'Expert in organizing engaging activities and experiential tours for senior citizens'
    },
    {
      name: 'Anita Patel',
      role: 'Wellness Expert',
      image: 'https://placehold.co/300x300/E91E63/FFFFFF?text=Anita',
      bio: 'Certified instructor specializing in senior fitness, wellness, and online training programs'
    }
  ];

  const milestones = [
    { year: '2019', event: 'EzyElders founded with a vision to enrich senior lives' },
    { year: '2020', event: 'Launched online knowledge sharing during pandemic' },
    { year: '2021', event: 'Reached 100+ active community members' },
    { year: '2022', event: 'Expanded engagement activities to 5 locations in Bangalore' },
    { year: '2023', event: 'Introduced technology training and experiential tours' },
    { year: '2024', event: 'Serving 500+ seniors with customised events monthly' }
  ];

  const achievements = [
    'Experienced team of senior care professionals',
    'Comprehensive range of engagement activities',
    'Safe and welcoming community environment',
    'Affordable and flexible service plans',
    'Personalized approach to each member\'s needs',
    'Regular health and wellness monitoring',
    'Transportation assistance for experiential tours',
    'Family involvement and support encouraged'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-gray-800 mb-6">About EzyElders</h1>
            <p className="text-xl text-gray-800 leading-relaxed">
              We believe that age is just a number, and life after 60 can be the most fulfilling chapter. 
              EzyElders is dedicated to creating a vibrant community where seniors thrive through meaningful 
              activities, experiential tours, online learning, and genuine connections.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-pink-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-pink-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-800 leading-relaxed">
                To enrich the lives of senior citizens by providing comprehensive engagement activities, 
                experiential tours, online learning opportunities, and fostering social connections. 
                We strive to ensure every elder feels valued, engaged, and part of a caring community.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-cyan-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-cyan-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
              <p className="text-gray-800 leading-relaxed">
                To be the leading platform for senior engagement in India, where every elder has access 
                to activities that promote physical health, mental wellness, and social fulfillment. 
                We envision a society where aging is celebrated and seniors live their best lives.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Our Story</h2>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-300">
              <div className="prose prose-lg mx-auto text-gray-800">
                <p className="mb-6 text-lg">
                  EzyElders was born from a simple observation: many seniors, despite having so much to offer, 
                  often feel isolated and disconnected from society. Our founder, Dr. Priya Sharma, witnessed 
                  this firsthand when her own parents struggled with loneliness after retirement.
                </p>
                <p className="mb-6 text-lg">
                  What started as small engagement activities in a community center has grown into a movement that touches 
                  hundreds of lives. We realized that seniors don't just need care – they need purpose, 
                  friendship, opportunities to learn new skills, and experiences that create lasting memories.
                </p>
                <p className="text-lg">
                  Today, EzyElders is more than just an organization; it's a family of 500+ members who support, 
                  inspire, and celebrate each other every day. From morning engagement sessions to technology workshops, 
                  from experiential tours to customised events, we create spaces where seniors can be themselves 
                  and discover new passions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-800">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white p-6 rounded-xl shadow-lg border border-gray-300 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`${value.color} w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-800">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-800">Dedicated professionals committed to senior wellness and engagement</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-lg mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-pink-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-800">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-800">Key milestones in the EzyElders story</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-8 mb-8 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="flex-1">
                  {index % 2 === 0 ? (
                    <div className="text-right">
                      <h3 className="text-2xl font-bold text-pink-600 mb-2">{milestone.year}</h3>
                      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-300 inline-block">
                        <p className="text-gray-800">{milestone.event}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-left">
                      <h3 className="text-2xl font-bold text-cyan-500 mb-2">{milestone.year}</h3>
                      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-300 inline-block">
                        <p className="text-gray-800">{milestone.event}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <div className={`w-6 h-6 rounded-full ${index % 2 === 0 ? 'bg-pink-600' : 'bg-cyan-500'} relative z-10`}></div>
                  {index < milestones.length - 1 && (
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-gray-300"></div>
                  )}
                </div>
                <div className="flex-1">
                  {index % 2 === 1 ? (
                    <div className="text-right">
                      <h3 className="text-2xl font-bold text-pink-600 mb-2">{milestone.year}</h3>
                      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-300 inline-block">
                        <p className="text-gray-800">{milestone.event}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-left">
                      <h3 className="text-2xl font-bold text-cyan-500 mb-2">{milestone.year}</h3>
                      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-300 inline-block">
                        <p className="text-gray-800">{milestone.event}</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-8">Why Choose EzyElders?</h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              {achievements.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm"
                >
                  <CheckCircle className="w-6 h-6 text-white flex-shrink-0" />
                  <span className="text-lg">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Visit Us</h2>
            <p className="text-xl text-gray-800">Come and experience the EzyElders community</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-pink-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Location</h3>
              <p className="text-gray-800">
                No 10, 5th B Cross<br />
                Sharadamba Nagar<br />
                Jalahalli, Bangalore - 560013
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-cyan-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-cyan-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Contact</h3>
              <p className="text-gray-800">
                +91 98455 80799<br />
                ezyelders@gmail.com
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-pink-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Hours</h3>
              <p className="text-gray-800">
                Monday - Friday<br />
                9:00 AM - 6:00 PM
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 
