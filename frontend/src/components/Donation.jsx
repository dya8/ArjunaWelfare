import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./DonationPage.css";

export default function DonationPage() {
  const navigate = useNavigate();

  // ✅ State for donor details
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    amount: "",
  });

  // ✅ State for file
  const [file, setFile] = useState(null);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle donation completion
  const handleDonate = async () => {
    if (!formData.name || !formData.contact || !formData.email || !formData.amount) {
      alert("⚠️ Please fill in all fields before submitting.");
      return;
    }
    if (!file) {
      alert("⚠️ Please upload your payment confirmation.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("contact", formData.contact);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("amount", formData.amount);
      formDataToSend.append("proof", file);

      const res = await fetch("http://localhost:5000/api/donate", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();

      if (data.success) {
        alert(`✅ Thank you ${formData.name}! Your donation of ₹${formData.amount} has been recorded.`);
        console.log("Saved data:", data);
        setFormData({ name: "", contact: "", email: "", amount: "" });
        setFile(null);
      } else {
        alert("❌ Failed: " + data.message);
      }
    } catch (err) {
      console.error("Error submitting donation:", err);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="donation-page">
      <div className="donation-card">
        <h2>Make a Donation</h2>
        <p>Your support helps us care for animals and create a better future.</p>

        {/* QR Code Section */}
        <div className="qr-section">
          <img src="/qr.jpg" alt="Donation QR Code" />
          <p>
            UPI ID: <span style={{ color: "#D4AF37" }}>donate@upi</span>
          </p>
          <p>Scan the QR to donate or upload confirmation</p>
        </div>

        {/* Donation Details */}
        <div className="donation-details">
          <h3>Donation Details</h3>

          <p>
            <span>Name: </span>
            <input 
              type="text" 
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </p>

          <p>
            <span>Contact Number: </span>
            <input 
              type="tel" 
              name="contact"
              placeholder="Enter your contact number"
              value={formData.contact}
              onChange={handleChange}
            />
          </p>

          <p>
            <span>Email ID: </span>
            <input 
              type="email" 
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </p>

          <p>
            <span>Amount: </span>
            <input 
              type="number" 
              name="amount"
              placeholder="Enter donation amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </p>
        </div>

        {/* Upload Proof */}
        <div className="upload-section">
          <label>Upload Payment Confirmation</label>
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        {/* Buttons */}
        <div className="button-row">
          <button 
            className="button-back" 
            onClick={() => navigate("/")}
          >
            Back
          </button>
          <button 
            className="button-donate" 
            onClick={handleDonate}
          >
            Complete Donation
          </button>
        </div>
      </div>
    </div>
  );
}
