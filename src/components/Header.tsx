'use client';

import Link from 'next/link';
import { navItems } from '@/lib/data';
import { Gamepad2, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460] border-b border-[#e94560]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Gamepad2 className="w-8 h-8 text-[#e94560] group-hover:rotate-12 transition-transform" />
            <span className="text-xl font-bold bg-gradient-to-r from-[#e94560] to-[#ff6b6b] bg-clip-text text-transparent">
              GTA VI Guide
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-[#e94560]/20 transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="ml-4 px-4 py-2 bg-[#e94560] hover:bg-[#d63851] text-white text-sm font-medium rounded-lg transition-colors"
            >
              Admin
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#e94560]/20">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-[#e94560]/20 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/admin"
                className="px-4 py-2 bg-[#e94560] text-white text-sm font-medium rounded-lg text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
