"use client";

import MusicNoteIcon from "@mui/icons-material/MusicNote";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { motion } from "motion/react";

const HeroCTA = (): React.JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.4, type: "keyframes" }}
      className="text-wrap font-black font-heading text-[3.5rem] leading-[1] transition duration-300 sm:text-[4.0rem] md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5rem]"
    >
      <span className="relative">Play Music</span> <br />
      Feel <MusicNoteIcon fontSize="large" />
      <FavoriteIcon fontSize="large" /> <br /> Everything
    </motion.div>
  );
};
export default HeroCTA;
