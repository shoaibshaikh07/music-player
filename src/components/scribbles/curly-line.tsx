"use client";
import { motion, useInView } from "motion/react";
import React from "react";

const ScribbleCurlyLine = (): React.JSX.Element => {
  const ref = React.useRef<SVGSVGElement | null>(null);
  const isInView = useInView(ref);

  return (
    <svg
      ref={ref}
      viewBox="0 0 493 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Separator</title>
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isInView ? 1 : 0 }}
        transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
        viewport={{ once: true }}
        d="M2 11.2981C2 11.2981 13.2897 28.3233 24.5 29.2981C37.1249 30.3959 38.8293 11.5093 51.5 11.2981C64.4974 11.0815 66.5043 28.993 79.5 29.2981C92.992 29.6149 96.4642 6.29937 109 11.2981C117.162 14.5526 114.043 26.9138 122.5 29.2981C134.865 32.7842 133.535 -0.499584 145 5.29808C152.327 9.00319 146.994 20.0177 154 24.2981C165.554 31.3567 170.308 0.582177 183 5.29808C191.64 8.50835 182.941 31.718 197 24.2981C211.059 16.8781 218.941 12.718 233 5.29808C247.059 -2.12188 234.231 15.502 238.5 19.7981C248.296 29.6568 257.261 7.39411 271 5.29808C286.424 2.94497 294.898 11.1343 310.5 11.2981C327.261 11.474 339.607 -4.78111 353 5.29808C355.648 7.29067 356.295 9.38453 359 11.2981C370.322 19.3062 383 -3.1462 394 5.29808C399.287 9.35633 397.732 15.7153 403 19.7981C415.843 29.7522 425.949 2.77117 442 5.29808C448.592 6.33586 451.439 10.0765 458 11.2981C471.255 13.7663 492 5.29808 492 5.29808"
        stroke="#D99984"
        strokeWidth="4"
      />
    </svg>
  );
};
export default ScribbleCurlyLine;
