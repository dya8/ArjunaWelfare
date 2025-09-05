import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Adoption.css";

const Adoption = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/animals") // ✅ backend endpoint
      .then((res) => res.json())
      .then((data) => {
        console.log("Animals from API:", data.animals); // ✅ Debug log
        setAnimals(data.animals || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching animals:", err);
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "#4CAF50";
      case "Foster Care":
        return "#D2B48C";
      case "Medical Care":
        return "#F57C00";
      default:
        return "#757575";
    }
  };

  return (
    <section className="adoption section-padding" id="adoption">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">Find Your New Best Friend</h2>
          <p className="section-subtitle">
            Meet our wonderful animals looking for loving homes
          </p>
        </motion.div>

        {loading ? (
          <p>Loading animals...</p>
        ) : animals.length === 0 ? (
          <p>No animals available for adoption right now.</p>
        ) : (
<div className="adoption-circle-grid">
  {animals.map((animal, index) => (
    <motion.div
      key={animal.id}
      className="animal-circle"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.1 }}
    >
      <div className="circle-image-container">
        <img src={animal.ImageUrl} alt={animal.Name} /> {/* ✅ fixed keys */}
        <span
          className="status-tag"
          style={{ backgroundColor: getStatusColor(animal.Status) }}
        >
          {animal.Status}
        </span>
      </div>
      <h3>{animal.Name}</h3>
      <p className="animal-meta">
        {animal.Age ? `${animal.Age} • ${animal.Type || ""}` : ""}
      </p>
      <p className="animal-description">{animal.Description}</p>
    </motion.div>
  ))}
</div>

        )}
      </div>
    </section>
  );
};

export default Adoption;
