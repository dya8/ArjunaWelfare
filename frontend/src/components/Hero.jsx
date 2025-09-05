import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';
import logo from '../assets/logo.png';
import { Link } from "react-router-dom";  // import Link


const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
           <img src={logo} alt="AAWF Logo" className="hero-logo" />
          <h1 className="hero-title">
            Arjuna Animal Welfare Foundation
          </h1>
          <p className="hero-slogan">
            A fight against unethical breeding, abandonment, cruelty and animal exploitation
          </p>
          <p className="hero-description">
            We rescue injured and abandoned animals, provide medical care, sterilization, 
            vaccination, and create loving homes for those in need.
          </p>
          <div className="hero-buttons">
           {/* Donate Button navigates to /donate */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="https://www.donatekart.com/Arjuna-Animal-Welfare-Foundation-203785502/Help-Arjuna-Animal-Welfare-Foundation-623295550?utm_source=Share&utm_medium=InApp&utm_campaign=mobile-share&fbclid=PAZXh0bgNhZW0CMTEAAacEXCXflsDHoB1hVeRwCQ49037syELZxIii0QH56ajPqDq7BOB8sFHaXruqsA_aem_TwOb_KNkZJpwW3bW0wpNbg " className="btn btn-primary">
                Donate Now {'>'}
              </Link>
            </motion.div>

            <motion.a 
              href="#contact" 
              className="btn btn-secondary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch {'>'}
            </motion.a>
          </div>
        </motion.div>
        
        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <div className="hero-blob"></div>
          <img 
            src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600" 
            alt="Happy rescued dog"
            className="hero-dog-image"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;