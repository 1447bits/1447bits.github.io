import React from 'react';

const Experience = () => {
  return (
    <div className="min-h-screen  p-8 font-primary flex flex-col items-center">
      <img src="/assets/exp-mobilesec.svg" className='md:hidden block select-none' draggable={false} />
      <img src="/assets/expdesktop-section.svg" className='select-none md:block hidden' draggable={false} />

      <div className="w-full max-w-3xl border-t border-gray-700 my-12"></div>

      <div className='w-max text-left'>
        <p className='mb-5 font-bold font-heading text-xl'>Other Responsibilities</p>
        <p>[ 2023 - 2024 ] : Technical Head @ACM-DYPIEMR</p>
        <p>[ 2023 - 2024 ] : Web Development Head @Novus-Neurons</p>
        <p>[ 2023 - 2024 ] : Web Developer @TEDX-DYPEC</p>
        <p>[ 2022 - 2023 ] : Jt. Web Development Head @CSI-DYPIEMR</p>
      </div>

      <div className="w-full max-w-3xl border-t border-gray-700 my-12"></div>
    </div>
  );
};

export default Experience;