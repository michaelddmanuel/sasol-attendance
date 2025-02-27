import { extendTheme } from '@chakra-ui/react';

// Brand colors - combining Sasol brand with Untitled UI principles
const colors = {
  sasol: {
    primary: '#0F3151',    // Primary color (deep blue)
    secondary: '#E1EBF0',  // Secondary color (light blue/gray)
    background: '#FFFFFF', // Background color (white)
    blue: '#0F3151',       // Alias for primary
    lightBlue: '#E1EBF0',  // Alias for secondary
    white: '#FFFFFF',
    black: '#000000',
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    }
  },
  // Add Untitled UI color system
  brand: {
    50: '#EBF5FF',
    100: '#E1EFFE',
    200: '#C3DDFD',
    300: '#A4CAFE',
    400: '#76A9FA',
    500: '#3F83F8',
    600: '#1C64F2',
    700: '#1A56DB',
    800: '#1E429F',
    900: '#233876',
  },
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
  },
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },
};

// Custom font sizes following Untitled UI scale
const fontSizes = {
  xs: '0.75rem',     // 12px
  sm: '0.875rem',    // 14px
  md: '1rem',        // 16px
  lg: '1.125rem',    // 18px
  xl: '1.25rem',     // 20px
  '2xl': '1.5rem',   // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem',  // 36px
  '5xl': '3rem',     // 48px
  '6xl': '3.75rem',  // 60px
  '7xl': '4.5rem',   // 72px
  '8xl': '6rem',     // 96px
  '9xl': '8rem',     // 128px
};

// Shadow styles based on Untitled UI
const shadows = {
  xs: '0px 1px 2px rgba(16, 24, 40, 0.05)',
  sm: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
  md: '0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)',
  lg: '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
  xl: '0px 20px 24px -4px rgba(16, 24, 40, 0.1), 0px 8px 8px -4px rgba(16, 24, 40, 0.04)',
  '2xl': '0px 24px 48px -12px rgba(16, 24, 40, 0.25)',
  '3xl': '0px 32px 64px -12px rgba(16, 24, 40, 0.2)',
};

// Border radius based on Untitled UI
const radii = {
  none: '0',
  sm: '0.125rem',    // 2px
  base: '0.25rem',   // 4px
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px
  xl: '0.75rem',     // 12px
  '2xl': '1rem',     // 16px
  '3xl': '1.5rem',   // 24px
  full: '9999px',
};

// Component style overrides
const components = {
  Button: {
    baseStyle: {
      fontWeight: 'medium',
      borderRadius: 'lg',
      _focus: {
        boxShadow: 'none',
      },
    },
    variants: {
      primary: {
        bg: 'sasol.primary',
        color: 'white',
        _hover: {
          bg: 'sasol.primary',
          opacity: 0.9,
          _disabled: {
            bg: 'sasol.primary',
            opacity: 0.4,
          },
        },
        _active: {
          bg: 'sasol.primary',
          opacity: 0.8,
        },
      },
      secondary: {
        bg: 'sasol.secondary',
        color: 'sasol.primary',
        _hover: {
          bg: 'sasol.secondary',
          opacity: 0.9,
          _disabled: {
            bg: 'sasol.secondary',
            opacity: 0.4,
          },
        },
      },
      outline: {
        borderColor: 'gray.300',
        color: 'gray.700',
        bg: 'white',
        _hover: {
          bg: 'gray.50',
          borderColor: 'gray.400',
        },
      },
      ghost: {
        color: 'gray.700',
        _hover: {
          bg: 'gray.100',
        },
      },
      solid: {
        bg: 'brand.600',
        color: 'white',
        _hover: {
          bg: 'brand.700',
          _disabled: {
            bg: 'brand.600',
            opacity: 0.4,
          },
        },
        _active: {
          bg: 'brand.800',
        },
      },
    },
    sizes: {
      xs: {
        h: '8',
        minW: '8',
        fontSize: 'xs',
        px: '3',
      },
      sm: {
        h: '9',
        minW: '9',
        fontSize: 'sm',
        px: '3.5',
      },
      md: {
        h: '10',
        minW: '10',
        fontSize: 'md',
        px: '4',
      },
      lg: {
        h: '11',
        minW: '11',
        fontSize: 'lg',
        px: '5',
      },
      xl: {
        h: '12',
        minW: '12',
        fontSize: 'xl',
        px: '6',
      },
    },
    defaultProps: {
      variant: 'primary',
      size: 'md',
    },
  },
  Heading: {
    baseStyle: {
      fontWeight: 'semibold',
      color: 'gray.900',
    },
  },
  Card: {
    baseStyle: {
      p: '6',
      bg: 'white',
      borderRadius: 'xl',
      boxShadow: 'sm',
      borderWidth: '1px',
      borderColor: 'gray.200',
    },
  },
  Link: {
    baseStyle: {
      color: 'brand.600',
      fontWeight: 'medium',
      _hover: {
        textDecoration: 'none',
        color: 'brand.700',
      },
    },
  },
  Table: {
    variants: {
      simple: {
        th: {
          fontWeight: 'medium',
          textTransform: 'none',
          letterSpacing: 'normal',
          borderColor: 'gray.200',
          color: 'gray.600',
          fontSize: 'sm',
        },
        td: {
          borderColor: 'gray.200',
          fontSize: 'sm',
        },
        thead: {
          bg: 'gray.50',
        },
        tbody: {
          tr: {
            _hover: {
              bg: 'gray.50',
            },
          },
        },
      },
    },
  },
  // Customize other components as needed
  Badge: {
    baseStyle: {
      px: 2.5,
      py: 0.5,
      borderRadius: 'full',
      fontSize: 'xs',
      fontWeight: 'medium',
      textTransform: 'none',
    },
    variants: {
      solid: {
        bg: 'brand.500',
        color: 'white',
      },
      subtle: {
        bg: 'brand.50',
        color: 'brand.700',
      },
      outline: {
        borderWidth: '1px',
        borderColor: 'brand.200',
        color: 'brand.700',
      },
      // Status variants
      completed: {
        bg: 'success.50',
        color: 'success.700',
      },
      pending: {
        bg: 'warning.50',
        color: 'warning.700',
      },
      cancelled: {
        bg: 'error.50',
        color: 'error.700',
      },
      active: {
        bg: 'brand.50',
        color: 'brand.700',
      },
      inactive: {
        bg: 'gray.100',
        color: 'gray.700',
      },
      required: {
        bg: 'error.50',
        color: 'error.700',
      },
      optional: {
        bg: 'gray.100',
        color: 'gray.700',
      },
      // Safety colors
      safety: {
        bg: 'orange.50',
        color: 'orange.700',
      },
      compliance: {
        bg: 'purple.50',
        color: 'purple.700',
      },
    },
  },
};

// Global style config
const styles = {
  global: {
    body: {
      bg: 'gray.50',
      color: 'gray.900',
      fontSize: 'md',
      lineHeight: 'tall',
    },
    '*': {
      borderColor: 'gray.200',
    },
  },
};

// Extended theme
const theme = extendTheme({
  colors,
  fontSizes,
  shadows,
  radii,
  components,
  styles,
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

export default theme;
