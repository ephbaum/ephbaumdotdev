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
    }
}

export { };
