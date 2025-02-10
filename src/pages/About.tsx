import React from 'react';
import { Code, Briefcase, GraduationCap } from 'lucide-react';

const About = () => {
  return (
    <div className="section min-h-screen bg-gradient-to-br from-dark-lighter to-dark py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <h2 className="text-5xl font-bold text-white mb-8 text-center">About Me</h2>
        
        <div className="bg-dark-card rounded-lg shadow-xl p-8 mb-8 border border-primary/10">
          <p className="text-xl text-gray-300 mb-6 leading-relaxed">
          Currently pursuing B.tech IT at Vellore Institute of Technology,
          I integrate theoretical knowledge with hands-on expertise, driving innovation through entrepreneurship and Java programming. Certified in AWS Cloud Foundation, I focus on building secure, efficient digital solutions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 bg-dark rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
              <Code className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Technical Skills</h3>
              <ul className="text-gray-300 space-y-2">
                <li>HTML, CSS, JavaScript</li>
                <li>React Js, spring boot</li>
                <li>AWS</li>
                <li>Data Structures & Algorithms</li>
              </ul>
            </div>
            
            <div className="p-6 bg-dark rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
              <Briefcase className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Experience</h3>
              <ul className="text-gray-300 space-y-2">
                <li>Full Stack Developer-B2World</li>

              </ul>
            </div>
            
            <div className="p-6 bg-dark rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
              <GraduationCap className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Education</h3>
              <ul className="text-gray-300 space-y-2">
                <li>B.tech IT-Vellore Institute of Technology</li>
                <li>Tapti Public School - X</li>
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;