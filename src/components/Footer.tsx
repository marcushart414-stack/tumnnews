import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-black text-white border-t border-neutral-800">
      {/* Footer Ad Zone */}
      <div className="bg-neutral-900 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="text-center text-xs text-neutral-400">
            [ Advertisement Space - 728x90 Footer Banner ]
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-amber-500">TUMN</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Transform U Media Network is a faith-anchored, trauma-informed digital media and publishing company.
            </p>
          </div>
          {/* Our Brands */}
          <div>
            <h3 className="text-sm font-bold mb-4 tracking-wider">OUR BRANDS</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link to="/brand/urban-news-journal" className="hover:text-amber-500 transition-colors">Urban News Journal</Link></li>
              <li><Link to="/brand/transform-u-live" className="hover:text-amber-500 transition-colors">Transform U! Live Show</Link></li>
              <li><Link to="/brand/kinetic-pe-mixx" className="hover:text-amber-500 transition-colors">Kinetic PE MIXX</Link></li>
              <li><Link to="/brand/warrior-mandate" className="hover:text-amber-500 transition-colors">Warrior Mandate</Link></li>
            </ul>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold mb-4 tracking-wider">QUICK LINKS</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link to="/newsroom" className="hover:text-amber-500 transition-colors">Newsroom</Link></li>
              <li><Link to="/blog" className="hover:text-amber-500 transition-colors">Blog</Link></li>
              <li><Link to="/advertise" className="hover:text-amber-500 transition-colors">Advertise</Link></li>
              <li><Link to="/submit-article" className="hover:text-amber-500 transition-colors">Submit Article</Link></li>
              <li><Link to="/dashboard" className="hover:text-amber-500 transition-colors">Member Dashboard</Link></li>
            </ul>
          </div>
          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold mb-4 tracking-wider">CATEGORIES</h3>
            <div className="flex flex-wrap gap-2">
              {['Faith', 'Leadership', 'Trauma', 'Culture', 'Business', 'Mental Health', 'Politics', 'Entertainment'].map((cat) => (
                <span
                  key={cat}
                  className="text-xs px-2 py-1 bg-neutral-800 text-neutral-300 hover:bg-amber-500 hover:text-black transition-colors cursor-pointer"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
          <p>&copy; {currentYear} Transform U Media Network. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Terms of Service</a>
            <a href="mailto:info@tumnnews.com" className="hover:text-amber-500 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
