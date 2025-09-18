import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { Heart, Users, Clock, Award, Send, User, Phone, Mail, CheckCircle, Star } from 'lucide-react';
import { memberService, volunteerService } from '../lib/supabase';
import { emailService } from '../lib/emailService';

const JoinUsPage: React.FC = () => {
  const [activeForm, setActiveForm] = useState<'member' | 'volunteer'>('member');
  const [memberForm, setMemberForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    emergencyContact: '',
    emergencyPhone: '',
    medicalConditions: '',
    interests: [] as string[],
    membershipType: '',
    hearAboutUs: ''
  });

  const [volunteerForm, setVolunteerForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    occupation: '',
    skills: [] as string[],
    availability: [] as string[],
    experience: '',
    motivation: '',
    preferredArea: '',
    backgroundCheck: false
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [requestId, setRequestId] = useState<string>('');

  const memberInterests = [
    'Health & Wellness', 'Technology Training', 'Arts & Crafts', 'Music & Dance',
    'Social Outings', 'Spiritual Activities', 'Cooking Classes', 'Games & Recreation',
    'Reading Groups', 'Gardening', 'Travel & Tours', 'Photography'
  ];

  const volunteerSkills = [
    'Teaching/Training', 'Healthcare/Nursing', 'Technology Support', 'Arts & Crafts',
    'Music/Entertainment', 'Cooking', 'Counseling', 'Event Planning',
    'Transportation', 'Administration', 'Social Work', 'Physical Therapy'
  ];

  const availabilityOptions = [
    'Monday Morning', 'Monday Evening', 'Tuesday Morning', 'Tuesday Evening',
    'Wednesday Morning', 'Wednesday Evening', 'Thursday Morning', 'Thursday Evening',
    'Friday Morning', 'Friday Evening', 'Saturday Morning', 'Saturday Evening',
    'Sunday Morning', 'Sunday Evening'
  ];

  const handleMemberChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setMemberForm({
      ...memberForm,
      [e.target.name]: e.target.value
    });
  };

  const handleVolunteerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (e.target.name === 'backgroundCheck') {
      setVolunteerForm({
        ...volunteerForm,
        backgroundCheck: (e.target as HTMLInputElement).checked
      });
    } else {
      setVolunteerForm({
        ...volunteerForm,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleInterestToggle = (interest: string) => {
    setMemberForm({
      ...memberForm,
      interests: memberForm.interests.includes(interest)
        ? memberForm.interests.filter(i => i !== interest)
        : [...memberForm.interests, interest]
    });
  };

  const handleSkillToggle = (skill: string) => {
    setVolunteerForm({
      ...volunteerForm,
      skills: volunteerForm.skills.includes(skill)
        ? volunteerForm.skills.filter(s => s !== skill)
        : [...volunteerForm.skills, skill]
    });
  };

  const handleAvailabilityToggle = (time: string) => {
    setVolunteerForm({
      ...volunteerForm,
      availability: volunteerForm.availability.includes(time)
        ? volunteerForm.availability.filter(a => a !== time)
        : [...volunteerForm.availability, time]
    });
  };

  const handleMemberSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    setErrorMessage('');

    try {
      // Calculate age from date of birth
      const birthDate = new Date(memberForm.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear() - 
        (today.getMonth() < birthDate.getMonth() || 
         (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate()) ? 1 : 0);

      // Prepare data for Supabase
      const memberData = {
        name: `${memberForm.firstName} ${memberForm.lastName}`,
        email: memberForm.email,
        phone: memberForm.phone,
        address: `${memberForm.address}, ${memberForm.city}`,
        age: age,
        interests: memberForm.interests,
        emergency_contact: memberForm.emergencyContact,
        medical_conditions: memberForm.medicalConditions || undefined
      };

      // Save to Supabase
      const result = await memberService.create(memberData);
      
      // Set request ID from response
      setRequestId(result.requestId);
      
      // Send email notification
      await emailService.notifyMemberApplication(memberData);
      
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setSubmitStatus('idle');
        setRequestId('');
        setMemberForm({
          firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '',
          address: '', city: '', emergencyContact: '', emergencyPhone: '',
          medicalConditions: '', interests: [], membershipType: '', hearAboutUs: ''
        });
      }, 5000);
      
    } catch (error: any) {
      console.error('Error submitting member application:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Failed to submit application. Please try again.');
      
      // Clear error after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setErrorMessage('');
        setRequestId('');
      }, 5000);
    }
  };

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    setErrorMessage('');

    try {
      // Prepare data for Supabase
      const volunteerData = {
        name: `${volunteerForm.firstName} ${volunteerForm.lastName}`,
        email: volunteerForm.email,
        phone: volunteerForm.phone,
        address: `${volunteerForm.address}, ${volunteerForm.city}`,
        skills: volunteerForm.skills,
        availability: volunteerForm.availability,
        experience: volunteerForm.experience || 'No prior experience',
        motivation: volunteerForm.motivation
      };

      // Save to Supabase
      const result = await volunteerService.create(volunteerData);
      
      // Set request ID from response
      setRequestId(result.requestId);
      
      // Send email notification
      await emailService.notifyVolunteerApplication(volunteerData);
      
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setSubmitStatus('idle');
        setRequestId('');
        setVolunteerForm({
          firstName: '', lastName: '', email: '', phone: '', address: '', city: '',
          occupation: '', skills: [], availability: [], experience: '',
          motivation: '', preferredArea: '', backgroundCheck: false
        });
      }, 5000);
      
    } catch (error: any) {
      console.error('Error submitting volunteer application:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Failed to submit application. Please try again.');
      
      // Clear error after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setErrorMessage('');
        setRequestId('');
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Join EzyElders - Become a Member or Volunteer"
        description="Join the EzyElders community as a member to access comprehensive senior care services, or become a volunteer to make a difference in seniors' lives. Apply today to be part of our caring community."
        keywords="join EzyElders, become member, volunteer opportunities, senior community membership, elder care volunteer, senior center membership, volunteer for seniors"
        url="/join-us"
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white via-gray-50 to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-gray-800 mb-6">Join the EzyElders Family</h1>
            <p className="text-xl text-gray-800 leading-relaxed mb-8">
              Whether you're looking to enrich your golden years or share your gifts with our senior community, 
              there's a place for you at EzyElders. Join us today and be part of something meaningful.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="bg-white px-6 py-3 rounded-lg shadow-md border border-gray-300">
                <span className="text-pink-600 font-semibold">Become a Member</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-lg shadow-md border border-gray-300">
                <span className="text-cyan-500 font-semibold">Volunteer with Us</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-lg shadow-md border border-gray-300">
                <span className="text-pink-600 font-semibold">Make a Difference</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form Selection Tabs */}
      <section className="py-8 bg-white sticky top-20 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveForm('member')}
                className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                  activeForm === 'member'
                    ? 'bg-pink-600 text-white shadow-md'
                    : 'text-gray-800 hover:bg-pink-100'
                }`}
              >
                <User className="w-5 h-5 inline-block mr-2" />
                Become a Member
              </button>
              <button
                onClick={() => setActiveForm('volunteer')}
                className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                  activeForm === 'volunteer'
                    ? 'bg-cyan-500 text-white shadow-md'
                    : 'text-gray-800 hover:bg-cyan-100'
                }`}
              >
                <Heart className="w-5 h-5 inline-block mr-2" />
                Become a Volunteer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Member Form */}
      {activeForm === 'member' && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg border border-gray-300 p-8"
            >
              <div className="text-center mb-8">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-pink-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Become a Member</h2>
                <p className="text-lg text-gray-800">
                  Join our vibrant community and enjoy a wide range of activities, programs, and social connections designed to enrich your golden years.
                </p>
              </div>

              {/* Member Benefits */}
              <div className="grid md:grid-cols-3 gap-6 mb-8 p-6 bg-pink-50 rounded-xl border border-pink-200">
                <div className="text-center">
                  <Heart className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800 mb-1">Health & Wellness</h3>
                  <p className="text-sm text-gray-800">Yoga, fitness, and health programs</p>
                </div>
                <div className="text-center">
                  <Users className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800 mb-1">Social Activities</h3>
                  <p className="text-sm text-gray-800">Make friends and enjoy outings</p>
                </div>
                <div className="text-center">
                  <Star className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800 mb-1">Special Events</h3>
                  <p className="text-sm text-gray-800">Exclusive member events and trips</p>
                </div>
              </div>

              <form onSubmit={handleMemberSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-gray-800 font-semibold mb-2 text-lg">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={memberForm.firstName}
                      onChange={handleMemberChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent text-lg"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-gray-800 font-semibold mb-2 text-lg">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={memberForm.lastName}
                      onChange={handleMemberChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent text-lg"
                      placeholder="Enter your last name"
                    />
                  </div>
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
                      value={memberForm.email}
                      onChange={handleMemberChange}
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
                      value={memberForm.phone}
                      onChange={handleMemberChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent text-lg"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="dateOfBirth" className="block text-gray-800 font-semibold mb-2 text-lg">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={memberForm.dateOfBirth}
                      onChange={handleMemberChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent text-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="membershipType" className="block text-gray-800 font-semibold mb-2 text-lg">
                      Membership Type *
                    </label>
                    <select
                      id="membershipType"
                      name="membershipType"
                      value={memberForm.membershipType}
                      onChange={handleMemberChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent text-lg"
                    >
                      <option value="">Select membership type</option>
                      <option value="basic">Basic Membership (₹2,000/month)</option>
                      <option value="premium">Premium Membership (₹3,500/month)</option>
                      <option value="family">Family Membership (₹5,000/month)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-gray-800 font-semibold mb-2 text-lg">
                    Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={memberForm.address}
                    onChange={handleMemberChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent text-lg"
                    placeholder="Enter your full address"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-gray-800 font-semibold mb-2 text-lg">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={memberForm.city}
                    onChange={handleMemberChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent text-lg"
                    placeholder="Enter your city"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="emergencyContact" className="block text-gray-800 font-semibold mb-2 text-lg">
                      Emergency Contact Name *
                    </label>
                    <input
                      type="text"
                      id="emergencyContact"
                      name="emergencyContact"
                      value={memberForm.emergencyContact}
                      onChange={handleMemberChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent text-lg"
                      placeholder="Emergency contact name"
                    />
                  </div>
                  <div>
                    <label htmlFor="emergencyPhone" className="block text-gray-800 font-semibold mb-2 text-lg">
                      Emergency Contact Phone *
                    </label>
                    <input
                      type="tel"
                      id="emergencyPhone"
                      name="emergencyPhone"
                      value={memberForm.emergencyPhone}
                      onChange={handleMemberChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent text-lg"
                      placeholder="Emergency contact phone"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="medicalConditions" className="block text-gray-800 font-semibold mb-2 text-lg">
                    Medical Conditions or Special Needs
                  </label>
                  <textarea
                    id="medicalConditions"
                    name="medicalConditions"
                    value={memberForm.medicalConditions}
                    onChange={handleMemberChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent resize-none text-lg"
                    placeholder="Please share any medical conditions or special accommodations we should know about"
                  />
                </div>

                <div>
                  <label className="block text-gray-800 font-semibold mb-4 text-lg">
                    Areas of Interest *
                  </label>
                  <div className="grid md:grid-cols-3 gap-3">
                    {memberInterests.map((interest, index) => (
                      <label key={index} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={memberForm.interests.includes(interest)}
                          onChange={() => handleInterestToggle(interest)}
                          className="w-5 h-5 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-600"
                        />
                        <span className="text-gray-800">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="hearAboutUs" className="block text-gray-800 font-semibold mb-2 text-lg">
                    How did you hear about us?
                  </label>
                  <select
                    id="hearAboutUs"
                    name="hearAboutUs"
                    value={memberForm.hearAboutUs}
                    onChange={handleMemberChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent text-lg"
                  >
                    <option value="">Select an option</option>
                    <option value="friend">Friend or Family Reference</option>
                    <option value="doctor">Healthcare Provider</option>
                    <option value="internet">Internet Search</option>
                    <option value="social">Social Media</option>
                    <option value="newspaper">Newspaper/Advertisement</option>
                    <option value="community">Community Center</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                                 {submitStatus === 'loading' && (
                   <motion.div
                     initial={{ opacity: 0, y: -10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="bg-blue-100 text-blue-700 p-4 rounded-lg border border-blue-300"
                   >
                     <div className="flex items-center gap-2">
                       <div className="animate-spin w-5 h-5 border-2 border-blue-700 border-t-transparent rounded-full"></div>
                       <span className="font-semibold">Submitting your application...</span>
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
                       <span className="font-semibold">Application submitted successfully!</span>
                     </div>
                     <p className="mt-1">Welcome to the EzyElders family! We'll contact you within 48 hours to complete your membership.</p>
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
                       <span className="font-semibold">Application failed!</span>
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
                   {submitStatus === 'loading' ? 'Submitting...' : 'Submit Membership Application'}
                 </button>
              </form>
            </motion.div>
          </div>
        </section>
      )}

      {/* Volunteer Form */}
      {activeForm === 'volunteer' && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg border border-gray-300 p-8"
            >
              <div className="text-center mb-8">
                <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-cyan-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Become a Volunteer</h2>
                <p className="text-lg text-gray-800">
                  Share your skills, time, and compassion with our senior community. Volunteering with EzyElders is a rewarding way to give back and make meaningful connections.
                </p>
              </div>

              {/* Volunteer Benefits */}
              <div className="grid md:grid-cols-3 gap-6 mb-8 p-6 bg-cyan-50 rounded-xl border border-cyan-200">
                <div className="text-center">
                  <Award className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800 mb-1">Make a Difference</h3>
                  <p className="text-sm text-gray-800">Positively impact senior lives</p>
                </div>
                <div className="text-center">
                  <Users className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800 mb-1">Build Connections</h3>
                  <p className="text-sm text-gray-800">Form meaningful relationships</p>
                </div>
                <div className="text-center">
                  <Clock className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800 mb-1">Flexible Schedule</h3>
                  <p className="text-sm text-gray-800">Volunteer at your convenience</p>
                </div>
              </div>

              <form onSubmit={handleVolunteerSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-gray-800 font-semibold mb-2 text-lg">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={volunteerForm.firstName}
                      onChange={handleVolunteerChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-gray-800 font-semibold mb-2 text-lg">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={volunteerForm.lastName}
                      onChange={handleVolunteerChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg"
                      placeholder="Enter your last name"
                    />
                  </div>
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
                      value={volunteerForm.email}
                      onChange={handleVolunteerChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg"
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
                      value={volunteerForm.phone}
                      onChange={handleVolunteerChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-gray-800 font-semibold mb-2 text-lg">
                    Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={volunteerForm.address}
                    onChange={handleVolunteerChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg"
                    placeholder="Enter your full address"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-gray-800 font-semibold mb-2 text-lg">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={volunteerForm.city}
                      onChange={handleVolunteerChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg"
                      placeholder="Enter your city"
                    />
                  </div>
                  <div>
                    <label htmlFor="occupation" className="block text-gray-800 font-semibold mb-2 text-lg">
                      Current/Previous Occupation
                    </label>
                    <input
                      type="text"
                      id="occupation"
                      name="occupation"
                      value={volunteerForm.occupation}
                      onChange={handleVolunteerChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg"
                      placeholder="Your profession or background"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-800 font-semibold mb-4 text-lg">
                    Skills & Expertise *
                  </label>
                  <div className="grid md:grid-cols-3 gap-3">
                    {volunteerSkills.map((skill, index) => (
                      <label key={index} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={volunteerForm.skills.includes(skill)}
                          onChange={() => handleSkillToggle(skill)}
                          className="w-5 h-5 text-cyan-500 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500"
                        />
                        <span className="text-gray-800">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-800 font-semibold mb-4 text-lg">
                    Availability *
                  </label>
                  <div className="grid md:grid-cols-4 gap-3">
                    {availabilityOptions.map((time, index) => (
                      <label key={index} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={volunteerForm.availability.includes(time)}
                          onChange={() => handleAvailabilityToggle(time)}
                          className="w-5 h-5 text-cyan-500 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500"
                        />
                        <span className="text-gray-800 text-sm">{time}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="preferredArea" className="block text-gray-800 font-semibold mb-2 text-lg">
                    Preferred Volunteer Area *
                  </label>
                  <select
                    id="preferredArea"
                    name="preferredArea"
                    value={volunteerForm.preferredArea}
                    onChange={handleVolunteerChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg"
                  >
                    <option value="">Select preferred area</option>
                    <option value="health">Health & Wellness Programs</option>
                    <option value="technology">Technology Training</option>
                    <option value="social">Social Activities & Events</option>
                    <option value="spiritual">Spiritual & Cultural Programs</option>
                    <option value="outings">Tours & Outings</option>
                    <option value="admin">Administrative Support</option>
                    <option value="any">Any Area Needed</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-gray-800 font-semibold mb-2 text-lg">
                    Previous Volunteer Experience
                  </label>
                  <textarea
                    id="experience"
                    name="experience"
                    value={volunteerForm.experience}
                    onChange={handleVolunteerChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none text-lg"
                    placeholder="Please describe any previous volunteer experience you have"
                  />
                </div>

                <div>
                  <label htmlFor="motivation" className="block text-gray-800 font-semibold mb-2 text-lg">
                    Why do you want to volunteer with EzyElders? *
                  </label>
                  <textarea
                    id="motivation"
                    name="motivation"
                    value={volunteerForm.motivation}
                    onChange={handleVolunteerChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none text-lg"
                    placeholder="Share your motivation for volunteering and what you hope to contribute to our senior community"
                  />
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="backgroundCheck"
                      checked={volunteerForm.backgroundCheck}
                      onChange={handleVolunteerChange}
                      required
                      className="w-5 h-5 text-cyan-500 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 mt-1"
                    />
                    <span className="text-gray-800">
                      I agree to undergo a background check as required for volunteering with vulnerable populations. *
                    </span>
                  </label>
                </div>

                                 {submitStatus === 'loading' && (
                   <motion.div
                     initial={{ opacity: 0, y: -10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="bg-blue-100 text-blue-700 p-4 rounded-lg border border-blue-300"
                   >
                     <div className="flex items-center gap-2">
                       <div className="animate-spin w-5 h-5 border-2 border-blue-700 border-t-transparent rounded-full"></div>
                       <span className="font-semibold">Submitting your application...</span>
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
                       <span className="font-semibold">Volunteer application submitted successfully!</span>
                     </div>
                     <p className="mt-1">Thank you for your interest in volunteering! We'll contact you within 48 hours to discuss next steps.</p>
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
                       <span className="font-semibold">Application failed!</span>
                     </div>
                     <p className="mt-1">{errorMessage}</p>
                   </motion.div>
                 )}

                                 <button
                   type="submit"
                   className="w-full px-6 py-4 bg-cyan-500 text-white rounded-lg font-semibold text-lg hover:bg-cyan-600 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                   disabled={submitStatus === 'loading' || submitStatus === 'success'}
                 >
                   {submitStatus === 'loading' ? (
                     <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                   ) : (
                     <Send className="w-5 h-5" />
                   )}
                   {submitStatus === 'loading' ? 'Submitting...' : 'Submit Volunteer Application'}
                 </button>
              </form>
            </motion.div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold mb-4">Questions? We're Here to Help!</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              If you have any questions about membership or volunteering, don't hesitate to reach out to our friendly team.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="tel:+917349653339">
                <button className="bg-white text-pink-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call Us: +91-73496 53339
                </button>
              </a>
              <a href="mailto:info@ezyhelpers.com">
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-pink-600 transition-all flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Us
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default JoinUsPage; 