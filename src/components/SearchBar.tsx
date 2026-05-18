"use client";

import { useEffect, useState } from "react";

type SearchBarProps = {
  value?: string;
  onSearch: (query: string) => void;
};

export function SearchBar({ value = "", onSearch }: SearchBarProps) {
  const [query, setQuery] = useState(value);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  return (
    <form
      className="flex min-h-12 w-full items-center rounded-full border border-white/10 bg-black/55 px-2 shadow-glow backdrop-blur-glass md:max-w-md"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(query);
      }}
    >
      <input
        aria-label="Pesquisar musicas no Orion"
        autoComplete="off"
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
