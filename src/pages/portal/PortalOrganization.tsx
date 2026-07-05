// src/pages/portal/PortalOrganization.tsx

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { signOut } from '../../lib/auth';
import { useRequireRole } from '../../lib/useRequireRole';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface Resource { id: number; tier: string; category: string; title: string; description: string; file_url: string | null; }

const CATEGORY_LABELS: Record<string, string> = {
  instructor_guide: 'Instructor Guide', workbook: 'Student Workbook',
  marketing_kit: 'Marketing Kit', portal_tools: 'Portal Tools',
};
const TIER_LABELS: Record<string, string> = { starter: 'Starter', pro: 'Pro', enterprise: 'Enterprise' };

export default function PortalOrganization() {
  const { loading, profile } = useRequireRole('org_purchaser');
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    if (!profile) return;
    (async () => {
      const { data } = await supabase.from('resources').select('*').order('category');
      setResources(data || []);
    })();
  }, [profile]);

  if (loading || !profile) return <div className="min-h-screen bg-neutral-50" />;

  return (
    <div className="bg-neutral-50 text-neutral-900 min-h-screen">
      <Header />
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex justify-between items-start flex-wrap gap-4 mb-10">
          <div>
            <div className="text-amber-600 text-xs font-mono uppercase tracking-widest mb-2">Program-in-a-Box Partner Portal</div>
            <h1 className="text-3xl font-bold">{profile.organization_name || profile.full_name || profile.email}</h1>
            <span className="inline-block mt-2 text-xs font-mono uppercase tracking-widest border border-amber-500 text-amber-600 rounded-full px-3 py-1">
              {TIER_LABELS[profile.license_tier || ''] || 'No'} License
            </span>
          </div>
          <button onClick={() => signOut().then(() => (window.location.href = '/academy/portal/login'))}
            className="border border-neutral-300 hover:border-amber-500 hover:text-amber-600 px-5 py-2 rounded-full transition h-fit">
            Log Out
          </button>
        </div>

        <h2 className="text-xl font-bold mb-4">Your Resource Library</h2>
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {resources.length === 0 && <p className="text-neutral-500">No resources available for your license tier yet. Contact your TUMN account liaison.</p>}
          {resources.map((r) => (
            <div key={r.id} className="bg-white border border-neutral-200 rounded-xl p-6">
              <span className="text-xs font-mono uppercase tracking-wide border border-amber-500 text-amber-600 rounded-full px-3 py-1">
                {CATEGORY_LABELS[r.category] || r.category}
              </span>
              <h3 className="font-bold mt-3 mb-2">{r.title}</h3>
              <p className="text-neutral-600 text-sm mb-3">{r.description}</p>
              {r.file_url
                ? <a href={r.file_url} target="_blank" rel="noopener noreferrer" className="text-amber-600 font-semibold text-sm hover:underline">Download →</a>
                : <span className="text-neutral-400 text-xs font-mono">File pending upload</span>}
            </div>
          ))}
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-8 flex justify-between items-center flex-wrap gap-4">
          <div>
            <div className="text-amber-600 text-xs font-mono uppercase tracking-widest mb-1">Need a higher tier?</div>
            <h3 className="font-bold">Upgrade your license for more cohorts and co-branding.</h3>
          </div>
          <a href="mailto:executive.office@marcus-hart.com?subject=TUMN%20Academy%20in%20a%20Box%20-%20Upgrade%20Request"
             className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-6 py-3 rounded-full transition">
            Talk to TUMN
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
