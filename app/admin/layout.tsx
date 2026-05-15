"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Leads", href: "/admin/leads" },
  { label: "Import Inquiry", href: "/admin/leads/import" },
  { label: "Clients", href: "/admin/clients" },
  { label: "Contracts", href: "/admin/contracts" },
  { label: "Invoices", href: "/admin/invoices" },
  { label: "Questionnaires", href: "/admin/questionnaires" },
  { label: "Messages", href: "/admin/messages" },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <section className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="border-b border-slate-800 bg-slate-900/95 px-4 py-5 lg:w-72 lg:border-b-0 lg:border-r lg:px-5">
          <Link href="/admin/dashboard" className="block rounded-xl px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
              Event Flow
            </p>
            <h1 className="mt-2 text-xl font-semibold text-white">Admin CRM</h1>
          </Link>

          <nav className="mt-6 flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-teal-500/15 text-teal-200 ring-1 ring-teal-400/30"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-slate-800 bg-slate-950/80 px-5 py-4 lg:px-8">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-400">Internal workspace</p>
              <p className="text-sm font-medium text-orange-300">
                Single-tenant admin shell
              </p>
            </div>
          </header>

          <main className="flex-1 px-5 py-6 lg:px-8 lg:py-8">{children}</main>
        </div>
      </div>
    </section>
  );
}
