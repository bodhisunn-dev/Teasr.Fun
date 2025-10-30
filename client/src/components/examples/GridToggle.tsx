import { useState } from "react";
import { GridToggle } from "../GridToggle";

export default function GridToggleExample() {
  const [view, setView] = useState<"single" | "grid">("single");

  return (
    <div className="p-6 space-y-4 bg-card rounded-lg">
      <h3 className="text-sm font-semibold text-muted-foreground">Profile View Toggle</h3>
      <GridToggle view={view} onChange={setView} />
      <p className="text-sm text-muted-foreground">
        Current view: <span className="font-mono font-semibold text-foreground">{view}</span>
      </p>
    </div>
  );
}
