// src/components/AdSlot.tsx
//
// Renders one of the current affiliate ad creatives in a given IAB standard
// size. rel="sponsored" is the correct semantic annotation for paid/affiliate
// links (tells search engines this is a paid placement, not an organic link).

interface AdCreative {
  src: string;
  href: string;
  alt: string;
  width: number;
  height: number;
}

const ADS: Record<'leaderboard' | 'billboard' | 'mediumRectangle', AdCreative> = {
  leaderboard: { // 728x90
    src: '/ads/united-728x90.jpeg',
    href: 'https://united.elfm.net/c/5861817/517826/4704',
    alt: 'United MileagePlus — Buy miles and add to your account',
    width: 728,
    height: 90,
  },
  billboard: { // 970x90
    src: '/ads/pillow-guy-970x90.png',
    href: 'https://pillowguy.rvgu.net/c/5861817/609153/9870',
    alt: 'Pillow Guy — Shop now',
    width: 970,
    height: 90,
  },
  mediumRectangle: { // 300x250
    src: '/ads/hilton.gif',
    href: 'https://hilton.ijrn.net/c/5861817/3930273/4823',
    alt: 'Hilton Honors — Get 100% more points, claim bonus',
    width: 300,
    height: 250,
  },
};

interface AdSlotProps {
  size: 'leaderboard' | 'billboard' | 'mediumRectangle';
  className?: string;
}

export default function AdSlot({ size, className }: AdSlotProps) {
  const ad = ADS[size];
  return (
    <div className={className}>
      <div className="text-center text-[10px] text-neutral-400 mb-1 tracking-wide">ADVERTISEMENT</div>
      <a href={ad.href} target="_blank" rel="noopener noreferrer sponsored" className="block mx-auto" style={{ maxWidth: ad.width }}>
        <img src={ad.src} alt={ad.alt} width={ad.width} height={ad.height} className="w-full h-auto" />
      </a>
    </div>
  );
}
