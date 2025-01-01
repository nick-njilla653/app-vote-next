// src/app/page.tsx
'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import LoginPage from '@/features/LoginPage/components/LoginPage';
import ElectionHomePage from '@/features/ElectionHomePage/components/ElectionHomePage';
import AdminInterface from '@/features/AdminInterface/components/AdminInterface';
import ScrutateurInterface from '@/features/ScrutateurInterface/components/ScrutateurInterface';
import SurveillanceInterface from '@/features/SurveillanceInterface/components/SurveillanceInterface';
import VoterInterface from '@/features/VoterInterface/components/VoterInterface';
import TransversalInterface from '@/features/TransversalInterface/components/TransversalInterface';
import IntegrationInterface from '@/features/IntegrationInterface/components/IntegrationInterface';
import ElectionCalendarPage from '@/features/ElectionCalendarPage/components/ElectionCalendarPage';


export default function Home() {
  const [activeInterface, setActiveInterface] = useState<string | null>(null);

  const interfaces = [
    { name: "Admin Interface", path: "/AdminInterface" },
    { name: "Election Home Page", path: "/ElectionHomePage" },
    { name: "Integration Interface", path: "/IntegrationInterface" },
    { name: "Scrutateur Interface", path: "/ScrutateurInterface" },
    { name: "Surveillance Interface", path: "/SurveillanceInterface" },
    { name: "Transversal Interface", path: "/TransversalInterface" },
    { name: "Voter Interface", path: "/VoterInterface" },
    { name: "Election Calendar Page", path: "/ElectionCalendarPage" },
    { name: "Login Page", path: "/login" }
  ];

  // Function to handle interface selection
  const handleInterfaceSelect = (name: string) => {
    setActiveInterface(name);
  };

  // If an interface is active, render that interface
  if (activeInterface === "Election Home Page") {
    return <ElectionHomePage />;
  }

  if (activeInterface === "Login Page") {
    return <LoginPage />;
  }

  if (activeInterface === "Admin Interface") {
    return <AdminInterface />;
  }

  if (activeInterface === "Scrutateur Interface") {
    return <ScrutateurInterface />;
  }

  if (activeInterface === "Surveillance Interface") {
    return <SurveillanceInterface />;
  }

  if (activeInterface === "Voter Interface") {
    return <VoterInterface />;
  }

  if (activeInterface === "Transversal Interface") {
    return <TransversalInterface />;
  }

  if (activeInterface === "Integration Interface") {
    return <IntegrationInterface />;
  }

  if (activeInterface === "Election Calendar Page") {
    return <ElectionCalendarPage />;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        <h2 className="text-xl font-bold mb-4">Election Management System Interfaces</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-2xl">
          {interfaces.map((inter) => (
            <button 
              key={inter.name}
              onClick={() => handleInterfaceSelect(inter.name)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-600 transition-colors text-sm"
            >
              {inter.name}
            </button>
          ))}
        </div>

        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] mt-8">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}