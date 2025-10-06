import {
  defineConfig,
  presetIcons,
  presetWind,
  presetTypography,
} from 'unocss';

export default defineConfig({
  presets: [
    presetWind(),
    presetIcons({
      collections: {
        logos: () =>
          import('@iconify-json/logos/icons.json').then((i) => i.default),
        uil: () =>
          import('@iconify-json/uil/icons.json').then((l) => l.default),
      },
    }),
    presetTypography(),
  ],
  theme: {
    colors: {
      // Brutalist theme colors
      red: '#ff0000',
      blue: '#0000ff',
      green: '#00ff00',
      yellow: '#ffff00',
      pink: '#ff69b4',
      purple: '#800080',
      orange: '#ffa500',
      teal: '#008080',
      cyan: '#00ffff',
      lime: '#00ff00',
      emerald: '#50c878',
      fuchsia: '#ff00ff',
      violet: '#8a2be2',
      rose: '#ff69b4',
      sky: '#87ceeb',
      amber: '#ffbf00',
    },
  },
  safelist: [
    // Ensure all background color classes are generated
    'bg-red', 'bg-blue', 'bg-green', 'bg-yellow', 'bg-pink', 'bg-purple',
    'bg-orange', 'bg-teal', 'bg-cyan', 'bg-lime', 'bg-emerald', 'bg-fuchsia',
    'bg-violet', 'bg-rose', 'bg-sky', 'bg-amber',
    // Ensure all text color classes are generated
    'text-red', 'text-blue', 'text-green', 'text-yellow', 'text-pink', 'text-purple',
    'text-orange', 'text-teal', 'text-cyan', 'text-lime', 'text-emerald', 'text-fuchsia',
    'text-violet', 'text-rose', 'text-sky', 'text-amber',
  ],
});
