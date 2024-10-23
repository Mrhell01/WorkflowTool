// components/Navbar.tsx
import Link from 'next/link';
import React from 'react';


const Navbar: React.FC = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'black' }}>
    <div style={{ color: 'white' }}>
    <Link href="/" style={{ color: 'white' }}>Logo</Link>
    </div>

    <div style={{ display: 'flex', gap: '1rem' }}>
      <Link href="/about" style={{ color: 'white' }}>About</Link>
      <Link href="/contact" style={{ color: 'white' }}>Contact Us</Link>
    </div>
  </nav>
  );
};

export default Navbar;
