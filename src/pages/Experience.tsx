import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'B2World',
      period: 'Nov-2023 - Dec-2023',
      location: 'Remote',
      description: [
        'Boosted user engagement by 20% with a sleek, user-centric website redesign.',
        'Cut bounce rate by 15% by enhancing navigation with a modern, intuitive layout.',
        'Improved application performance by 40%',
      ],
    },
    // {
    //   title: 'Full Stack Developer',
    //   company: 'StartUp Inc',
    //   period: '2019 - 2021',
    //   location: 'New York, NY',
    //   description: [
    //     'Developed and maintained multiple client projects',
    //     'Implemented responsive designs and modern UI components',
    //     'Integrated third-party APIs and services',
    //   ],
    // },
    // {
    //   title: 'Junior Developer',
    //   company: 'Web Solutions',
    //   period: '2017 - 2019',
    //   location: 'Boston, MA',
    //   description: [
    //     'Built and maintained client websites',
    //     'Collaborated with design team on UI/UX improvements',
    //     'Participated in code reviews and team meetings',
    //   ],
    // },
  ];

  return (
    <div className="section min-h-screen bg-gradient-to-br from-dark to-dark-lighter py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <h2 className="text-5xl font-bold text-white mb-8 text-center">Experience</h2>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-dark-card rounded-lg shadow-xl p-8 border border-primary/10 hover:border-primary/20 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
                  <p className="text-xl text-primary">{exp.company}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <div className="flex items-center text-gray-300 mb-2">
                    <Calendar size={18} className="mr-2 text-primary" />
                    {exp.period}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin size={18} className="mr-2 text-primary" />
                    {exp.location}
                  </div>
                </div>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {exp.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;