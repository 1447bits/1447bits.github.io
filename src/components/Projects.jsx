import React from 'react';
import projectData from '../data/projectsData.json'

const Projects = () => {
  // Each card has the same content, so we can reuse it
  const renderCard = (index, isReversed = false,) => {
    return (
      <div className={`flex flex-col md:flex-row ${isReversed ? 'md:flex-row-reverse' : ''} items-center gap-8 mb-16`}>
        <div className="w-full md:w-3/5">
          <h2 className="font-heading text-2xl hover:underline underline-offset-4 cursor-pointer font-bold  mb-2">{projectData.Projects[index].heading}</h2>
          <p className="font-heading text-lg  mb-6">{projectData.Projects[index].stack.join(" | ")}</p>
          <p className="font-primary text-sm text-gray-300">{projectData.Projects[index].desc}</p>
        </div>
        <div className="w-full md:w-1/2 h-48 md:h-64 bg-gray-700 p-2 rounded-2xl">
        <img src={projectData.Projects[index].imagePath} 
        className='w-full object-cover h-full rounded-xl'
        alt="" />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto ">
      {/* Content */}
      <div className="container mx-auto px-4 py-12">

        {projectData.Projects.map((_, index) => {
          const left = index % 2 === 0
          return renderCard(index, left)
        })}

      </div>
    </div>
  );
};

export default Projects;