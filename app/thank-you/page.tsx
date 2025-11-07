'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function ThankYouPage() {
  const router = useRouter();
  const [submissionData, setSubmissionData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('palmistSubmission');
    if (data) {
      setSubmissionData(JSON.parse(data));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-amber-50 to-gold-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="mb-6"
          >
            <div className="text-7xl mb-4">✅</div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gold-600 via-gold-500 to-amber-600 bg-clip-text text-transparent"
          >
            Thank You!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-xl text-gray-700 mb-8 leading-relaxed"
          >
            Thank you for submitting your details. Our palmists are analyzing your palm data.
            You'll receive your personalized report via email within 24 hours.
          </motion.p>

          {submissionData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="bg-gold-50 rounded-xl p-6 mb-8 text-left"
            >
              <h2 className="text-lg font-semibold text-gold-800 mb-4">Submission Details</h2>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-medium">Name:</span> {submissionData.fullName}</p>
                <p><span className="font-medium">Email:</span> {submissionData.email}</p>
                <p><span className="font-medium">Date of Birth:</span> {new Date(submissionData.dateOfBirth).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500 mt-4">
                  Submitted on {new Date(submissionData.submittedAt).toLocaleString()}
                </p>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="bg-white/60 rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-center mb-3">
                <div className="text-3xl">⏱️</div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">What Happens Next?</h3>
              <p className="text-gray-600 text-sm">
                Our expert palmists will carefully analyze your palm photos and create a detailed,
                personalized report about your future, personality, and life path.
              </p>
            </div>

            <div className="bg-white/60 rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-center mb-3">
                <div className="text-3xl">📧</div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Check Your Email</h3>
              <p className="text-gray-600 text-sm">
                Your personalized PDF report will be sent to <strong>{submissionData?.email}</strong> within 24 hours.
                Please check your spam folder if you don't see it in your inbox.
              </p>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/')}
            className="mt-8 bg-gradient-to-r from-gold-500 to-amber-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-gold-500/50 transition-all duration-300"
          >
            Return to Home
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
