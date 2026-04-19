import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6', 
      light: '#60a5fa',
      dark: '#1d4ed8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8b5cf6', 
      light: '#a78bfa',
      dark: '#6d28d9',
      contrastText: '#ffffff',
    },
    background: {
      default: '#03050a', // Almost true black
      paper: 'rgba(10, 15, 25, 0.45)', // Ultra-dark translucent
    },
    success: {
      main: '#10b981',
    },
    error: {
      main: '#ef4444',
    },
    warning: {
      main: '#f59e0b',
    },
    info: {
      main: '#0ea5e9',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
    divider: 'rgba(255, 255, 255, 0.05)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.025em' },
    h2: { fontWeight: 800, letterSpacing: '-0.025em' },
    h3: { fontWeight: 700, letterSpacing: '-0.025em' },
    h4: { fontWeight: 700, letterSpacing: '-0.02em' },
    h5: { fontWeight: 600, letterSpacing: '-0.01em' },
    h6: { fontWeight: 600, letterSpacing: '-0.01em' },
    button: { fontWeight: 600, letterSpacing: '0.04em' },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#03050a',
          backgroundImage: `
            radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.08) 0px, transparent 60%),
            radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.08) 0px, transparent 60%)
          `,
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
          margin: 0,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(12, 16, 26, 0.55)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: '0 8px 32px -4px rgba(0, 0, 0, 0.4), 0 4px 16px -4px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            background: 'rgba(15, 20, 32, 0.65)',
            boxShadow: '0 16px 48px -4px rgba(0, 0, 0, 0.6), 0 8px 24px -4px rgba(0, 0, 0, 0.4)',
            transform: 'translateY(-4px)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(5, 8, 15, 0.75)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'rgba(5, 8, 15, 0.85)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.04)',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          padding: '12px 28px',
          transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          '&:active': {
            transform: 'scale(0.94)',
          },
        },
        containedPrimary: {
          background: 'rgba(59, 130, 246, 0.6)',
          border: '1px solid rgba(96, 165, 250, 0.3)',
          boxShadow: '0 8px 24px rgba(59, 130, 246, 0.2)',
          color: '#ffffff',
          '&:hover': {
            background: 'rgba(59, 130, 246, 0.8)',
            boxShadow: '0 12px 32px rgba(59, 130, 246, 0.35)',
            transform: 'translateY(-2px)',
            borderColor: 'rgba(96, 165, 250, 0.5)',
          }
        },
        containedError: {
          background: 'rgba(239, 68, 68, 0.6)',
          border: '1px solid rgba(248, 113, 113, 0.3)',
          boxShadow: '0 8px 24px rgba(239, 68, 68, 0.2)',
          color: '#ffffff',
          '&:hover': {
            background: 'rgba(239, 68, 68, 0.8)',
            boxShadow: '0 12px 32px rgba(239, 68, 68, 0.35)',
            transform: 'translateY(-2px)',
            borderColor: 'rgba(248, 113, 113, 0.5)',
          }
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.1)',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.25)',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            transform: 'translateY(-2px)',
          }
        }
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          padding: '12px',
          '&:hover': {
            transform: 'scale(1.15)',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          },
          '&:active': {
            transform: 'scale(0.85)',
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(10, 15, 25, 0.5)',
            borderRadius: '12px',
            transition: 'all 0.2s',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.08)',
              transition: 'border-color 0.2s',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.15)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3b82f6',
              borderWidth: '1px',
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(59, 130, 246, 0.05)',
            }
          },
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
          padding: '24px 32px',
        },
        head: {
          fontWeight: 700,
          color: '#94a3b8',
          backgroundColor: 'rgba(10, 15, 25, 0.6)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontSize: '0.85rem',
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: 'rgba(15, 20, 30, 0.85)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 40px 100px -10px rgba(0, 0, 0, 0.8)',
          borderRadius: '24px',
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: '8px',
          padding: '4px',
        },
        outlined: {
          borderWidth: '1px',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'rgba(15, 20, 30, 0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
          fontSize: '0.85rem',
          padding: '8px 16px',
          borderRadius: '8px',
        }
      }
    }
  },
});
