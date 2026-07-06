import { Link } from 'react-router-dom';
import { useSEO } from '../lib/useSEO';

const brands = [
  {
    id: 'urban-news-journal',
    name: 'Urban News Journal',
    tagline: 'Amplifying Urban Voices, Telling Untold Stories',
    icon: '📰',
  },
  {
    id: 'transform-u-live',
    name: 'Transform U! Live Show',
    tagline: 'Where Transformation Meets Conversation',
    icon: '🎙️',
  },
  {
    id: 'kinetic-pe-mixx',
    name: 'Kinetic PE MIXX',
    tagline: 'Energy in Motion',
    icon: '⚡',
  },
  {
    id: 'warrior-mandate',
    name: 'Warrior Mandate',
    tagline: 'Forging Men of Purpose',
    icon: '⚔️',
  },
];

const Brands = () => {
  useSEO('Our Brands', 'Urban News Journal, Transform U! Live Show, Kinetic PE MIXX, and Warrior Mandate — the four brands of Transform U Media Network.');
  return (
    <div className="bg-white">
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Our Brands</h1>
          <p className="text-xl text-neutral-300">
            Four voices, one network — explore everything under the Transform U Media Network umbrella.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                to={`/brand/${brand.id}`}
                className="block border-2 border-neutral-300 p-10 hover:border-amber-500 transition-colors"
              >
                <div className="text-5xl mb-4">{brand.icon}</div>
                <h2 className="text-2xl font-bold mb-2">{brand.name}</h2>
                <p className="text-neutral-600">{brand.tagline}</p>
                <span className="inline-block mt-4 text-amber-500 font-bold text-sm">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Brands;
