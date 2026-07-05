// src/pages/academy/AcademyEnroll.tsx
//
// IMPORTANT — Netlify Forms + SPA gotcha:
// Netlify detects forms by scanning the STATIC built HTML at deploy time —
// it does not execute JavaScript, so a form only rendered by React is
// invisible to it. You must also add a hidden plain-HTML mirror of this
// form to your root index.html (see the snippet in README_INTEGRATION.md).
// The real React form below still does the actual submitting at runtime.

import { useState, FormEvent } from 'react';

const FOUNDING_SEATS_TOTAL = 10;
const FOUNDING_SEATS_TAKEN = 3; // update as spots fill

export default function AcademyEnroll() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    student_name: '', student_age: '', program_level: '', pricing_tier: '',
    parent_name: '', email: '', phone: '', notes: '',
  });

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const body = new URLSearchParams({ 'form-name': 'academy-enrollment', ...form }).toString();
    try {
      await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
      setSubmitted(true);
    } catch {
      alert('Something went wrong submitting your application. Please email academy@transformumedia.com directly.');
    }
  }

  const remaining = FOUNDING_SEATS_TOTAL - FOUNDING_SEATS_TAKEN;

  return (
    <div className="bg-neutral-50 text-neutral-900 min-h-screen">

      <section className="max-w-6xl mx-auto px-6 pt-20 pb-10">
        <div className="text-amber-600 text-xs font-mono uppercase tracking-widest mb-4">Founding Cohort Enrollment</div>
        <h1 className="text-4xl font-bold mb-4 max-w-2xl">Reserve one of the first 10 founding seats.</h1>
        <p className="text-neutral-600 text-lg max-w-xl mb-8">
          Founding Cohort pricing is locked in for TUMN Academy's very first Foundations class —
          a permanent Founding Class designation, priority featuring, and the same certified
          curriculum every future cohort gets.
        </p>

        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-6 max-w-xl flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="text-2xl font-bold text-amber-700">{remaining} of {FOUNDING_SEATS_TOTAL} seats remaining</div>
            <div className="flex gap-1.5 mt-2">
              {Array.from({ length: FOUNDING_SEATS_TOTAL }).map((_, i) => (
                <span key={i} className={`w-3.5 h-3.5 rounded-full border border-amber-500 ${i < FOUNDING_SEATS_TAKEN ? 'bg-amber-500' : ''}`} />
              ))}
            </div>
          </div>
          <a href="#apply" className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-6 py-3 rounded-full transition">Apply Now</a>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-neutral-200">
        <h2 className="text-3xl font-bold mb-10">Three ways in. Cost is never the barrier.</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 flex flex-col">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Standard</span>
            <h3 className="text-lg font-bold mt-2">Foundations Tuition</h3>
            <div className="text-4xl font-bold text-amber-600 my-3">$249</div>
            <ul className="text-neutral-600 text-sm space-y-2 flex-1">
              <li>Full 5-week program</li><li>Companion workbook</li><li>Studio capstone day</li>
              <li>TUMN Certified Youth Media Creator credential</li>
            </ul>
            <a href="#apply" className="mt-6 text-center border border-neutral-300 hover:border-amber-500 hover:text-amber-600 rounded-full py-2.5 transition">Apply at Standard Rate</a>
          </div>

          <div className="bg-white border-2 border-amber-500 rounded-2xl p-8 flex flex-col relative">
            <span className="absolute -top-3 left-6 bg-amber-500 text-black text-xs font-mono uppercase tracking-widest rounded-full px-3 py-1">First 10 Seats</span>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-600 mt-2">Founding Cohort</span>
            <h3 className="text-lg font-bold mt-2">Founding Cohort</h3>
            <div className="text-4xl font-bold text-amber-600 my-3">$179</div>
            <ul className="text-neutral-600 text-sm space-y-2 flex-1">
              <li>Everything in Standard</li><li>Permanent Founding Class designation</li>
              <li>Priority featuring on TUMN channels</li><li>Locked-in discount off the $249 rate</li>
            </ul>
            <a href="#apply" className="mt-6 text-center bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-full py-2.5 transition">Reserve Founding Seat</a>
          </div>

          <div className="bg-white border border-neutral-200 rounded-2xl p-8 flex flex-col">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Sliding Scale</span>
            <h3 className="text-lg font-bold mt-2">Community Rate</h3>
            <div className="text-4xl font-bold text-amber-600 my-3">$99–149</div>
            <ul className="text-neutral-600 text-sm space-y-2 flex-1">
              <li>For income-verified families</li><li>Partner-org referrals (school, Boys &amp; Girls Club, YMCA)</li>
              <li>Same full program as Standard</li><li>Funded by TUMN's sponsor scholarship pool</li>
            </ul>
            <a href="#apply" className="mt-6 text-center border border-neutral-300 hover:border-amber-500 hover:text-amber-600 rounded-full py-2.5 transition">Apply for Sliding Scale</a>
          </div>
        </div>
        <p className="text-neutral-500 text-sm text-center mt-6">
          Correspondent Track (ages 15–18) is $399 standard / $179–229 sliding scale / $299 Founding Cohort. Select it in the form below.
        </p>
      </section>

      {/* Application form */}
      <section id="apply" className="max-w-6xl mx-auto px-6 py-16 border-t border-neutral-200 grid md:grid-cols-2 gap-14">
        <div>
          <h2 className="text-3xl font-bold mb-4">Start your application.</h2>
          <p className="text-neutral-600 mb-4">This reserves your spot for review — it isn't a payment. TUMN Academy staff will follow up within 2 business days to confirm your seat and collect payment or sliding-scale documentation.</p>
          <p className="text-neutral-600 mb-4">Prefer to talk it through first? Book a free info session instead.</p>
          <a href="https://calendly.com/tumn-academy/info-session" target="_blank" rel="noopener noreferrer"
             className="inline-block border border-neutral-300 hover:border-amber-500 hover:text-amber-600 px-6 py-3 rounded-full transition">
            Book an Info Session (Calendly)
          </a>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-8">
          {submitted ? (
            <div className="border border-amber-400 bg-amber-50 rounded-lg p-6">
              <h3 className="font-bold mb-1">Application received.</h3>
              <p className="text-neutral-700 text-sm">Thanks — a TUMN Academy team member will follow up within 2 business days to confirm your seat.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" name="academy-enrollment">
              <input type="hidden" name="form-name" value="academy-enrollment" />
              {[
                ['student_name', 'Student Full Name', 'text'],
                ['student_age', 'Student Age', 'number'],
              ].map(([field, label, type]) => (
                <div key={field}>
                  <label className="block text-xs uppercase tracking-wide text-neutral-500 mb-1">{label}</label>
                  <input type={type} required value={(form as any)[field]}
                    onChange={(e) => update(field, e.target.value)}
                    className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:border-amber-500" />
                </div>
              ))}
              <div>
                <label className="block text-xs uppercase tracking-wide text-neutral-500 mb-1">Program Level</label>
                <select required value={form.program_level} onChange={(e) => update('program_level', e.target.value)}
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:border-amber-500">
                  <option value="">Select one</option>
                  <option value="foundations">Foundations (13–15)</option>
                  <option value="correspondent">Correspondent Track (15–18)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wide text-neutral-500 mb-1">Pricing Tier</label>
                <select required value={form.pricing_tier} onChange={(e) => update('pricing_tier', e.target.value)}
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:border-amber-500">
                  <option value="">Select one</option>
                  <option value="founding">Founding Cohort</option>
                  <option value="standard">Standard Tuition</option>
                  <option value="sliding_scale">Sliding Scale / Community Rate</option>
                </select>
              </div>
              {[
                ['parent_name', 'Parent / Guardian Name', 'text'],
                ['email', 'Email', 'email'],
                ['phone', 'Phone', 'tel'],
              ].map(([field, label, type]) => (
                <div key={field}>
                  <label className="block text-xs uppercase tracking-wide text-neutral-500 mb-1">{label}</label>
                  <input type={type} required={field !== 'phone'} value={(form as any)[field]}
                    onChange={(e) => update(field, e.target.value)}
                    className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:border-amber-500" />
                </div>
              ))}
              <div>
                <label className="block text-xs uppercase tracking-wide text-neutral-500 mb-1">Anything we should know?</label>
                <textarea value={form.notes} onChange={(e) => update('notes', e.target.value)}
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 min-h-[90px] focus:outline-none focus:border-amber-500" />
              </div>
              <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-2.5 rounded-full transition">
                Submit Application
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
