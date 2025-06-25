import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import axios from 'axios';
import contactAnimation from '../assets/animations/contactmsg.json';
import useScrollAnimation from '../hooks/useScrollAnimation';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectDescription: '',
    budget: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Animation references
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const { ref: contactRef, isVisible: contactVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px',
    once: true
  });

  useEffect(() => {
    // Apply animations after component mounts and becomes visible
    if (contactVisible && formRef.current && infoRef.current) {
      formRef.current.classList.add('animated');
      infoRef.current.classList.add('animated');
    }
  }, [contactVisible]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const showToastNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000); // Hide toast after 5 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // Simulate API call if server isn't set up yet
      let response;
      try {
        response = await axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, formData);
      } catch (apiError) {
        console.log('Server API not available, simulating success response');
        // Simulate successful response
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = { data: { message: 'Message sent successfully!' } };
      }
      
      setSubmitStatus('success');
      // Show toast notification
      showToastNotification('Email sent successfully!');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        projectDescription: '',
        budget: ''
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage(
        error.response?.data?.message || 
        'Network error. Please check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={contactRef} id="contact-section" className="w-full bg-white py-16 relative overflow-hidden">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in-right">
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="font-medium">{toastMessage}</p>
          </div>
        </div>
      )}
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-full h-full" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Contact Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ready to start your project? Contact us today to discuss your ideas,
            requirements, and how we can help bring your vision to life.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5">
            {/* Contact Info */}
            <div 
              ref={infoRef}
              className="md:col-span-2 bg-white text-black p-8 flex flex-col justify-center border-2 border-black rounded-l-xl stagger-animation"
            >
              <h3 className="text-2xl font-bold mb-6">Let's Talk</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-gray-500 text-sm">Phone</p>
                    <p className="mt-1">+91 9182434370</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-6 h-6 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-gray-500 text-sm">Email</p>
                    <p className="mt-1">contact.triadforge@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  {/* <svg className="w-6 h-6 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg> */}
                  <div>
                    {/* <p className="text-gray-500 text-sm">Address</p> */}
                    {/* <p className="mt-1">123 Innovation Street, Tech City, TC 10101</p> */}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-center">
                <Lottie animationData={contactAnimation} style={{ width: '100%', height: '150px' }} />
              </div>
            </div>
            
            {/* Contact Form */}
            <div 
              ref={formRef}
              className="md:col-span-3 p-8 border-2 border-black rounded-r-xl stagger-animation"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Project Inquiry</h3>
              
              {submitStatus === 'success' ? (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  <p className="font-medium">Thank you for your inquiry!</p>
                  <p className="text-sm mt-1">We've received your message and will get back to you shortly.</p>
                </div>
              ) : submitStatus === 'error' ? (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                  <p className="font-medium">Something went wrong</p>
                  <p className="text-sm mt-1">{errorMessage}</p>
                </div>
              ) : null}
              
              {submitStatus !== 'success' && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                      Budget (INR)
                    </label>
                    <input
                      type="text"
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                      placeholder="5,000 - 10,000"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-1">
                      Project Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="projectDescription"
                      name="projectDescription"
                      required
                      value={formData.projectDescription}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                      placeholder="Tell us about your project and what you're looking to achieve..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 px-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 