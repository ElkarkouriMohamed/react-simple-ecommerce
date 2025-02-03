import { useNavigate } from "react-router-dom";
import "../css/home.css";
import { motion } from "framer-motion";
import Footer from "../footer/Footer";

export default function Home() {
  const navigate = useNavigate();

  const parentVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: .2,
      },
    }
  }

  const childVariants = {
    hidden: { x: -60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: .6 }
    }
  }

  return (
    <>
      <div className="home">
        <motion.div className="main-text flex flex-col gap-4 md:gap-7">
          <div className="text-lg md:text-xl font-semibold tracking-widest text-customBlack sm:text-customWhite">
            SPECIAL PROMO
          </div>
          <motion.div 
            variants={parentVariants}
            initial='hidden'
            animate='visible'
            className="big-text flex flex-col gap-0">
            <motion.span variants={childVariants} className="text-4xl low:text-5xl sm:text-6xl md:text-7xl 2xl:text-8xl font-bold text-white tracking-tighter">
              START
            </motion.span>
            <motion.span variants={childVariants} className="text-4xl low:text-5xl sm:text-6xl md:text-7xl 2xl:text-8xl font-bold text-white tracking-tighter">
              SHOPPING
            </motion.span>
            <motion.span variants={childVariants} className="text-4xl low:text-5xl sm:text-6xl md:text-7xl 2xl:text-8xl font-bold text-white tracking-tighter">
              NOW
            </motion.span>
          </motion.div>
          <div className="bg-orange-400 hover:bg-orange-500 transition-all duration-200 w-fit py-2 px-3 rounded-lg font-sans text-md font-bold text-white
                          low:text-xl low:py-3 low:px-5 md:text-2xl 2xl:text-3xl">
            <button onClick={() => navigate('/shop')}>Start Shopping</button>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}

