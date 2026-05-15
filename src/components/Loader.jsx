import { motion, AnimatePresence } from "framer-motion"

export default function Loader({ loading }) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden bg-black"
        >
          {/* BACKGROUND GLOW */}
          <div className="absolute h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />

          {/* LOGO */}
          <motion.img
            src="/images/logo.png"
            alt="Les Colibris 226"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            className="relative z-10 h-40 w-40 object-contain"
          />

          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.8,
            }}
            className="relative z-10 mt-6 text-center text-2xl font-black tracking-[0.25em] text-white"
          >
            LES COLIBRIS{" "}
            <span className="text-yellow-400">226</span>
          </motion.h1>

          {/* BAR */}
          <div className="relative z-10 mt-10 h-[3px] w-52 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-full w-1/2 bg-yellow-400"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
