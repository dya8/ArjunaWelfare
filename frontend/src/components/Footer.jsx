import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Youtube, Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const socialLinks = [
    { icon: <Facebook />, url: "#", label: "Facebook" },
    { icon: <Instagram />, url: "https://www.instagram.com/aawf_mysuru?igsh=YWJtaWhnZTNvb2Vo&utm_source=qr", label: "Instagram" },
    { icon: <Twitter />, url: "#", label: "Twitter" },
    { icon: <Youtube />, url: "#", label: "YouTube" }
  ];

  const quickLinks = [
    { text: "About Us", url: "#" },
    { text: "What We Do", url: "#what-we-do" },
    { text: "Adoption", url: "#adoption" },
    { text: "Contact", url: "#contact" },
    { text: "Donate", url: "https://www.donatekart.com/Arjuna-Animal-Welfare-Foundation-203785502/Help-Arjuna-Animal-Welfare-Foundation-623295550?utm_source=Share&utm_medium=InApp&utm_campaign=mobile-share&fbclid=PAZXh0bgNhZW0CMTEAAacEXCXflsDHoB1hVeRwCQ49037syELZxIii0QH56ajPqDq7BOB8sFHaXruqsA_aem_TwOb_KNkZJpwW3bW0wpNbg " }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="footer-section"
          >
             {/* Logo */}
        <img 
          src="logo.png"  // relative to public folder
          alt="Arjuna Animal Welfare Foundation Logo"
          className="footer-logo"
          style={{ width: "120px", marginBottom: "1rem" }}
        />

            <h3 className="footer-title">Arjuna Animal Welfare Foundation</h3>
            <p className="footer-description">
              Fighting against unethical breeding, abandonment, cruelty and animal exploitation. 
              Together, we can make a difference in the lives of innocent animals.
            </p>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  className="social-link"
                  aria-label={social.label}
                  whileHover={{ 
                    scale: 1.2,
                    backgroundColor: "var(--highlight-beige)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="footer-section"
          >
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a href={link.url}>{link.text}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="footer-section"
          >
            <h4 className="footer-subtitle">Contact Info</h4>
            <div className="contact-details">
              <p><strong>Address:</strong><br />Mysuru <br/> Karnataka</p>
              <p><strong>Phone:</strong><br />+91 8050081294</p>
              <p><strong>Email:</strong><br />arjunaanimalwelfarefoundation@gmail.com</p>
           
            </div>
          </motion.div>
        </div>

        <motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.6, delay: 0.6 }}
  viewport={{ once: true }}
  className="footer-bottom"
>
  <p className="copyright">
    © 2025 Arjuna Animal Welfare Foundation. Made with{" "}
    <Heart className="heart-icon" /> for animals in need by{" "}
    <a
      href="https://github.com/dya8"
      target="_blank"
      rel="noopener noreferrer"
      className="github-link"
    >
      @dya8
    </a>
  </p>
</motion.div>

      </div>
    </footer>
  );
};

export default Footer;