import React, { useState } from 'react';
import ElectricBorder from './ElectricBorder';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const recipient = 'the.creatorz.team@gmail.com';
    const mailtoSubject = encodeURIComponent(formData.subject);
    const mailtoBody = encodeURIComponent(
      `Hi, my name is ${formData.name} (${formData.email}).\n\n${formData.message}`
    );
    window.location.href = `mailto:${recipient}?subject=${mailtoSubject}&body=${mailtoBody}`;
    setSubmitted(true);
    setTimeout(() => {
        setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <ElectricBorder>
        <form
          onSubmit={handleSubmit}
          className="p-8 bg-black/70 backdrop-blur-md rounded-lg space-y-8"
        >
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full px-4 py-3 bg-transparent border-2 border-gray-600 rounded-md text-white caret-pink-500 transition-colors focus:outline-none focus:border-pink-500 peer"
              placeholder=" "
              required
              aria-label="Your Name"
            />
            <label
              htmlFor="name"
              className="absolute text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Your Name
            </label>
          </div>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-4 py-3 bg-transparent border-2 border-gray-600 rounded-md text-white caret-pink-500 transition-colors focus:outline-none focus:border-pink-500 peer"
              placeholder=" "
              required
              aria-label="Your Email"
            />
            <label
              htmlFor="email"
              className="absolute text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Your Email
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="block w-full px-4 py-3 bg-transparent border-2 border-gray-600 rounded-md text-white caret-pink-500 transition-colors focus:outline-none focus:border-pink-500 peer"
              placeholder=" "
              required
              aria-label="Subject"
            />
            <label
              htmlFor="subject"
              className="absolute text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Subject
            </label>
          </div>
          <div className="relative">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="block w-full px-4 py-3 bg-transparent border-2 border-gray-600 rounded-md text-white caret-pink-500 transition-colors focus:outline-none focus:border-pink-500 peer resize-none"
              placeholder=" "
              required
              aria-label="Your Message"
            ></textarea>
            <label
              htmlFor="message"
              className="absolute text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Your Message
            </label>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-3 font-bold text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-full transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-pink-500/50 focus:outline-none focus:ring-4 focus:ring-pink-500/50"
            >
              Send Query
            </button>
          </div>
          {submitted && (
            <p className="text-center text-green-400 mt-4 transition-opacity duration-300">
              Thank you! Your email client should now be open.
            </p>
          )}
        </form>
      </ElectricBorder>
    </div>
  );
};

export default ContactForm;