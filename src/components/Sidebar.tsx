"use client";

import { motion } from "framer-motion";

const navItems = ["Home", "Buscar", "Playlists", "Biblioteca", "Radio"];

export function Sidebar() {
  return (
    <aside className="hidden min-h-[calc(100vh-112px)] w-64 shrink-0 lg:block">
      <motion.div
        className="liquid-glass sticky top-5 h-[calc(100vh-112px)] p-5"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <a className="flex items-center gap-3" href="#home" aria-label="Orion Music inicio">
          <span className="brand-orb" />
          <span>
            <strong className="block text-lg">Orion Music</strong>
            <small className="text-xs uppercase tracking-[0.26em] text-slate-400">MVP Real</small>
          </span>
        </a>

        <nav className="mt-9 grid gap-2">
          {navItems.map((item, index) => (
            <a
              className="group flex min-h-11 items-center gap-3 rounded-lg px-3 font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
              href={`#${item.toLowerCase()}`}
              key={item}
            >
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-white/10 text-xs text-cyan-200 group-hover:bg-cyan-300 group-hover:text-slate-950">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item}
            </a>
          ))}
        </nav>

        <div className="mt-9 rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">API Ready</p>
          <p className="mt-2 text-sm text-slate-400">
            Use chaves autorizadas em <code>.env</code> para trocar mocks por dados reais.
          </p>
        </div>
      </motion.div>
    </aside>
  );
}
