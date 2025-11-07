'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-amber-50 to-gold-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-6"
        >
          <div className="text-6xl mb-4">🔮</div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gold-600 via-gold-500 to-amber-600 bg-clip-text text-transparent"
        >
          Discover Your Future Through Your Palms
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-700 mb-12 font-light"
        >
          Submit your details and receive a personalized palm reading report within 24 hours
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push('/form')}
          className="bg-gradient-to-r from-gold-500 to-amber-600 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-gold-500/50 transition-all duration-300"
        >
          Get Started
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <div className="text-3xl mb-3">✋</div>
            <h3 className="text-lg font-semibold text-gold-700 mb-2">Submit Details</h3>
            <p className="text-gray-600 text-sm">Upload your palm photos and personal information</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="text-lg font-semibold text-gold-700 mb-2">Expert Analysis</h3>
            <p className="text-gray-600 text-sm">Our palmists carefully analyze your unique palm lines</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <div className="text-3xl mb-3">📧</div>
            <h3 className="text-lg font-semibold text-gold-700 mb-2">Receive Report</h3>
            <p className="text-gray-600 text-sm">Get your personalized PDF report via email</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
