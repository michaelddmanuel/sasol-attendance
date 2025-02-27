import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import theme from './theme';
import { AuthProvider } from './contexts/AuthContext';

// Color palette based on Sasol brand colors
const colors = {
  sasol: {
    primary: '#0F3151',     // Deep navy blue (primary)
    secondary: '#E1EBF0',   // Light blue-gray (secondary)
    accent: '#0072CE',      // Bright blue (accent)
    // Complementary colors for UI elements
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
    blue: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#3B82F6',
      600: '#2563EB',
      700: '#1D4ED8',
      800: '#1E40AF',
      900: '#1E3A8A',
    },
    green: {
      50: '#ECFDF5',
      100: '#D1FAE5',
      200: '#A7F3D0',
      300: '#6EE7B7',
      400: '#34D399',
      500: '#10B981',
      600: '#059669',
      700: '#047857',
      800: '#065F46',
      900: '#064E3B',
    },
    red: {
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
    }
  }
};

// Create a custom theme with our color palette
const customTheme = extendTheme({
  colors,
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'sasol.primary'
      }
    }
  },
  components: {
    Heading: {
      baseStyle: {
        color: 'sasol.primary',
      }
    },
    Text: {
      baseStyle: {
        color: 'sasol.gray.700',
      }
    },
    FormLabel: {
      baseStyle: {
        color: 'sasol.gray.800',
        fontWeight: 'medium',
        fontSize: 'sm',
        marginBottom: '2px',
      }
    },
    FormControl: {
      baseStyle: {
        label: {
          color: 'sasol.gray.800',
          fontWeight: 'medium',
          fontSize: 'sm',
          marginBottom: '2px',
        }
      }
    },
    Input: {
      defaultProps: {
        focusBorderColor: 'sasol.primary',
      },
      baseStyle: {
        field: {
          color: 'sasol.gray.800',
          borderColor: 'sasol.gray.300',
          _placeholder: {
            color: 'sasol.gray.500',
          },
        }
      }
    },
    Modal: {
      baseStyle: {
        dialog: {
          bg: 'white',
          borderRadius: 'xl',
          boxShadow: 'xl',
        },
        header: {
          color: 'sasol.gray.800',
          fontWeight: 'semibold',
          fontSize: 'lg',
        },
        body: {
          color: 'sasol.gray.700',
        },
        footer: {
          borderTopWidth: '1px',
          borderColor: 'sasol.gray.200',
        }
      }
    },
    Select: {
      baseStyle: {
        field: {
          color: 'sasol.gray.800',
          borderColor: 'sasol.gray.300',
        }
      },
      defaultProps: {
        focusBorderColor: 'sasol.primary',
      }
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'white',
          boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
          borderRadius: 'lg',
          borderWidth: '1px',
          borderColor: 'sasol.gray.200',
          overflow: 'hidden'
        },
        header: {
          py: '4',
          px: '6'
        },
        body: {
          py: '4',
          px: '6'
        },
        footer: {
          py: '4',
          px: '6',
          borderTopWidth: '1px',
          borderTopColor: 'sasol.gray.200'
        }
      },
      variants: {
        elevated: {
          container: {
            boxShadow: '0px 4px 6px -1px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.1)'
          }
        },
        outline: {
          container: {
            boxShadow: 'none'
          }
        },
        filled: {
          container: {
            bg: 'sasol.secondary',
            borderColor: 'transparent'
          }
        }
      }
    },
    Button: {
      variants: {
        solid: {
          bg: 'sasol.primary',
          color: 'white',
          _hover: {
            bg: 'sasol.blue.800'
          }
        },
        outline: {
          borderColor: 'sasol.primary',
          color: 'sasol.primary',
          _hover: {
            bg: 'sasol.secondary'
          }
        }
      }
    },
    Badge: {
      baseStyle: {
        px: '2',
        py: '1',
        textTransform: 'capitalize',
        fontWeight: 'medium',
        fontSize: 'xs',
        borderRadius: 'full',
        letterSpacing: '0.5px'
      },
      variants: {
        // Semantic status badges for Sasol
        completed: {
          bg: 'sasol.green.100',
          color: 'sasol.green.700',
        },
        pending: {
          bg: 'sasol.blue.100',
          color: 'sasol.blue.700',
        },
        upcoming: {
          bg: 'sasol.blue.50',
          color: 'sasol.blue.600',
        },
        cancelled: {
          bg: 'sasol.red.100',
          color: 'sasol.red.700',
        },
        active: {
          bg: 'sasol.green.100',
          color: 'sasol.green.700',
        },
        inactive: {
          bg: 'sasol.gray.100',
          color: 'sasol.gray.700',
        },
        required: {
          bg: 'sasol.primary',
          color: 'white',
        },
        optional: {
          bg: 'sasol.gray.100',
          color: 'sasol.gray.600',
        },
        expired: {
          bg: 'sasol.red.100',
          color: 'sasol.red.700',
        },
        // Training type badges
        safety: {
          bg: '#FCE7F6',
          color: '#C11574',
        },
        technical: {
          bg: '#F0F9FF',
          color: '#026AA2',
        },
        compliance: {
          bg: '#FEF3F2',
          color: '#B42318',
        },
        leadership: {
          bg: '#F0FDF9',
          color: '#027A48',
        },
        professional: {
          bg: '#F8F9FC',
          color: '#363F72',
        }
      }
    },
    Table: {
      baseStyle: {
        th: {
          color: 'sasol.primary',
        },
        td: {
          color: 'sasol.gray.700',
        }
      }
    },
    Modal: {
      baseStyle: {
        dialog: {
          bg: 'white',
          borderRadius: 'xl',
          boxShadow: '0px 20px 24px -4px rgba(16, 24, 40, 0.1), 0px 8px 8px -4px rgba(16, 24, 40, 0.04)'
        },
        header: {
          px: '6',
          pt: '6',
          pb: '4'
        },
        body: {
          px: '6',
          py: '2'
        },
        footer: {
          px: '6',
          pt: '4',
          pb: '6'
        }
      }
    },
    Stat: {
      baseStyle: {
        label: {
          color: 'sasol.gray.600',
        },
        number: {
          color: 'sasol.primary',
          fontSize: 'xl',
          fontWeight: 'bold',
        },
        helpText: {
          color: 'sasol.gray.500',
        },
      }
    },
    Tabs: {
      baseStyle: {
        tab: {
          color: 'sasol.gray.600',
          _selected: {
            color: 'sasol.primary',
            borderColor: 'sasol.primary',
          }
        }
      }
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
