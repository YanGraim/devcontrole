import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return <div className="w-full max-w-7xl px-2 mx-auto">{children}</div>;
}
