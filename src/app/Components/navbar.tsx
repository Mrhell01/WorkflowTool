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
    <nav className="flex justify-between items-center p-3 navbar bg-[#2d2e2e]">
      <div className="text-white">
        <Link href="/" className="text-white ml-12">Logo</Link>
      </div>
      <Link href="/workflow" className="text-white pl-40">WorkFlow</Link>

      {/* Search Bar */}
      <div className="flex items-center gap-4">
        {/* Search Button */}
        <button
          onClick={toggleSearch}
          className="bg-gray-600 text-white py-2 px-4 rounded"
        >
          Search
        </button>

        {/* Search Bar with Animation */}
        <div
          className={`relative transition-all duration-500 ${isSearchVisible ? 'max-w-xs' : 'max-w-0'} overflow-hidden`} // Slower animation
        >
          
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 rounded bg-gray-200 text-black"
            style={{ transition: 'max-width 0.5s ease' }} // Slower transition
          />
          <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-black" />
        </div>

        {/* Links */}
        
        <Link href="/about" className="text-white">About</Link>
        <Link href="/contact" className="text-white">Contact Us</Link>

        {/* Help Link with Icon */}
        <Link href="/help" className="text-white flex items-center gap-2">
          <FaQuestionCircle />
          Help
        </Link>

        {/* Profile Circle */}
        <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center">
          <span className="text-white">P</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
