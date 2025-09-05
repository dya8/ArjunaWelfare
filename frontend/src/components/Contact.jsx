import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="contact section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">
            Ready to help? Have questions? We'd love to hear from you
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="contact-info"
          >
            <div className="contact-item">
              <div className="contact-icon">
                <MapPin />
              </div>
              <div>
                <h4>Visit Us</h4>
                <p>Mysuru<br />Karnataka</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <Phone />
              </div>
              <div>
                <h4>Call Us</h4>
                <p>+91 8050081294 </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <Mail />
              </div>
             <div>
  <h4>Email Us</h4>
  <p style={{ fontSize: "12px" }}>
    arjunaanimalwelfarefoundation@gmail.com
  </p>
</div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <Clock />
              </div>
              <div>
                <h4>Hours</h4>
                <p>Mon-Sun: 8:00 AM - 8:00 PM<br />Emergency: 24/7</p>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <motion.input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </div>

            <div className="form-group">
              <motion.input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </div>

            <div className="form-group">
              <motion.input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </div>

            <div className="form-group">
              <motion.select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="form-input"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <option value="">Select Subject</option>
                <option value="adoption">Adoption Inquiry</option>
                <option value="foster">Foster Care</option>
                <option value="donation">Donation</option>
                <option value="volunteer">Volunteer</option>
                <option value="emergency">Emergency</option>
                <option value="other">Other</option>
              </motion.select>
            </div>

            <div className="form-group">
              <motion.textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="form-input"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              ></motion.textarea>
            </div>

            <motion.button
              type="submit"
              className="btn btn-primary form-submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;