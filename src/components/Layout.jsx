import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, Drawer, AppBar, Toolbar, Typography, List, ListItem, 
  ListItemButton, ListItemIcon, ListItemText, IconButton, 
  Avatar, Badge, Divider, Tooltip, Dialog, DialogTitle, 
  DialogContent, DialogActions, Button, Card, Snackbar, Alert
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ApiIcon from '@mui/icons-material/Api';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import InfoIcon from '@mui/icons-material/Info';
import StorageIcon from '@mui/icons-material/Storage';

const drawerWidth = 260;

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Employees (JPA)', icon: <PeopleIcon />, path: '/employees' },
    { text: 'API Integrations', icon: <ApiIcon />, path: '/api-docs' },
  ];

  const handleMockAction = (msg) => {
    setSnackbarMessage(msg);
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main', fontWeight: 'bold', width: 40, height: 40 }}>SB</Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Spring<span style={{ color: 'white' }}>React</span>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Exp 2.1 SPA Client
          </Typography>
        </Box>
      </Box>
      
      <Divider />
      
      <List sx={{ px: 2, py: 2, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
                sx={{
                  borderRadius: '8px',
                  bgcolor: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                  color: isActive ? 'primary.main' : 'text.secondary',
                  '&:hover': {
                    bgcolor: isActive ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255,255,255,0.05)'
                  }
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'white' : 'inherit'
                  }} 
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
      
      <Box sx={{ p: 2 }}>
        <Card sx={{ p: 2, bgcolor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <StorageIcon sx={{ fontSize: 16, color: 'success.main' }} />
            <Typography variant="body2" fontWeight="600" color="success.main">
              Database Online
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" display="block">
            MySQL 8.0 / Hibernate 6
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            HikariCP: 12/50 active
          </Typography>
        </Card>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 4 } }}>
          <Box display="flex" alignItems="center">
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
               <Typography variant="h6" fontWeight="600" color="text.primary">
                 {menuItems.find(i => i.path === location.pathname)?.text || 'Application'}
               </Typography>
            </Box>
          </Box>

          <Box display="flex" alignItems="center" gap={3}>
            <Button 
              variant="outlined" 
              color="info" 
              startIcon={<InfoIcon />}
              onClick={() => setInfoOpen(true)}
              size="small"
              sx={{ mr: 1, display: { xs: 'none', md: 'flex' } }}
            >
              Experiment Details
            </Button>
            <Tooltip title="Experiment Info" sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton color="info" onClick={() => setInfoOpen(true)}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="API Health Alerts">
              <IconButton color="inherit" onClick={() => handleMockAction("All systems operational. No current alerts.")}>
                <Badge badgeContent={1} color="error">
                  <NotificationsActiveIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="REST Configuration">
              <IconButton color="inherit" onClick={() => handleMockAction("REST settings are managed via application.yml")}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: { xs: 2, sm: 4 }, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: 8 }}
      >
        <Outlet />
      </Box>

      {/* Detailed Info Dialog */}
      <Dialog open={infoOpen} onClose={() => setInfoOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ 
          borderBottom: 1, borderColor: 'divider', pb: 2, color: 'primary.main', 
          display: 'flex', alignItems: 'center', gap: 1.5, fontSize: '1.25rem', fontWeight: 700 
        }}>
          <InfoIcon /> Experiment 2.1: Spring Boot & React Integration Architecture
        </DialogTitle>
        <DialogContent sx={{ mt: 3 }}>
          <Typography variant="subtitle1" fontWeight="600" color="text.primary" gutterBottom>
            Project Overview
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph sx={{ lineHeight: 1.6 }}>
            This Single Page Application (SPA) acts as the client for a Spring Boot REST API. It demonstrates how to consume RESTful services built with a layered architecture (Controller, Service, Repository) and database integrations.
          </Typography>

          <Typography variant="subtitle1" fontWeight="600" color="text.primary" sx={{ mt: 3, mb: 1 }}>
            Key Implementations
          </Typography>
          <Box component="ul" sx={{ pl: 2, m: 0, color: 'text.secondary', display: 'flex', flexDirection: 'column', gap: 1.5, '& li': { lineHeight: 1.6 } }}>
            <li>
              <strong style={{ color: '#f8fafc' }}>REST Controllers, DTOs & Validation:</strong> 
              {" "}The application communicates using Data Transfer Objects (DTOs). When creating or updating an employee, the frontend simulates sending a DTO to a `@RestController`. If validation fails (simulating Spring's `@Valid` annotation), the frontend catches the `MethodArgumentNotValidException` (400 Bad Request) and maps the field errors accurately in the UI.
            </li>
            <li>
              <strong style={{ color: '#f8fafc' }}>JPA/Hibernate & Database Integration:</strong> 
              {" "}The Employee Directory performs CRUD operations against a mock backend that simulates a MySQL database managed by Hibernate. Delays are added to simulate network and database latency, showing realistic loading states.
            </li>
            <li>
              <strong style={{ color: '#f8fafc' }}>Exception Handling (@ControllerAdvice):</strong> 
              {" "}The client expects standardized error responses from a Spring `@ControllerAdvice` global exception handler. For instance, trying to edit or delete a non-existent entity simulates catching a `ResourceNotFoundException`.
            </li>
            <li>
              <strong style={{ color: '#f8fafc' }}>API Versioning (Content Negotiation):</strong> 
              {" "}A dynamic toggle on the Employees page allows switching between API versions (`v1` and `v2`). `v2` simulates a different API contract where JSON keys are mapped differently (e.g., `firstName` + `lastName` &gt; `fullName`), requiring the React client to adapt its parsing logic.
            </li>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
          <Button onClick={() => setInfoOpen(false)} variant="contained" color="primary">
            Close Information
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!snackbarMessage} autoHideDuration={4000} onClose={() => setSnackbarMessage(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity="info" variant="filled" onClose={() => setSnackbarMessage(null)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}