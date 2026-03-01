import { AnimatePresence, m } from "framer-motion";
import { theme } from "../../theme";

interface ErrorMsgProps {
  show: boolean;
  children: React.ReactNode;
}

const msgStyle: React.CSSProperties = {
  color: theme.error,
  fontSize: 13,
  fontWeight: 700,
  margin: "12px 0",
  textAlign: "center",
};

export function ErrorMsg({ show, children }: ErrorMsgProps) {
  return (
    <AnimatePresence>
      {show && (
        <m.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          style={msgStyle}
        >
          {children}
        </m.p>
      )}
    </AnimatePresence>
  );
}
