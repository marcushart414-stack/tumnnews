import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import AdSlot from './AdSlot';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [academyOpen, setAcademyOpen] = useState(false);
  const location = useLocation();
  const isAcademyRoute = location.pathname.startsWith('/academy');

  const brands = [
    { id: 'urban-news-journal', name: 'Urban News Journal' },
    { id: 'transform-u-live', name: 'Transform U! Live Show' },
    { id: 'kinetic-pe-mixx', name: 'Kinetic PE MIXX' },
    { id: 'warrior-mandate', name: 'Warrior Mandate' },
  ];

  return (
    <header className="bg-black text-white sticky top-0 z-50 border-b border-neutral-800">
      {/* Top Bar - Ad Zone (hidden on TUMN Academy pages) */}
      {!isAcademyRoute && (
        <div className="bg-neutral-900 border-b border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <AdSlot size="leaderboard" />
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-col">
            <span className="text-2xl font-bold tracking-tight">TUMN</span>
            <span className="text-[10px] text-amber-500 tracking-widest uppercase">Transform U Media Network</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* FIX: onMouseEnter/onMouseLeave now live on this outer wrapper only,
                and the dropdown sits flush (pt-2 instead of mt-2) so there's no
                dead zone between the button and the menu. */}
            <div
              className="relative"
              onMouseEnter={() => setBrandsOpen(true)}
              onMouseLeave={() => setBrandsOpen(false)}
            >
              <Link to="/brands" className="text-sm font-medium hover:text-amber-500 transition-colors flex items-center gap-1">
                OUR BRANDS
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              {brandsOpen && (
                <div className="absolute top-full left-0 pt-2 w-64">
                  <div className="bg-neutral-900 border border-neutral-700 shadow-xl">
                    {brands.map((brand) => (
                      <Link
                        key={brand.id}
                        to={`/brand/${brand.id}`}
                        className="block px-6 py-3 text-sm hover:bg-neutral-800 hover:text-amber-500 transition-colors border-b border-neutral-800 last:border-b-0"
                      >
                        {brand.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link to="/newsroom" className="text-sm font-medium hover:text-amber-500 transition-colors">
              NEWSROOM
            </Link>
            <Link to="/blog" className="text-sm font-medium hover:text-amber-500 transition-colors">
              BLOG
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setAcademyOpen(true)}
              onMouseLeave={() => setAcademyOpen(false)}
            >
              <Link to="/academy" className="text-sm font-medium hover:text-amber-500 transition-colors flex items-center gap-1">
                TUMN ACADEMY
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              {academyOpen && (
                <div className="absolute top-full left-0 pt-2 w-56">
                  <div className="bg-neutral-900 border border-neutral-700 shadow-xl">
                    <Link to="/academy" className="block px-6 py-3 text-sm hover:bg-neutral-800 hover:text-amber-500 transition-colors border-b border-neutral-800">
                      Program Overview
                    </Link>
                    <Link to="/academy/enroll" className="block px-6 py-3 text-sm hover:bg-neutral-800 hover:text-amber-500 transition-colors border-b border-neutral-800">
                      Enroll Now
                    </Link>
                    <Link to="/academy/portal/login" className="block px-6 py-3 text-sm hover:bg-neutral-800 hover:text-amber-500 transition-colors">
                      Academy Hub Login
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link to="/advertise" className="text-sm font-medium hover:text-amber-500 transition-colors">
              ADVERTISE
            </Link>
            <Link
              to="/submit-article"
              className="text-sm font-medium bg-amber-500 text-black px-4 py-2 hover:bg-amber-400 transition-colors"
            >
              SUBMIT ARTICLE
            </Link>
            <Link to="/login" className="text-sm font-medium hover:text-amber-500 transition-colors">
              LOGIN
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-900 border-t border-neutral-800">
          <nav className="px-4 py-4 space-y-2">
            <div className="text-xs text-neutral-400 font-semibold mb-2">OUR BRANDS</div>
            {brands.map((brand) => (
              <Link
                key={brand.id}
                to={`/brand/${brand.id}`}
                className="block px-4 py-2 text-sm hover:bg-neutral-800 hover:text-amber-500 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {brand.name}
              </Link>
            ))}
            <div className="border-t border-neutral-800 my-2"></div>
            <Link
              to="/newsroom"
              className="block px-4 py-2 text-sm hover:bg-neutral-800 hover:text-amber-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              NEWSROOM
            </Link>
            <Link
              to="/blog"
              className="block px-4 py-2 text-sm hover:bg-neutral-800 hover:text-amber-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              BLOG
            </Link>
            <div className="border-t border-neutral-800 my-2"></div>
            <div className="text-xs text-neutral-400 font-semibold mb-2">TUMN ACADEMY</div>
            <Link
              to="/academy"
              className="block px-4 py-2 text-sm hover:bg-neutral-800 hover:text-amber-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Program Overview
            </Link>
            <Link
              to="/academy/enroll"
              className="block px-4 py-2 text-sm hover:bg-neutral-800 hover:text-amber-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Enroll Now
            </Link>
            <Link
              to="/academy/portal/login"
              className="block px-4 py-2 text-sm hover:bg-neutral-800 hover:text-amber-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Academy Hub Login
            </Link>
            <div className="border-t border-neutral-800 my-2"></div>
            <Link
              to="/advertise"
              className="block px-4 py-2 text-sm hover:bg-neutral-800 hover:text-amber-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              ADVERTISE
            </Link>
            <Link
              to="/submit-article"
              className="block px-4 py-2 text-sm bg-amber-500 text-black hover:bg-amber-400 transition-colors text-center font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              SUBMIT ARTICLE
            </Link>
            <Link
              to="/login"
              className="block px-4 py-2 text-sm hover:bg-neutral-800 hover:text-amber-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              LOGIN
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
