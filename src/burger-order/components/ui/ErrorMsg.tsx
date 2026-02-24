import { AnimatePresence, motion } from "framer-motion";

interface ErrorMsgProps {
  show: boolean;
  children: React.ReactNode;
}

export function ErrorMsg({ show, children }: ErrorMsgProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          style={{
            color: "#ff6b6b",
            fontSize: 13,
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          {children}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
