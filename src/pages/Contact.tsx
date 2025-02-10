import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);

      if (error) throw error;

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="section min-h-screen bg-gradient-to-br from-dark to-dark-lighter py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <h2 className="text-5xl font-bold text-white mb-8 text-center">Contact Me</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-dark-card p-6 rounded-lg shadow-xl text-center border border-primary/10 hover:border-primary/30 transition-colors">
            <Mail className="w-8 h-8 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2 text-white">Email</h3>
            <p className="text-gray-300">rupeshdahibhate2003@gmail.com</p>
          </div>
          
          <div className="bg-dark-card p-6 rounded-lg shadow-xl text-center border border-primary/10 hover:border-primary/30 transition-colors">
            <Phone className="w-8 h-8 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2 text-white">Phone</h3>
            <p className="text-gray-300">+91 8421******</p>
          </div>
          
          <div className="bg-dark-card p-6 rounded-lg shadow-xl text-center border border-primary/10 hover:border-primary/30 transition-colors">
            <MapPin className="w-8 h-8 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2 text-white">Location</h3>
            <p className="text-gray-300">VIT Vellore</p>
          </div>
        </div>

        <div className="bg-dark-card rounded-lg shadow-xl p-8 border border-primary/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md bg-dark border-primary/20 text-white shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md bg-dark border-primary/20 text-white shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md bg-dark border-primary/20 text-white shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1 block w-full rounded-md bg-dark border-primary/20 text-white shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 transform hover:scale-105"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="text-green-400 text-center">Message sent successfully!</p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-center">Failed to send message. Please try again.</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;