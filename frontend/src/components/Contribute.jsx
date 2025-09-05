import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Home, DollarSign, Handshake, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom'; 
import './Contribute.css';

const Contribute = () => {
  const ways = [
    {
      icon: <Heart />,
      title: "Adopt",
      description: "Give a rescued animal a loving forever home",
      
      link: "#adoption" // ✅ scroll to adoption section
    },
    {
      icon: <Home />,
      title: "Foster",
      description: "Provide temporary care while we find permanent homes",
      link: "#adoption" // ✅ same adoption section
    },
    {
      icon: <DollarSign />,
      title: "Donate",
      description: "Support medical treatments and shelter infrastructure",
      link: "https://www.donatekart.com/Arjuna-Animal-Welfare-Foundation-203785502/Help-Arjuna-Animal-Welfare-Foundation-623295550?utm_source=Share&utm_medium=InApp&utm_campaign=mobile-share&fbclid=PAZXh0bgNhZW0CMTEAAacEXCXflsDHoB1hVeRwCQ49037syELZxIii0QH56ajPqDq7BOB8sFHaXruqsA_aem_TwOb_KNkZJpwW3bW0wpNbg " // ✅ full page
    },
    {
      icon: <Handshake />,
      title: "Collaborate",
      description: "Partner with us in our mission to help animals",
      link: "#contact" // ✅ scroll to contact section
    },
    {
      icon: <Megaphone />,
      title: "Spread Awareness",
      description: "Share our mission and help educate others",
      link: "#contact" // ✅ scroll to contact section
    }
  ];

  return (
    <section className="contribute section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">How You Can Help</h2>
          <p className="section-subtitle">
            Every action counts in our mission to protect and care for animals
          </p>
        </motion.div>

        <div className="contribute-grid">
          {ways.map((way, index) => {
            // If it's an internal route (/donate), use Link
            if (way.link.startsWith("/")) {
              return (
                <Link to={way.link} key={index} className="contribute-card-link">
                  <motion.div
                    className="contribute-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                  >
                    <motion.div 
                      className="contribute-icon"
                      whileHover={{ rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {way.icon}
                    </motion.div>
                    <h3 className="contribute-title">{way.title}</h3>
                    <p className="contribute-description">{way.description}</p>
                    <p className="contribute-link">Learn More {'>'}</p>
                  </motion.div>
                </Link>
              );
            }

            // If it's an anchor (#contact, #adoption), use <a>
            return (
              <a href={way.link} key={index} className="contribute-card-link">
                <motion.div
                  className="contribute-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                >
                  <motion.div 
                    className="contribute-icon"
                    whileHover={{ rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {way.icon}
                  </motion.div>
                  <h3 className="contribute-title">{way.title}</h3>
                  <p className="contribute-description">{way.description}</p>
                  <p className="contribute-link">Learn More {'>'}</p>
                </motion.div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contribute;
