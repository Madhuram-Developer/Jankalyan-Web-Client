import React from 'react';

const Header = ({ title, onBack }) => {
  return (
    <header className="flex items-center p-4 border-b border-(--color-border)">
      <button onClick={onBack} className="text-(--color-text-primary)">
        <span className="material-symbols-outlined text-3xl">arrow_back_ios_new</span>
      </button>
      <h1 className="text-center w-full text-xl font-bold text-(--color-text-primary) pr-8">{title}</h1>
    </header>
  );
};

export default Header;