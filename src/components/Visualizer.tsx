export function Visualizer({ active }: { active: boolean }) {
  return (
    <div className={`visualizer ${active ? "is-active" : ""}`} aria-hidden="true">
      {Array.from({ length: 28 }, (_, index) => (
        <span key={index} style={{ ["--height" as string]: `${22 + (index % 8) * 8}px`, ["--delay" as string]: `${index * 42}ms` }} />
      ))}
    </div>
  );
}
