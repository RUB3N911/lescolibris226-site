import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Lightbox({ image, onClose }) {
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-6 backdrop-blur-xl"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
          >
            <X size={28} />
          </button>

          <motion.img
            src={image}
            alt="Les Colibris 226"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.35 }}
            className="max-h-[85vh] max-w-[95vw] rounded-3xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}