import { Info } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import './App.css'
import TerminalComponent from './components/Terminal'

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col max-w-[1200px] mx-auto items-center justify-center min-h-screen text-white md:p-4 p-6">
      {/* Main content area */}
      <div className="max-w-full w-full md:py-5 pt-24 flex flex-col md:h-[700px] h-[800px] md:max-h-[70vh] max-h-[900px] md:flex-row items-center justify-between gap-8">
        {/* Text section */}
        <div className="max-w-lg flex-1">
          <h1
            className="font-mono text-4xl md:text-5xl mb-2 font-bold"
            style={{ fontFamily: "'Kode Mono', monospace" }}
          >
            Hello!!
          </h1>

          <h2
            className="font-mono text-xl md:text-2xl mb-6 text-gray-300"
            style={{ fontFamily: "'Kode Mono', monospace" }}
          >
            I am Atharv - Fullstack developer <a className='hover:underline transition-all' href='https://altrdtech.com/'>@Altrd</a>
          </h2>

          <p
            className="text-gray-400 mb-8 leading-relaxed"
            style={{ fontFamily: "'Imprima', sans-serif" }}
          >
            Hi, I'm Atharv Vyas! A tech enthusiast and full-stack developer with a
            knack for turning ideas into powerful digital experiences. From
            crafting AI-powered solutions to building dynamic web applications, I
            thrive on innovation and pushing boundaries. Let's explore the
            intersection of creativity and technology together—welcome to my
            world!
          </p>
          <span className='flex gap-4'>
          <span><a className=' opacity-60 hover:opacity-80 hover:underline transition-all' href='https://github.com/1447bits'>Github</a></span>
          <span><a className='opacity-60 hover:opacity-80 hover:underline transition-all' href='https://www.linkedin.com/in/mstatharv/'>Linkedin</a></span>
          </span>
        </div>

        {/* Floating image */}
        <div className="relative flex items-center flex-col justify-center">
          <div
            className={`transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}
            style={{
              animation: 'float 3s ease-in-out infinite',
            }}
          >
            <img
              src="/object.png"
              alt="Floating object"
              className="w-96 object-contain"
            />
          </div>
          <img
            src="/base.png"
            alt="Floating object"
            className="w-96 object-contain"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="w-full max-w-3xl border-t border-gray-700 my-12"></div>

      {/* Terminal section */}
      <div className="w-full max-w-[1200px]">
        <div className="terminalBG border h-[800px] max-h-[80vh] border-gray-700 rounded-xl overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center px-4 py-2 border-b border-gray-700">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex-1 text-center text-gray-400 text-sm">#askAtharv</div>
            <div className="text-center text-gray-400 text-sm hover:scale-105 transition-all hover:text-gray-200" title={`- command starts with "/" \n- press tab to auto complete \n- use arrow keys to select commands \n- use "/clear" to clear the terminal \n- Help Command "/help"`}><Info /></div>
          </div>

          {/* Terminal content */}
          <div className="p-4">
            <div className="flex items-start overflow-auto noScrollbar max-h-[70vh]">
              <TerminalComponent containerStyle={'md:h-[70vh] h-[720px]'} />
            </div>
            {/* Command output would go here */}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Portfolio;