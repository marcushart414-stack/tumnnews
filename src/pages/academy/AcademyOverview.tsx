// src/pages/academy/AcademyOverview.tsx
//
// Ported from the standalone static site. Header/Footer are NOT imported
// here — your App.tsx already wraps every route in a global Header/Footer,
// so this component only renders its own page content.

import { Link } from 'react-router-dom';
import { useSEO } from '../../lib/useSEO';

export default function AcademyOverview() {
  useSEO('TUMN Academy', 'A certified youth media production program — Foundations and Correspondent Track — with a direct pipeline into paid TUMN Youth Correspondent roles.');
  return (
    <div className="bg-neutral-50 text-neutral-900 min-h-screen">

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-14 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-amber-600 text-xs font-mono uppercase tracking-widest mb-4">
            Certified Youth Media Program
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
            Your kid has a phone.<br />We teach them to make it a newsroom.
          </h1>
          <p className="text-neutral-600 text-lg mb-8">
            TUMN Academy is a two-level media production program for ages 13–18 — podcasting,
            social content, short film, live production, and AI literacy — built and taught by
            an operating media network. Every student publishes real work. Top graduates go on
            to paid correspondent roles.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link to="/academy/enroll" className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-6 py-3 rounded-full transition">
              Enroll Now
            </Link>
            <a href="mailto:info@tumnnews.com?subject=TUMN%20Academy%20Info%20Session"
               className="border border-neutral-300 hover:border-amber-500 hover:text-amber-600 px-6 py-3 rounded-full transition">
              Request an Info Session
            </a>
          </div>
        </div>
        <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
          <span className="inline-block text-xs font-mono uppercase tracking-widest border border-amber-500 text-amber-600 rounded-full px-3 py-1">
            Foundations · Ages 13–15
          </span>
          <h3 className="text-xl font-bold mt-4">5 Weeks</h3>
          <p className="text-neutral-600 mt-2">Podcasting, social content, short film, and live production basics — every student finishes with a published portfolio.</p>
          <hr className="my-6 border-neutral-200" />
          <span className="inline-block text-xs font-mono uppercase tracking-widest border border-amber-500 text-amber-600 rounded-full px-3 py-1">
            Correspondent Track · Ages 15–18
          </span>
          <h3 className="text-xl font-bold mt-4">6 Weeks</h3>
          <p className="text-neutral-600 mt-2">Series-level production, AI-enhanced storytelling, and a formal review for paid TUMN Youth Correspondent roles.</p>
        </div>
      </section>

      {/* Two levels */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-neutral-200">
        <h2 className="text-3xl font-bold mb-10">Foundations, then Correspondent Track.</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              badge: 'Foundations', title: 'Ages 13–15 · 5 Weeks',
              body: 'Core media literacy and the fundamentals: podcasting, social content creation, short-form video, basic live production, and responsible AI use — paired with built-in media ethics.',
              items: ['Podcast segment + 3 social-ready short-form videos', '60–120 second short film or news segment', 'Studio capstone day + guaranteed TUMN publish credit'],
            },
            {
              badge: 'Correspondent Track', title: 'Ages 15–18 · 6 Weeks',
              body: 'Series-level production: a 3-episode podcast series, a short film or vertical series pilot, and a live-produced broadcast segment — plus AI-enhanced storytelling and editorial judgment training.',
              items: ['Full crew-role rotation across a 2-day series shoot', 'Public capstone screening + pitch day', 'Formal review for paid TUMN Youth Correspondent roles'],
            },
          ].map((level) => (
            <div key={level.badge} className="bg-white border border-neutral-200 rounded-2xl p-8">
              <span className="inline-block text-xs font-mono uppercase tracking-widest border border-amber-500 text-amber-600 rounded-full px-3 py-1">{level.badge}</span>
              <h3 className="text-xl font-bold mt-4">{level.title}</h3>
              <p className="text-neutral-600 mt-2">{level.body}</p>
              <ul className="list-disc list-inside text-neutral-600 mt-4 space-y-1">
                {level.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Certification pipeline */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-neutral-200">
        <h2 className="text-3xl font-bold mb-10">Certification isn't the finish line. It's the on-ramp.</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            ['Step 1', 'Enroll', 'Foundations (13–15) or Correspondent Track (15–18, with prerequisite).'],
            ['Step 2', 'Certify', 'Complete your portfolio and capstone to earn TUMN Certified Youth Media Creator status.'],
            ['Step 3', 'Publish', 'Your capstone work is published under the TUMN youth banner — a real byline, real audience.'],
            ['Step 4', 'Correspondent Review', 'Top Correspondent Track graduates are reviewed for paid TUMN Youth Correspondent roles.'],
          ].map(([step, title, body]) => (
            <div key={step} className="border-t-4 border-amber-500 pt-4">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-600">{step}</div>
              <h3 className="font-bold mt-2 mb-1">{title}</h3>
              <p className="text-neutral-600 text-sm">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founding cohort CTA */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-neutral-200">
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-10 flex flex-wrap justify-between items-center gap-8">
          <div className="max-w-lg">
            <div className="text-amber-700 text-xs font-mono uppercase tracking-widest mb-2">Founding Cohort</div>
            <h2 className="text-2xl font-bold mb-2">First 10 seats — locked-in founding pricing.</h2>
            <p className="text-neutral-700">Foundations Cohort 1 is capped at 10 students. Founding families get a permanent Founding Class designation and priority featuring on TUMN channels.</p>
          </div>
          <Link to="/academy/enroll" className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-6 py-3 rounded-full transition">
            Reserve a Seat
          </Link>
        </div>
      </section>

    </div>
  );
}
