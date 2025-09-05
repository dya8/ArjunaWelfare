import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Home, Stethoscope, Users, Shield, Calendar, FileText,Scale } from 'lucide-react';
import './WhatWeDo.css';

const WhatWeDo = () => {
  const services = [
    {
      icon: <Heart />,
      title: "Adoption",
      description: "Find loving forever homes for rescued animals"
    },
    {
      icon: <Home />,
      title: "Fostering", 
      description: "Temporary care for animals in need"
    },
    {
      icon: <Stethoscope />,
      title: "Medical Care",
      description: "Rehabilitation and medical assistance"
    },
    {
      icon: <Users />,
      title: "Awareness",
      description: "Building community awareness about animal welfare"
    },
    {
      icon: <Shield />,
      title: "Rescue Operations",
      description: "Emergency rescue of injured and abandoned animals"
    },
     {
      icon: <Scale />,
      title: "Legal Support",
      description: "Helps to fight against animal cruelty and exploitation"
    }
  ];

  return (
    <section className="what-we-do section-padding" id="what-we-do">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">What We Do</h2>
          <p className="section-subtitle">
            Our comprehensive approach to animal welfare and rescue
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;