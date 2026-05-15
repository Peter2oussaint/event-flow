"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const client = {
  names: "Emma & Pete",
  eventDate: "January, 27th 2026",
};

const navItems = [
  { label: "Profile", href: "/client/profile" },
  { label: "Contract", href: "/client/contract" },
  { label: "Invoice", href: "/client/invoice" },
  { label: "Questionnaire", href: "/client/questionnaire" },
  { label: "Music Planning", href: "/client/music" },
  { label: "Messages", href: "/client/messages" },
  { label: "Logout", href: "/client/login" },
];

function LogoBadge() {
  return (
    <div className="relative h-36 w-36 sm:h-44 sm:w-44">
      <Image
        src="/client/new-pp-logo.png"
        alt="Piper logo"
        fill
        sizes="(min-width: 640px) 176px, 144px"
        className="object-contain"
        priority
      />
    </div>
  );
}

function PortalHeader() {
  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl xl:text-5xl">
          Welcome Emma & Pete!
        </h1>
        <p className="mt-2 text-base font-light text-white/90 sm:text-lg xl:text-xl">
          {client.eventDate}
        </p>
      </div>

      <div className="flex items-center gap-4 self-end sm:self-start md:gap-8">
        <Link
          href="/client/messages"
          aria-label="Messages"
          className="relative flex h-12 w-12 items-center justify-center rounded-lg bg-[#f68e58] text-white sm:h-14 sm:w-14 xl:h-16 xl:w-16"
        >
          <span className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-[#d9473f] sm:h-6 sm:w-6 xl:h-7 xl:w-7" />
          <svg
            aria-hidden="true"
            className="h-8 w-8 sm:h-9 sm:w-9 xl:h-10 xl:w-10"
            viewBox="0 0 64 64"
            fill="currentColor"
          >
            <path d="M32 10C18.2 10 7 18.7 7 29.5c0 6.8 4.5 12.8 11.3 16.3l-2.7 8.9 10.2-6.2c2 .3 4.1.5 6.2.5 13.8 0 25-8.7 25-19.5S45.8 10 32 10Z" />
          </svg>
        </Link>

        <button
          type="button"
          aria-label="Notifications"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f68e58] text-white sm:h-14 sm:w-14 xl:h-16 xl:w-16"
        >
          <svg
            aria-hidden="true"
            className="h-7 w-7 sm:h-8 sm:w-8 xl:h-9 xl:w-9"
            viewBox="0 0 64 64"
            fill="currentColor"
          >
            <path d="M32 57a7 7 0 0 0 6.6-4.7H25.4A7 7 0 0 0 32 57Zm21-14.2-5.5-7.4V25c0-7.9-4.5-14.5-11-16.6V6a4.5 4.5 0 0 0-9 0v2.4c-6.5 2.1-11 8.7-11 16.6v10.4L11 42.8a3.2 3.2 0 0 0 2.6 5.1h36.8a3.2 3.2 0 0 0 2.6-5.1Z" />
          </svg>
        </button>
      </div>
    </header>
  );
}

function ClientSidebar() {
  const pathname = usePathname();

  return (
    <aside className="font-futura flex w-full shrink-0 flex-col items-center rounded-[2rem] bg-[#48897f] px-6 py-8 text-white lg:min-h-[calc(100vh-6rem)] lg:w-72 lg:rounded-[2.4rem] xl:w-80 2xl:w-88">
      <Link
        href="/client/dashboard"
        aria-label="Client dashboard"
        className="transition hover:scale-[1.02]"
      >
        <LogoBadge />
      </Link>

      <nav className="mt-8 flex w-full flex-col items-center gap-4 text-center sm:gap-5 xl:mt-10 xl:gap-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-2xl px-4 py-2 text-xl font-light leading-tight transition sm:text-2xl xl:text-3xl ${
                isActive
                  ? "text-white underline decoration-[#f68e58] decoration-2 underline-offset-8"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  if (pathname === "/client/login") {
    return <section className="min-h-screen bg-[#48897f]">{children}</section>;
  }

  return (
    <section className="font-futura min-h-screen bg-[#26a996] p-5 text-white sm:p-8 lg:p-12">
      <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-8 lg:flex-row">
        <ClientSidebar />
        <div className="min-h-[calc(100vh-6rem)] flex-1">
          <div className="rounded-[2.4rem] bg-[#48897f] p-6 sm:p-8 lg:px-12 lg:py-7 xl:px-16">
            <PortalHeader />
          </div>
          <main>{children}</main>
        </div>
      </div>
    </section>
  );
}
