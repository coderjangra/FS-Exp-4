import React, { useState, useEffect } from 'react';
import { 
  Box, Grid, Card, CardContent, Typography, 
  LinearProgress, CircularProgress
} from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import AssignmentIcon from '@mui/icons-material/Assignment';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial JPA health check / loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress color="primary" />
        <Typography variant="h6" sx={{ ml: 2, color: 'text.secondary' }}>
          Establishing JPA Session...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box mb={8}>
        <Typography variant="h3" gutterBottom sx={{ color: 'white' }}>
          Spring Boot Integration Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Experiment 2.1: Demonstrating RESTful services, layered architecture, and database integrations.
        </Typography>
      </Box>

      <Grid container spacing={5} mb={6}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 4 }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
                <Box>
                  <Typography variant="h6" color="text.secondary" gutterBottom>Database</Typography>
                  <Typography variant="h4" color="white" fontWeight="bold">Connected</Typography>
                </Box>
                <StorageIcon sx={{ fontSize: 40, color: 'primary.main', opacity: 0.8 }} />
              </Box>
              <Typography variant="body2" color="success.main">
                Dialect: MySQL5InnoDBDialect
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 4 }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
                <Box>
                  <Typography variant="h6" color="text.secondary" gutterBottom>API Version</Typography>
                  <Typography variant="h4" color="white" fontWeight="bold">v1 & v2</Typography>
                </Box>
                <AssignmentIcon sx={{ fontSize: 40, color: 'secondary.main', opacity: 0.8 }} />
              </Box>
              <Typography variant="body2" color="primary.light">
                Content Negotiation Enabled
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 4 }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
                <Box>
                  <Typography variant="h6" color="text.secondary" gutterBottom>Exception Handler</Typography>
                  <Typography variant="h4" color="white" fontWeight="bold">@ControllerAdvice</Typography>
                </Box>
                <WarningAmberIcon sx={{ fontSize: 40, color: 'warning.main', opacity: 0.8 }} />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Global Error Handling active
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ p: 5 }}>
        <Typography variant="h5" color="white" gutterBottom>
          System Resources (Mock)
        </Typography>
        <Box mt={4}>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body2" color="text.secondary">JVM Memory Usage</Typography>
            <Typography variant="body2" color="primary.light">45%</Typography>
          </Box>
          <LinearProgress variant="determinate" value={45} color="primary" sx={{ height: 8, borderRadius: 4, mb: 3 }} />
          
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body2" color="text.secondary">HikariCP Connection Pool</Typography>
            <Typography variant="body2" color="secondary.light">12 / 50 Active</Typography>
          </Box>
          <LinearProgress variant="determinate" value={24} color="secondary" sx={{ height: 8, borderRadius: 4 }} />
        </Box>
      </Card>
    </Box>
  );
}
