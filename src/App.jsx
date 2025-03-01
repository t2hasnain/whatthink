import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { database, ref, push } from './firebase';

const RomanticApp = () => {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [view, setView] = useState('name');
  const [isRania, setIsRania] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate falling elements
  const fallingElements = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    emoji: ['🌸', '💖', '🌙', '🌟', '🌠'][Math.floor(Math.random() * 5)],
    style: {
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`
    }
  }));

  const handleNameSubmit = () => {
    setIsRania(name.toLowerCase() === 'rania');
    setView('feedback');
  };

  const handleFeedbackSubmit = async () => {
    setIsSubmitting(true);
    
    // Save to Firebase
    await push(ref(database, 'responses'), {
      name,
      feedback,
      isRania,
      timestamp: new Date().toISOString()
    });

    setView('result');
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-pink-900 flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Falling Animation Layer */}
      {view === 'result' && isRania && (
        <div className="fixed inset-0 pointer-events-none">
          {fallingElements.map(({ id, emoji, style }) => (
            <motion.div
              key={id}
              className="absolute text-4xl -top-10"
              initial={{ y: -100 }}
              animate={{ y: '100vh' }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={style}
            >
              {emoji}
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence mode='wait'>
        {view === 'name' && (
          <motion.div
            key="name"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-md z-10"
          >
                    <h1 className="text-amber-50 relative bottom-2.5 text-2xl font-bold "> Type Correct Name Like Hasnain</h1>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-lg mb-4 text-xl bg-white/90"
              placeholder="What's your beautiful name?"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNameSubmit}
              className="w-full bg-pink-500 text-white p-4 rounded-lg"
            >
              Continue 💖
            </motion.button>
          </motion.div>
        )}

        {view === 'feedback' && (
          <motion.div
            key="feedback"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-md z-10"
          >
            <input
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-4 rounded-lg mb-4 text-xl bg-white/90"
              placeholder={`What's on your mind about me 💭`}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFeedbackSubmit}
              disabled={isSubmitting}
              className="w-full bg-pink-500 text-white p-4 rounded-lg disabled:opacity-50"
            >
              {isSubmitting ? 'Sending to Heart... 💌' : 'Share Your Feelings 💞'}
            </motion.button>
          </motion.div>
        )}

        {view === 'result' && (
          <motion.div
            key="result"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center text-white z-10 space-y-8"
          >
            {isRania ? (
              <div className="relative">
                <motion.div
                  initial={{ rotate: -30, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ type: 'spring' }}
                  className="text-6xl font-bold mb-4"
                >
                  Thanks Rania! 💐
                </motion.div>
                
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-4xl"
                >
                  Special 🌟
                </motion.div>

                <div className="mt-8 text-2xl">
                  " {name} 💕"
                </div>

                <div className="flex justify-center space-x-4 mt-6">
                  {['🌹', '💐', '🌸', '💮'].map((emoji, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -20, 0] }}
                      transition={{ repeat: Infinity, delay: i * 0.2 }}
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              // Regular result display
              <div className="text-4xl">
                Thank you ! 💌
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RomanticApp;