/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,ts,tsx}', './artifact/**/*.{ts,tsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        // Driven by the tokens in src/styles/global.css so all three theme
        // states (light, dark, and un-stamped system) resolve as a set.
        ink: 'var(--color-ink)',
        paper: 'var(--color-paper)',
        surface: 'var(--color-surface)',
        edge: 'var(--color-edge)',
        'notice-bg': 'var(--color-notice-bg)',
        'notice-edge': 'var(--color-notice-edge)',
        'notice-ink': 'var(--color-notice-ink)',
      },
    },
  },
  plugins: [],
};
