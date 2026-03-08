import { useState } from "react";
import { LazyMotion, domAnimation } from "framer-motion";

const BurgerOrder = () => {
  return (
    <LazyMotion features={domAnimation} strict>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Encerramos os pedidos por hoje</h1>
      </div>
    </LazyMotion>
  );
};

export default BurgerOrder;