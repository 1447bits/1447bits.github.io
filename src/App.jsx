import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home'
import NotFound from './components/NotFound'
import Projects from './components/Projects'
import Experience from './components/Experience'
import About from './components/About'
import PageBG from './components/pageBg'
import './App.css'

function App() {
  return (
    <div id='app'>
      <PageBG />
      <nav className="flex max-w-[1200px] mx-auto justify-end p-8">
        <ul className="flex gap-6 font-primary">
          <li><Link to="/" className=" hover:underline underline-offset-4 hover:text-gray-300">Home</Link></li>
          <li><Link to="/projects" className=" hover:underline underline-offset-4 hover:text-gray-300">Projects</Link></li>
          <li><Link to="/experience" className=" hover:underline underline-offset-4 hover:text-gray-300">Experience</Link></li>
          <li><Link to="/contact" className=" hover:underline underline-offset-4 hover:text-gray-300">Contact</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />

        {/* Catch all for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
