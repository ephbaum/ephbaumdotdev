// Global type declarations for the brutal color system

declare global {
  interface Window {
    BrutalColorSystem: {
      applyAllColors: () => void;
      applyMainBackgroundColors: () => void;
      applyCardColors: () => void;
      applyButtonColors: () => void;
      applyHoverEffects: () => void;
      applySpecialElementColors: () => void;
      colors: string[];
      colorMap: Record<string, string>;
      currentColors: () => {
        primary: string;
        secondary: string;
        accent: string;
        hover: string;
      };
    };
    ContrastUtils: {
      hexToRgb: (hex: string) => { r: number; g: number; b: number } | null;
      getRelativeLuminance: (rgb: { r: number; g: number; b: number }) => number;
      getContrastRatio: (color1: string, color2: string) => number;
      meetsWCAGAA: (foreground: string, background: string, isLargeText?: boolean) => boolean;
      meetsWCAGAAA: (foreground: string, background: string, isLargeText?: boolean) => boolean;
      isLargeText: (element: Element) => boolean;
      findAccessiblePairs: (
        colors: string[],
        colorMap: Record<string, string>,
        defaultForeground?: string
      ) => Array<{
        foreground: string;
        background: string;
        backgroundName: string;
        ratio: number;
      }>;
      findAccessibleTextPairs: (
        colors: string[],
        colorMap: Record<string, string>
      ) => Array<{
        foreground: string;
        foregroundName: string;
        background: string;
        backgroundName: string;
        ratio: number;
      }>;
      getRandomAccessibleBackground: (
        colors: string[],
        colorMap: Record<string, string>,
        excludedColors?: string[]
      ) => string;
      getRandomAccessibleTextPair: (
        colors: string[],
        colorMap: Record<string, string>
      ) => {
        foregroundName: string;
        backgroundName: string;
        foreground: string;
        background: string;
        ratio: number;
      };
    };
  }
}

export {};
