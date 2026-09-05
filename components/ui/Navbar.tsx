"use client";
import React from 'react';
import { Rocket, Home, Info, Zap, BookOpen, Mail, HelpCircle } from 'lucide-react';

export default function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <nav className="w-full h-16 bg-black/50 backdrop-blur-xl border-b border-white/10 fixed top-0 z-50 flex items-center px-6 md:px-12 font-sans">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Mobile menu button (left on mobile) */}
        <button onClick={onMenuClick} className="md:hidden text-white/80 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>

        {/* Logo / Brand */}
        <a href="/" className="flex items-center justify-center bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors">
          <Rocket className="w-5 h-5 text-white" />
        </a>
        
        {/* Center Links */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-white/70">
          <a href="#" className="flex items-center gap-1.5 hover:text-white transition-colors"><Home className="w-4 h-4"/> Home</a>
          <a href="#" className="flex items-center gap-1.5 hover:text-white transition-colors"><Info className="w-4 h-4"/> About</a>
          <a href="#" className="flex items-center gap-1.5 hover:text-white transition-colors"><Zap className="w-4 h-4"/> Services</a>
          <a href="#" className="flex items-center gap-1.5 hover:text-white transition-colors"><BookOpen className="w-4 h-4"/> Blog</a>
          <a href="#" className="flex items-center gap-1.5 hover:text-white transition-colors"><Mail className="w-4 h-4"/> Contact</a>
          <a href="#" className="flex items-center gap-1.5 hover:text-white transition-colors"><HelpCircle className="w-4 h-4"/> FAQs</a>
        </div>
        
        {/* Right Buttons */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
            Sign-in
          </a>
          <a href="#" className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors">
            Get Started
          </a>
        </div>

        {/* Empty div for balancing the flex layout on mobile */}
        <div className="w-10 md:hidden" />
      </div>
    </nav>
  );
}
