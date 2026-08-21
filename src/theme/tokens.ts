/**
 * Nymrel Warm Paper Design Tokens
 * Master Theme Configuration
 */

export const colors = {
  bg: {
    base: '#FAF8F2',       // Warm Cream base
    surface: '#F4F0E6',    // Soft Linen secondary surface
    card: '#FAF8F2',       // Crisp Card surface
    elevated: '#FFFFFF',   // Elevated light surface
    subtle: '#EFEAE0',     // Subtle inset container
    code: '#2A332E',       // Cedar Green terminal background
  },
  border: {
    subtle: '#ECE7DC',     // Whisper border
    default: '#E2DDD2',    // Stone default border
    strong: '#CBC5B7',     // Defined border
    focus: '#A8541F',      // Terracotta focus ring
    active: '#2A332E',     // Cedar active indicator
  },
  text: {
    primary: '#1C1F1D',    // Deep Warm Ink
    secondary: '#4A524D',  // Slate Olive secondary
    muted: '#758079',      // Soft Muted stone
    inverse: '#FAF8F2',    // Crisp Warm Cream for dark backgrounds
    accent: '#A8541F',     // Terracotta accent text
    brand: '#2A332E',      // Cedar Green brand text
  },
  brand: {
    cedar: '#2A332E',      // Primary Cedar Green
    cedarLight: '#3D4A43',
    cedarDark: '#1B2420',
    terracotta: '#A8541F', // Primary Terracotta
    terracottaHover: '#C25E26',
    terracottaLight: '#FBECE3',
    amber: '#D97706',
    amberBg: '#FEF3C7',
    sage: '#E2EBE5',
    sageDark: '#2C573F',
  },
  shadow: {
    sm: '0 1px 2px rgba(42, 51, 46, 0.04)',
    md: '0 4px 12px rgba(42, 51, 46, 0.06)',
    lg: '0 10px 24px rgba(42, 51, 46, 0.08)',
    inner: 'inset 0 2px 4px rgba(42, 51, 46, 0.04)',
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  font: {
    serif: 'Fraunces, Georgia, Cambria, serif',
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"JetBrains Mono", "SFMono-Regular", Consolas, monospace',
  }
} as const;

export type ThemeTokens = typeof colors;
