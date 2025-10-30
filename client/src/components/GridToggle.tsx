import { Button } from "@/components/ui/button";
import { Grid3x3, RectangleVertical } from "lucide-react";

interface GridToggleProps {
  view: "single" | "grid";
  onChange: (view: "single" | "grid") => void;
}

export function GridToggle({ view, onChange }: GridToggleProps) {
  return (
    <div 
      className="inline-flex items-center bg-muted p-1 rounded-full" 
      data-testid="grid-toggle"
    >
      <Button
        variant={view === "single" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("single")}
        className="rounded-full h-8 px-3"
        data-testid="button-view-single"
      >
        <RectangleVertical className="w-4 h-4 mr-1" />
        Single
      </Button>
      <Button
        variant={view === "grid" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("grid")}
        className="rounded-full h-8 px-3"
        data-testid="button-view-grid"
      >
        <Grid3x3 className="w-4 h-4 mr-1" />
        Grid
      </Button>
    </div>
  );
}
