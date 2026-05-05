import {
  generatePalette,
  HARMONIES,
  hexToHsl,
  hslToHex,
  type HarmonyMode,
} from "@/lib/paletteGenerator";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ColorWheelPickerProps = {
  baseHex: string;
  onColorChange: (hex: string) => void;
};

const ColorWheelPicker = ({
  baseHex,
  onColorChange,
}: ColorWheelPickerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hexInput, setHexInput] = useState(baseHex);
  const [harmony, setHarmony] = useState<HarmonyMode>("analogous");
  const [showPalette, setShowPalette] = useState(false);

  // Draw the color wheel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const cx = W / 2;
    const r = W / 2 - 2;

    // Draw hue/saturation wheel
    for (let a = 0; a < 360; a += 1) {
      const g = ctx.createRadialGradient(cx, cx, 0, cx, cx, r);
      g.addColorStop(0, `hsl(${a},0%,55%)`);
      g.addColorStop(0.45, `hsl(${a},70%,55%)`);
      g.addColorStop(1, `hsl(${a},100%,38%)`);
      ctx.beginPath();
      ctx.moveTo(cx, cx);
      ctx.arc(cx, cx, r, ((a - 1) * Math.PI) / 180, ((a + 1) * Math.PI) / 180);
      ctx.closePath();
      ctx.fillStyle = g;
      ctx.fill();
    }

    // Add subtle vignette
    const v = ctx.createRadialGradient(cx, cx, r * 0.65, cx, cx, r);
    v.addColorStop(0, "rgba(0,0,0,0)");
    v.addColorStop(1, "rgba(0,0,0,0.2)");
    ctx.beginPath();
    ctx.arc(cx, cx, r, 0, Math.PI * 2);
    ctx.fillStyle = v;
    ctx.fill();
  }, []);

  // Draw selected color dot on wheel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const cx = W / 2;
    const r = W / 2 - 2;
    const [h, s, l] = hexToHsl(baseHex);
    const wheelRadius = cx * Math.min(s / 100, 1) * 0.82;
    const rad = ((h - 90) * Math.PI) / 180;
    const x = cx + Math.cos(rad) * wheelRadius;
    const y = cx + Math.sin(rad) * wheelRadius;

    // Draw indicator circle
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.stroke();
  }, [baseHex]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const dx = x - cx;
    const dy = y - cy;
    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxRadius = (canvas.width / 2 - 2) * 0.82;
    const saturation = Math.min((distance / maxRadius) * 100, 100);

    const [, , l] = hexToHsl(baseHex);
    const newHex = hslToHex(angle, saturation, l);
    setHexInput(newHex);
    onColorChange(newHex);
  };

  const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.trim();
    if (!v.startsWith("#")) v = "#" + v;
    setHexInput(v);
    // Only trigger color change if it's a valid hex color
    if (/^#[0-9a-fA-F]{6}$/.test(v)) {
      onColorChange(v);
    }
  };

  const palette = generatePalette(baseHex, harmony);

  return (
    <div className="flex flex-col gap-4 p-3">
      {/* Title */}
      <div className="text-sm font-semibold text-foreground">
        Color Palette Generator
      </div>

      {/* Color Wheel */}
      <div className="flex flex-col items-center gap-2">
        <canvas
          ref={canvasRef}
          width={160}
          height={160}
          onClick={handleCanvasClick}
          className="cursor-crosshair rounded-full border border-border/40 bg-white"
        />
        <span className="text-xs text-foreground/60">
          Click to select color
        </span>
      </div>

      {/* Hex Input */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-foreground/70">Base Color</label>
        <input
          type="text"
          value={hexInput}
          onChange={handleHexInput}
          placeholder="#807244"
          className="w-full rounded-md border border-border/40 bg-background/50 px-2.5 py-1.5 text-xs font-mono text-foreground placeholder:text-foreground/40"
        />
      </div>

      {/* Harmony Selector */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-foreground/70">Harmony Mode</label>
        <div className="grid grid-cols-2 gap-1.5">
          {Object.entries(HARMONIES).map(([key, def]) => (
            <button
              key={key}
              onClick={() => setHarmony(key as HarmonyMode)}
              className={`rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                harmony === key
                  ? "border-accent bg-accent/20 text-accent"
                  : "border-border/40 bg-background/50 text-foreground/70 hover:bg-background/70"
              }`}
              title={def.desc}
            >
              {def.name}
            </button>
          ))}
        </div>
      </div>

      {/* Generated Palette Preview */}
      <button
        onClick={() => setShowPalette(!showPalette)}
        className="flex items-center justify-between rounded-md border border-border/40 bg-background/50 px-2.5 py-1.5 text-xs font-medium text-foreground/70 hover:bg-background/70"
      >
        <span>Generated Palette (6 colors)</span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${showPalette ? "rotate-180" : ""}`}
        />
      </button>

      {showPalette && (
        <div className="grid grid-cols-3 gap-1.5">
          {palette.hexes.map((hex, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1"
              title={`${palette.roles[i]}: ${hex}`}
            >
              <div
                className="h-12 w-full rounded-md border border-border/40 shadow-sm cursor-pointer hover:shadow-md transition"
                style={{ backgroundColor: hex }}
                onClick={() => {
                  navigator.clipboard?.writeText(hex.toUpperCase());
                }}
              />
              <span className="text-[10px] text-foreground/60 text-center leading-tight">
                {palette.roles[i]}
              </span>
              <span className="font-mono text-[9px] text-foreground/40">
                {hex.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorWheelPicker;
