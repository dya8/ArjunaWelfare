import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Hero from './components/Hero';
import WhatWeDo from './components/WhatWeDo';
import Contribute from './components/Contribute';
import Adoption from './components/Adoption';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DonationPage from './components/Donation';
import StoriesOfHope from './components/StoriesOfHope';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main homepage route */}
        <Route 
          path="/" 
          element={
            <>
              <Hero />
              <WhatWeDo />
              <StoriesOfHope />
              <Contribute />
              <Adoption />
              <Team />
              <Contact />
              <Footer />
            </>
          } 
        />

        {/* Donation page route */}
        <Route path="/donate" element={<DonationPage />} />

        {/* Fallback route (404) */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
