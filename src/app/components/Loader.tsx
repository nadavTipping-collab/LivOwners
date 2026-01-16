import { motion } from "motion/react";

export const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F9F6F0]">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1
            className="text-5xl md:text-6xl text-[#3E617F] mb-2"
            style={{
              fontFamily: "Love, serif",
              fontWeight: 400,
              letterSpacing: "0.05em",
            }}
          >
            LIV
          </h1>
          <p
            className="text-lg text-[#3E617F] opacity-70"
            style={{
              fontFamily: "Love, serif",
              fontWeight: 400,
            }}
          >
            Owner's Club
          </p>
        </motion.div>

        {/* Animated loader dots */}
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 rounded-full bg-[#D46737]"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Loading text */}
        <motion.p
          className="mt-6 text-[#3E617F] text-sm"
          style={{
            fontFamily: "Love, serif",
            fontWeight: 400,
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Preparing your experience...
        </motion.p>
      </div>
    </div>
  );
};
