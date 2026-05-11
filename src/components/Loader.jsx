import { motion, AnimatePresence } from "framer-motion"

export default function Loader({ loading }) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          <div className="flex flex-col items-center">
            {/* LOGO */}
            <motion.img
              src="/images/logo.png"
              alt="Les Colibris 226"
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 1,
              }}
              className="h-40 w-40 object-contain"
            />

            {/* TITLE */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.8,
              }}
              className="mt-6 text-center text-4xl font-black tracking-wide text-white"
            >
              LES COLIBRIS{" "}
              <span className="text-yellow-500">226</span>
            </motion.h1>

            {/* SUBTITLE */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.9,
                duration: 0.8,
              }}
              className="mt-3 text-white/50"
            >
              Le battement culturel du Morne-Vert
            </motion.p>

            {/* LOADING BAR */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "220px" }}
              transition={{
                duration: 2,
                ease: "easeInOut",
              }}
              className="mt-8 h-[3px] rounded-full bg-yellow-500"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}