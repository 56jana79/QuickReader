import React from "react";
import Navbar from "../Navbar/Navbar";
import grow from '../assets/growth.jpg'
import team from '../assets/team.jpg'
import student from '../assets/student.jpg'
import react from '../assets/React.png'
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="company-name">Quick Reader</h1>
          <p className="tagline">
Our website is dedicated to empowering students with easy access to quality learning resources. We believe education should be engaging, accessible, and inspiring for learners of all ages. Here, students can explore a wide range of topics — from academic subjects and competitive exam preparation to skill development and career guidance.
          </p>
          <a href="#about" className="cta-btn">
            Learn More
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <h2>About Us</h2>
        <p>
          At <strong>Quick Reader</strong>, we are committed to helping
          students strengthen their React.js skills through interactive and
          well-structured test packages. Our mission is to provide an impactful
          learning experience that enhances coding abilities, problem-solving
          skills, and confidence in React development.
        </p>
      </section>

      {/* Objectives Section */}
      <section className="objectives">
        <h2>Our Objectives</h2>
        <ul>
          <li>Deliver high-quality React.js practice questions.</li>
          <li>Enhance problem-solving skills through real-world challenges.</li>
          <li>Encourage continuous learning with engaging content.</li>
          
        </ul>
      </section>

      {/* Gallery Section */}
      <section className="gallery">
        <h2>Our Vision in Pictures</h2>
        <div className="gallery-grid">
          <img src={react} style={{height:"180px"}} alt="React Practice" />
          <img src={team} alt="Team Collaboration" />
          <img src={student} alt="Student Learning" />
          <img src={grow} alt="Growth Mindset" />
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© {new Date().getFullYear()} Quick Reader . All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
