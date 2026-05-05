import {
  getFlagEmoji,
  languages,
  sizeOptions,
  typographyOptions,
} from "@/components/layout/navbar/constants";
import ColorWheelPicker from "@/components/ui/ColorWheelPicker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  generatePalette,
  paletteToColorTokens,
  type HarmonyMode,
} from "@/lib/paletteGenerator";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

type SettingsMenuProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  language: string;
  onLanguageChange: (value: string) => void;
  typography: string;
  onTypographyChange: (value: string) => void;
  titleSize: string;
  onTitleSizeChange: (value: string) => void;
  plainTextSize: string;
  onPlainTextSizeChange: (value: string) => void;
  paletteBaseColor: string;
  onPaletteBaseColorChange: (value: string) => void;
};

const compactTriggerClassName =
  "inline-flex items-center gap-2 rounded-md border border-border/60 bg-background/30 px-3 py-1.5 text-sm text-foreground/85 backdrop-blur-sm transition hover:bg-background/45";
const settingsPanelClassName =
  "w-[min(92vw,24rem)] max-h-[min(80vh,40rem)] overflow-y-auto bg-card text-card-foreground border border-border shadow-xl backdrop-blur-none";

const SettingsMenu = ({
  isOpen,
  onOpenChange,
  language,
  onLanguageChange,
  typography,
  onTypographyChange,
  titleSize,
  onTitleSizeChange,
  plainTextSize,
  onPlainTextSizeChange,
  paletteBaseColor,
  onPaletteBaseColorChange,
}: SettingsMenuProps) => {
  const [harmonyMode, setHarmonyMode] = useState<HarmonyMode>("analogous");

  const selectedLanguage =
    languages.find((selected) => selected.code === language) ?? languages[0];
  const selectedTypography =
    typographyOptions.find((selected) => selected.code === typography) ??
    typographyOptions[0];
  const selectedTitleSize =
    sizeOptions.find((selected) => selected.code === titleSize) ??
    sizeOptions[1];
  const selectedPlainTextSize =
    sizeOptions.find((selected) => selected.code === plainTextSize) ??
    sizeOptions[1];

  // When palette base color changes, apply it to CSS variables
  useEffect(() => {
    const palette = generatePalette(paletteBaseColor, harmonyMode);
    const tokens = paletteToColorTokens(palette);

    // Apply CSS variables
    Object.entries(tokens).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });

    // Save to localStorage
    try {
      localStorage.setItem("viomes_palette_base_color", paletteBaseColor);
      localStorage.setItem("viomes_palette_harmony", harmonyMode);
    } catch {
      /* ignore */
    }
  }, [paletteBaseColor, harmonyMode]);

  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger className={compactTriggerClassName}>
        <span>Settings</span>
        <ChevronDown className="ml-0.5 h-3.5 w-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        collisionPadding={12}
        className={settingsPanelClassName}
      >
        <DropdownMenuLabel className="text-sm font-semibold uppercase tracking-wide text-foreground/70">
          Site Settings
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Language */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="text-sm">
            Language: {selectedLanguage.label}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-[min(88vw,19rem)] max-h-[65vh] overflow-y-auto bg-card text-card-foreground border border-border shadow-xl backdrop-blur-none">
            <DropdownMenuRadioGroup
              value={language}
              onValueChange={onLanguageChange}
            >
              {languages.map((languageOption) => (
                <DropdownMenuRadioItem
                  key={languageOption.code}
                  value={languageOption.code}
                >
                  <span className="mr-2 inline-flex w-5 h-4">
                    <span
                      className="inline-flex h-4 w-5 items-center justify-center rounded-[2px] text-base leading-none"
                      aria-hidden
                    >
                      {getFlagEmoji(languageOption.code)}
                    </span>
                  </span>
                  {languageOption.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Font */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="text-sm">
            Font: {selectedTypography.label}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-[min(88vw,19rem)] max-h-[65vh] overflow-y-auto bg-card text-card-foreground border border-border shadow-xl backdrop-blur-none">
            <DropdownMenuRadioGroup
              value={typography}
              onValueChange={onTypographyChange}
            >
              {typographyOptions.map((option) => (
                <DropdownMenuRadioItem key={option.code} value={option.code}>
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Title Size */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="text-sm">
            Title size: {selectedTitleSize.label}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-[min(88vw,19rem)] max-h-[65vh] overflow-y-auto bg-card text-card-foreground border border-border shadow-xl backdrop-blur-none">
            <DropdownMenuRadioGroup
              value={titleSize}
              onValueChange={onTitleSizeChange}
            >
              {sizeOptions.map((option) => (
                <DropdownMenuRadioItem key={option.code} value={option.code}>
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Text Size */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="text-sm">
            Text size: {selectedPlainTextSize.label}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-[min(88vw,19rem)] max-h-[65vh] overflow-y-auto bg-card text-card-foreground border border-border shadow-xl backdrop-blur-none">
            <DropdownMenuRadioGroup
              value={plainTextSize}
              onValueChange={onPlainTextSizeChange}
            >
              {sizeOptions.map((option) => (
                <DropdownMenuRadioItem key={option.code} value={option.code}>
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        {/* Color Wheel Picker */}
        <ColorWheelPicker
          baseHex={paletteBaseColor}
          onColorChange={onPaletteBaseColorChange}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsMenu;
