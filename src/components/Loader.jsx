import { motion, AnimatePresence } from "framer-motion"

export default function Loader({ loading }) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black"
        >
          {/* GLOW */}
          <div className="absolute h-96 w-96 rounded-full bg-yellow-500/20 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center"
          >
            <h1 className="text-5xl font-black tracking-[0.2em] text-white md:text-7xl">
              LES COLIBRIS{" "}
              <span className="text-yellow-400">226</span>
            </h1>

            <p className="mt-6 text-sm uppercase tracking-[0.5em] text-white/50 md:text-base">
              Le battement culturel du Morne-Vert
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}