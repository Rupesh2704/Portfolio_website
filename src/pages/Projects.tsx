import React, { useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import newsImage from '../images/newsapi.png';
import blogImage from '../images/customapiblog.png';
import youtubelink from '../images/ytlink.png';
const Projects = () => {
  const projects = [
    {
      title: 'News Application with API',
      description: 'Built a fully responsive news app fetching real-time data from a major API.',
      image: { newsImage },
      technologies: ['HTML', 'CSS', 'JavaScript', 'API'],
      githubUrl: 'https://github.com/Rupesh2704/news_application',
      // liveUrl: 'https://example.com',
    },
    {
      title: 'Custom Blog Application with API',
      description: 'Improved content management by 40% with a seamless blog publishing platform.',
      image: { blogImage },
      technologies: ['EJS', 'Node.js', 'Express.js', 'MongoDB '],
      githubUrl: 'https://github.com/Rupesh2704/Custom_blog_API',
      // liveUrl: 'https://example.com',
    },
    {
      title: 'YouTube Link Fetcher',
      description: 'Developed a user-friendly interface for seamless video link management',
      image: {youtubelink},
      technologies: ['HTML', 'CSS', 'Js'],
      githubUrl: 'https://github.com/Rupesh2704/yt_link_fetcher.git',
      // liveUrl: 'https://example.com',
    },
  ];

  useEffect(() => {
    console.log('Projects:', projects.map(p => ({
      title: p.title,
      image: p.image,
    })));
  }, []);

  return (
    <div className="section min-h-screen bg-gradient-to-br from-dark-lighter to-dark py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto animate-fade-in">
        <h2 className="text-5xl font-bold text-white mb-8 text-center">Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-dark-card rounded-lg shadow-xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all transform hover:scale-105">
              <img
                src={typeof project.image === 'string' ? project.image : Object.values(project.image)[0]}
                alt={project.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-dark text-primary rounded-full text-sm border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a
                    href={project.githubUrl}
                    className="flex items-center text-gray-300 hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={20} className="mr-2" />
                    Code
                  </a>
                  <a
                    href={project.liveUrl}
                    className="flex items-center text-gray-300 hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* <ExternalLink size={20} className="mr-2" /> */}
                    {/* Live Demo */}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;