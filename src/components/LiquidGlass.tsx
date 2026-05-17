import type { PropsWithChildren } from "react";

type LiquidGlassProps = PropsWithChildren<{
  className?: string;
}>;

export function LiquidGlass({ children, className = "" }: LiquidGlassProps) {
  return (
    <div className={`liquid-glass ${className}`}>
      <span className="glass-reflection" aria-hidden="true" />
      {children}
    </div>
  );
}
