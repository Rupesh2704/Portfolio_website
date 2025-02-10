import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import profilePhoto from '../images/RupeshPhoto.jpg';

interface Project {
  image: string | { default: string };
  // ... other project properties
}

const Home = () => {
  return (
    <div className="section min-h-screen flex items-center justify-center bg-gradient-to-br from-dark to-dark-lighter">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center animate-fade-in">
          <img
            src={typeof profilePhoto === 'string' ? profilePhoto : profilePhoto.default}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-8 border-4 border-primary shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <h1 className="text-6xl font-bold text-white mb-4 animate-slide-up">
            Rupesh Dahibhate
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            Full Stack Developer | Designer | Problem Solver
          </p>
          <div className="flex justify-center space-x-6 mb-12">
            <a href="https://github.com/Rupesh2704" className="text-gray-400 hover:text-primary transition-colors transform hover:scale-110">
              <Github size={28} />
            </a>
            <a href="https://www.linkedin.com/in/rupesh-dahibhate-50b1b7267/" className="text-gray-400 hover:text-primary transition-colors transform hover:scale-110">
              <Linkedin size={28} />
            </a>
            <a
              href="mailto:rupeshdahibhate2003@gmail.com"
              onClick={(e) => {
                window.location.href = "mailto:rupeshdahibhate2003@gmail.com";
              }}
              className="text-gray-400 hover:text-primary transition-colors transform hover:scale-110"
            >
              <Mail size={28} />
            </a>
          </div>
          <div className="flex justify-center space-x-4">
            <a
              href="/contact"
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors transform hover:scale-105"
            >
              Contact Me
            </a>
            <a
              href="/projects"
              className="bg-dark-card text-white px-8 py-3 rounded-lg border border-primary/20 hover:border-primary transition-all transform hover:scale-105"
            >
              View Projects
            </a>
            <a
              href="https://drive.google.com/uc?export=download&id=1tBQ206eGjTN2hpG3zjUJjPOW-CvBCtDD"
              target="_blank"
              rel="noopener noreferrer"
              download="Rupesh_Dahibhate_Resume.pdf"
              className="bg-dark-card text-white px-8 py-3 rounded-lg border border-primary/20 hover:border-primary transition-all transform hover:scale-105"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home

// https://drive.google.com/file/d/1tBQ206eGjTN2hpG3zjUJjPOW-CvBCtDD/view?usp=drive_link