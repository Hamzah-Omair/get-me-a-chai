import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex h-16 items-center justify-center bg-gray-950 px-4 text-white">
      <p>© {currentYear} Get Me A Chai. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
