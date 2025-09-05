import React from 'react';
import { motion } from 'framer-motion';
import './Team.css';

const Team = () => {
  const team = [
  {
    name: "Kavya Lagali",
    role: "Director ",
    image: "Kavya.jpg", // replace with Kavya's photo
    description: "A lawyer and full-time animal rescuer since 2010, Kavya has rescued 100+ dogs and actively fights animal cruelty through legal action. She focuses on vaccination, sterilization, and providing a safe haven for abandoned dogs."
  },
  {
    name: "Priya Stephen",
    role: "Co-Director",
    image: "Priya.jpg", // replace with co-founder’s photo
    description: "A certified dog behaviourist with extensive rescue experience, she has nurtured 30+ rescued dogs. Partnering with Kavya since 2023, she helps rescue abandoned and abused dogs and ensures their rehabilitation."
  }
];


  return (
    <section className="team section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">
            Dedicated professionals working tirelessly for animal welfare
          </p>
        </motion.div>

        <div className="team-grid">
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="team-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="team-image-container"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="team-image"
                />
              </motion.div>
              <div className="team-info">
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-description">{member.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;