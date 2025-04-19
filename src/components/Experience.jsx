import React from 'react';

const Experience = () => {
  return (
    <div className="min-h-screen  p-8 font-primary flex flex-col items-center">
      <img src="/assets/exp-mobilesec.svg" className='md:hidden block select-none' draggable={false} />
      <img src="/assets/expdesktop-section.svg" className='select-none md:block hidden' draggable={false} />
    </div>
  );
};

export default Experience;