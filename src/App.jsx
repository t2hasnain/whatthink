import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { database, ref, push } from './firebase';

const RelationshipApp = () => {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [view, setView] = useState('name');
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNameSubmit = () => {
    setView('feedback');
  };

  const handleFeedbackSubmit = async () => {
    setIsSubmitting(true);
    
    // Save to Firebase
    await push(ref(database, 'responses'), {
      name,
      feedback,
      timestamp: new Date().toISOString()
    });

    // Determine result type
    if (feedback.toLowerCase().includes('bad')) {
      setResult('bad');
    } else if (feedback.toLowerCase().includes('good')) {
      setResult('good');
    } else {
      setResult('lovely');
    }
    
    setView('result');
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-pink-900 flex flex-col items-center justify-center p-4">
      <AnimatePresence mode='wait'>
        {view === 'name' && (
          <motion.div
            key="name"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-md"
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-lg mb-4 text-xl"
              placeholder="What's your name?"
            />
            <button
              onClick={handleNameSubmit}
              className="w-full bg-pink-500 text-white p-4 rounded-lg hover:bg-pink-600 transition-colors"
            >
              Submit Name
            </button>
          </motion.div>
        )}

        {view === 'feedback' && (
          <motion.div
            key="feedback"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-md"
          >
            <input
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-4 rounded-lg mb-4 text-xl"
              placeholder="What do you think about me?"
            />
            <button
              onClick={handleFeedbackSubmit}
              disabled={isSubmitting}
              className="w-full bg-pink-500 text-white p-4 rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Submit Feedback'}
            </button>
          </motion.div>
        )}

        {view === 'result' && (
          <motion.div
            key="result"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center text-white"
          >
            {result === 'bad' && (
              <div className="text-4xl font-bold animate-pulse">
                thanks for submit
              </div>
            )}

            {result === 'good' && (
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                className="text-5xl space-y-4"
              >
                <div>🎉 Thank You! 🌟</div>
                <div className="text-3xl">Your feedback is appreciated!</div>
              </motion.div>
            )}

            {result === 'lovely' && (
              <div className="relative overflow-hidden">
                <div className="text-6xl font-bold mb-4">
                 thanks !
                </div>
                <div className="text-4xl animate-bounce">👑  👑</div>
                
                {/* Love animation */}
                {[...Array(50)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-4xl"
                    initial={{
                      scale: 0,
                      x: Math.random() * 100 - 50 + '%',
                      y: Math.random() * 100 - 50 + '%',
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 3,
                      repeat: Infinity,
                    }}
                  >
                    ❤️
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RelationshipApp;