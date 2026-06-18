import React, { useState } from 'react';

interface FormData {
  fullName: string;
  email: string;
  company: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    company: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    setErrorMessage('');

    try {
      // Create FormData for Web3Forms
      const web3FormsData = new FormData();
      web3FormsData.append('access_key', import.meta.env.PUBLIC_WEB3FORMS_KEY);
      web3FormsData.append('full_name', formData.fullName);
      web3FormsData.append('email', formData.email);
      web3FormsData.append('company', formData.company);
      web3FormsData.append('message', formData.message);

      // Submit to Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: web3FormsData,
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setFormData({
          fullName: '',
          email: '',
          company: '',
          message: '',
        });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        setIsError(true);
        setErrorMessage(data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage('An error occurred. Please try again later.');
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6">
      {/* Success Message */}
      {isSuccess && (
        <div className="bg-green-900/50 border border-green-600 rounded-lg p-4 text-green-200">
          <p className="font-semibold">✓ Message sent successfully!</p>
          <p className="text-sm">We'll get back to you soon.</p>
        </div>
      )}

      {/* Error Message */}
      {isError && (
        <div className="bg-red-900/50 border border-red-600 rounded-lg p-4 text-red-200">
          <p className="font-semibold">✗ Error sending message</p>
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      {/* Full Name Field */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-semibold text-white mb-2">
          Full Name *
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          disabled={isLoading}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Your full name"
        />
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isLoading}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="your.email@example.com"
        />
      </div>

      {/* Company Field */}
      <div>
        <label htmlFor="company" className="block text-sm font-semibold text-white mb-2">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Your company name (optional)"
        />
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={isLoading}
          rows={5}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed resize-none"
          placeholder="How can we help?"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || isSuccess}
        className="w-full px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Sending...
          </>
        ) : (
          <>
            Send Message
          </>
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">
        We'll respond within 24 hours. Your information is secure and confidential.
      </p>
    </form>
  );
}
