import React from "react";
import Lenis from "lenis";

function Smooth({children}) {
     // Initialize Lenis
  const lenis = new Lenis({
    duration:1.5
  });

  // Use requestAnimationFrame to continuously update the scroll
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  return <>
    {children}
  </>;
}

export default Smooth;