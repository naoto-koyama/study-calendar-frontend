'use client';

import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-300 flex items-center justify-between p-4 relative">
      <div className="flex items-center">
        <img src="/images/logo.png" alt="Logo" className="w-10 h-10 mr-2" />
        <h1 className="text-22px text-gray-112-117-122">カレンダー</h1>
      </div>
    </header>
  );
};

export default Header;
