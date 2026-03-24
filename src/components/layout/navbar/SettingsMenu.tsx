import {
  backgroundColorOptions,
  getFlagEmoji,
  languages,
  sizeOptions,
  textSecondaryColorOptions,
  typographyOptions,
} from "@/components/layout/navbar/constants";
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
import { ChevronDown } from "lucide-react";

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
  backgroundColor: string;
  onBackgroundColorChange: (value: string) => void;
  textSecondaryColor: string;
  onTextSecondaryColorChange: (value: string) => void;
  customBackgroundHex: string;
  onCustomBackgroundHexChange: (value: string) => void;
  customTextHex: string;
  onCustomTextHexChange: (value: string) => void;
};

const compactTriggerClassName =
  "inline-flex items-center gap-2 rounded-md border border-border/60 bg-background/30 px-3 py-1.5 text-sm text-foreground/85 backdrop-blur-sm transition hover:bg-background/45";
const settingsPanelClassName =
  "w-[min(92vw,22rem)] max-h-[min(80vh,36rem)] overflow-y-auto bg-card text-card-foreground border border-border shadow-xl backdrop-blur-none";
const settingsSubPanelClassName =
  "w-[min(88vw,19rem)] max-h-[65vh] overflow-y-auto bg-card text-card-foreground border border-border shadow-xl backdrop-blur-none";

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
  backgroundColor,
  onBackgroundColorChange,
  textSecondaryColor,
  onTextSecondaryColorChange,
  customBackgroundHex,
  onCustomBackgroundHexChange,
  customTextHex,
  onCustomTextHexChange,
}: SettingsMenuProps) => {
  const selectedLanguage =
    languages.find((selected) => selected.code === language) ?? languages[0];
  const selectedBackgroundColor =
    backgroundColorOptions.find(
      (selected) => selected.code === backgroundColor,
    ) ?? backgroundColorOptions[0];
  const selectedTextSecondaryColor =
    textSecondaryColorOptions.find(
      (selected) => selected.code === textSecondaryColor,
    ) ?? textSecondaryColorOptions[0];
  const selectedTypography =
    typographyOptions.find((selected) => selected.code === typography) ??
    typographyOptions[0];
  const selectedTitleSize =
    sizeOptions.find((selected) => selected.code === titleSize) ??
    sizeOptions[1];
  const selectedPlainTextSize =
    sizeOptions.find((selected) => selected.code === plainTextSize) ??
    sizeOptions[1];

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
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="text-sm">
            Language: {selectedLanguage.label}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className={settingsSubPanelClassName}>
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
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="text-sm">
            Font: {selectedTypography.label}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className={settingsSubPanelClassName}>
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
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="text-sm">
            Title size: {selectedTitleSize.label}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className={settingsSubPanelClassName}>
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
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="text-sm">
            Text size: {selectedPlainTextSize.label}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className={settingsSubPanelClassName}>
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
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="text-sm">
            Background: {selectedBackgroundColor.label}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className={settingsSubPanelClassName}>
            <DropdownMenuRadioGroup
              value={backgroundColor}
              onValueChange={onBackgroundColorChange}
            >
              {backgroundColorOptions.map((option) => (
                <DropdownMenuRadioItem key={option.code} value={option.code}>
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="text-sm">
            Text / Secondary: {selectedTextSecondaryColor.label}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className={settingsSubPanelClassName}>
            <DropdownMenuRadioGroup
              value={textSecondaryColor}
              onValueChange={onTextSecondaryColorChange}
            >
              {textSecondaryColorOptions.map((option) => (
                <DropdownMenuRadioItem key={option.code} value={option.code}>
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        {backgroundColor === "custom" || textSecondaryColor === "custom" ? (
          <>
            <DropdownMenuSeparator />
            {backgroundColor === "custom" ? (
              <div className="px-2 py-1.5">
                <label className="mb-1 block text-xs text-foreground/70">
                  Custom background
                </label>
                <input
                  type="color"
                  value={customBackgroundHex}
                  onChange={(event) =>
                    onCustomBackgroundHexChange(event.target.value)
                  }
                  className="h-8 w-full cursor-pointer rounded-md border border-border/60 bg-background/30 p-0.5"
                  aria-label="Custom background color"
                />
              </div>
            ) : null}
            {textSecondaryColor === "custom" ? (
              <div className="px-2 py-1.5">
                <label className="mb-1 block text-xs text-foreground/70">
                  Custom text / secondary
                </label>
                <input
                  type="color"
                  value={customTextHex}
                  onChange={(event) =>
                    onCustomTextHexChange(event.target.value)
                  }
                  className="h-8 w-full cursor-pointer rounded-md border border-border/60 bg-background/30 p-0.5"
                  aria-label="Custom text and secondary color"
                />
              </div>
            ) : null}
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsMenu;
