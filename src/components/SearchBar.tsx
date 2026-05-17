"use client";

import { useState } from "react";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  return (
    <form
      className="flex min-h-12 w-full items-center rounded-full border border-white/10 bg-black/55 px-2 shadow-glow backdrop-blur-glass md:max-w-md"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(query);
      }}
    >
      <input
        className="h-11 min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-slate-500"
        maxLength={90}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Pesquisar musicas no Orion"
        value={query}
      />
      <button className="h-9 rounded-full bg-cyan-300 px-4 text-sm font-black text-slate-950" type="submit">
        Buscar
      </button>
    </form>
  );
}
