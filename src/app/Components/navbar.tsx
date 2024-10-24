"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { FaSearch, FaQuestionCircle } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <nav className="flex font-serif justify-between items-center p-3 navbar bg-white text-blue-900 border-blue-200 shadow-md border-b">
      <div className="">
        <Link href="/" className="text-2xl ml-10 font-semibold font-serif border-b-2 border-blue-400">AM TOOL</Link>
      </div>

      <div className="flex items-center gap-4">

        <button
          onClick={toggleSearch}
          className="bg-[#eef6ff] border-blue-400 border-2 text-blue-900  py-2 px-4 rounded"
        >
          Search
        </button>
        <div
          className={`relative transition-all duration-500 ${isSearchVisible ? 'max-w-xs' : 'max-w-0'} overflow-hidden`} 
        >
          
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 rounded bg-gray-200 text-black"
            style={{ transition: 'max-width 0.5s ease' }} 
          />
          <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-black" />
        </div>

        <Link href="/workflow" className="hover:border-b-2 hover:border-blue-400">WorkFlow</Link>

        
        <Link href="/about" className="hover:border-b-2 hover:border-blue-400">About</Link>
        <Link href="/contact" className="hover:border-b-2 hover:border-blue-400">Contact Us</Link>


        <Link href="/help" className="hover:border-b-2 hover:border-blue-400 flex items-center gap-2">
          <FaQuestionCircle />
          Help
        </Link>


        <div className="w-10 h-10 rounded-full bg-[#eef6ff] border-2 border-blue-400 flex items-center justify-center">
          <span className="">KP</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
