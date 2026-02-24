import type { ReactNode } from "react";
import { m } from "framer-motion";
import { stepVariants } from "../../theme";

interface AnimatedStepProps {
  children: ReactNode;
}

/** Wrapper de animação para transições entre steps do wizard. */
export function AnimatedStep({ children }: AnimatedStepProps) {
  return (
    <m.div
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </m.div>
  );
}
