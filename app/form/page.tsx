'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function FormPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
  });
  const [leftPalm, setLeftPalm] = useState<File | null>(null);
  const [rightPalm, setRightPalm] = useState<File | null>(null);
  const [leftPalmPreview, setLeftPalmPreview] = useState<string>('');
  const [rightPalmPreview, setRightPalmPreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, hand: 'left' | 'right') => {
    const file = e.target.files?.[0];
    if (file) {
      if (hand === 'left') {
        setLeftPalm(file);
        setLeftPalmPreview(URL.createObjectURL(file));
      } else {
        setRightPalm(file);
        setRightPalmPreview(URL.createObjectURL(file));
      }
      if (errors[`${hand}Palm`]) {
        setErrors(prev => ({ ...prev, [`${hand}Palm`]: '' }));
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!leftPalm) {
      newErrors.leftPalm = 'Left palm photo is required';
    }

    if (!rightPalm) {
      newErrors.rightPalm = 'Right palm photo is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Store data in localStorage for demo purposes
    const submissionData = {
      ...formData,
      leftPalmName: leftPalm?.name,
      rightPalmName: rightPalm?.name,
      submittedAt: new Date().toISOString(),
    };
    localStorage.setItem('palmistSubmission', JSON.stringify(submissionData));

    router.push('/thank-you');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-amber-50 to-gold-100 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gold-600 via-gold-500 to-amber-600 bg-clip-text text-transparent">
            Your Journey Begins
          </h1>
          <p className="text-gray-600">Fill in your details to receive your personalized palm reading</p>
        </div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8"
        >
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  errors.fullName ? 'border-red-500' : 'border-gray-200'
                } focus:border-gold-500 focus:outline-none transition-colors`}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-gray-700 mb-2">
                Date of Birth *
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  errors.dateOfBirth ? 'border-red-500' : 'border-gray-200'
                } focus:border-gold-500 focus:outline-none transition-colors`}
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-semibold text-gray-700 mb-2">
                Gender *
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  errors.gender ? 'border-red-500' : 'border-gray-200'
                } focus:border-gold-500 focus:outline-none transition-colors`}
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  errors.email ? 'border-red-500' : 'border-gray-200'
                } focus:border-gold-500 focus:outline-none transition-colors`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Palm Photos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Palm */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Left Palm Photo *
                </label>
                <div className={`border-2 border-dashed ${
                  errors.leftPalm ? 'border-red-500' : 'border-gray-300'
                } rounded-lg p-4 text-center hover:border-gold-500 transition-colors cursor-pointer`}>
                  <input
                    type="file"
                    id="leftPalm"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'left')}
                    className="hidden"
                  />
                  <label htmlFor="leftPalm" className="cursor-pointer">
                    {leftPalmPreview ? (
                      <img
                        src={leftPalmPreview}
                        alt="Left palm preview"
                        className="w-full h-40 object-cover rounded-lg mb-2"
                      />
                    ) : (
                      <div className="text-gray-400 py-8">
                        <div className="text-4xl mb-2">🤚</div>
                        <p className="text-sm">Click to upload</p>
                      </div>
                    )}
                  </label>
                </div>
                {errors.leftPalm && (
                  <p className="text-red-500 text-sm mt-1">{errors.leftPalm}</p>
                )}
              </div>

              {/* Right Palm */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Right Palm Photo *
                </label>
                <div className={`border-2 border-dashed ${
                  errors.rightPalm ? 'border-red-500' : 'border-gray-300'
                } rounded-lg p-4 text-center hover:border-gold-500 transition-colors cursor-pointer`}>
                  <input
                    type="file"
                    id="rightPalm"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'right')}
                    className="hidden"
                  />
                  <label htmlFor="rightPalm" className="cursor-pointer">
                    {rightPalmPreview ? (
                      <img
                        src={rightPalmPreview}
                        alt="Right palm preview"
                        className="w-full h-40 object-cover rounded-lg mb-2"
                      />
                    ) : (
                      <div className="text-gray-400 py-8">
                        <div className="text-4xl mb-2">🖐️</div>
                        <p className="text-sm">Click to upload</p>
                      </div>
                    )}
                  </label>
                </div>
                {errors.rightPalm && (
                  <p className="text-red-500 text-sm mt-1">{errors.rightPalm}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className={`w-full mt-8 py-4 rounded-lg text-lg font-semibold text-white shadow-lg transition-all duration-300 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-gold-500 to-amber-600 hover:shadow-gold-500/50'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit for Analysis'
            )}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}
