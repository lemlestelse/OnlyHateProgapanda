import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 500);
  };

  return (
    <div className="pt-24 bg-blackmetal-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-grimdark-300">
            Get in touch with Infernal Records for inquiries, bookings, or submissions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-blackmetal-800 border border-blackmetal-600 p-6"
          >
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            
            {formSubmitted ? (
              <div className="bg-blood-red/10 border border-blood-red p-4 text-center">
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p className="mb-4">
                  Thank you for reaching out to Infernal Records. We will respond to your inquiry as soon as possible.
                </p>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="btn-outline"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-grimdark-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="input-dark"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-grimdark-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="input-dark"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-grimdark-300 mb-1">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="input-dark"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Support">Order Support</option>
                    <option value="Band Submission">Band Submission</option>
                    <option value="Press/Media">Press/Media</option>
                    <option value="Distribution">Distribution/Wholesale</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-grimdark-300 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="input-dark"
                  ></textarea>
                </div>
                
                <div>
                  <button type="submit" className="btn-primary w-full">
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-blackmetal-800 border border-blackmetal-600 p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex">
                  <Mail className="text-blood-red mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p className="text-grimdark-300">info@infernalrecords.com</p>
                  </div>
                </div>
                
                <div className="flex">
                  <Phone className="text-blood-red mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">Phone</h3>
                    <p className="text-grimdark-300">+47 123 456 789</p>
                  </div>
                </div>
                
                <div className="flex">
                  <MapPin className="text-blood-red mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">Address</h3>
                    <p className="text-grimdark-300">
                      666 Dark Forest Road<br />
                      Oslo, Norway
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blackmetal-800 border border-blackmetal-600 p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">Social Media</h2>
              <div className="flex space-x-4">
                <a href="#" className="bg-blackmetal-700 p-3 rounded-full hover:bg-blood-red transition-colors duration-300">
                  <Facebook />
                </a>
                <a href="#" className="bg-blackmetal-700 p-3 rounded-full hover:bg-blood-red transition-colors duration-300">
                  <Instagram />
                </a>
                <a href="#" className="bg-blackmetal-700 p-3 rounded-full hover:bg-blood-red transition-colors duration-300">
                  <Youtube />
                </a>
              </div>
            </div>
            
            <div className="bg-blackmetal-800 border border-blackmetal-600 p-6">
              <h2 className="text-2xl font-bold mb-6">Submissions</h2>
              <p className="text-grimdark-300 mb-4">
                We are always looking for new black metal bands to join our roster. If you believe your music fits our aesthetic and philosophy, feel free to submit your material for consideration.
              </p>
              <p className="text-grimdark-300">
                Please include:
              </p>
              <ul className="list-disc list-inside text-grimdark-300 mb-4">
                <li>Band biography</li>
                <li>Links to your music (Bandcamp, SoundCloud, etc.)</li>
                <li>Social media presence</li>
                <li>Previous releases (if any)</li>
                <li>High-quality band photos</li>
              </ul>
              <p className="text-grimdark-300">
                Send submissions to: <span className="text-blood-red">submissions@infernalrecords.com</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;