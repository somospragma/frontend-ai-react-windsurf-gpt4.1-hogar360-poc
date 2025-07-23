import React from 'react';
import { Header } from '../../organisms/Header';
import { Footer } from '../../organisms/Footer';
import { AsidePanel } from '../../organisms/AsidePanel';
import { FooterExtended } from '../../organisms/FooterExtended';

interface BasicLayoutProps {
  children: React.ReactNode;
}

export const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
  return (
    <div className='min-h-screen flex flex-col bg-gray-50'>
      <Header />
      <div className='flex flex-1'>
        <AsidePanel />
        <main className='flex-1 px-4 py-8'>{children}</main>
      </div>
      <FooterExtended />
      <Footer />
    </div>
  );
};
