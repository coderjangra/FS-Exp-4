import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename="/FS-Exp-4/">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="employees" element={<EmployeeList />} />
            <Route path="api-docs" element={
              <div style={{ color: 'white', padding: '40px' }}>
                <h2>Swagger API Documentation</h2>
                <p>This is a placeholder for Swagger UI integration which would list endpoints like:</p>
                <ul>
                  <li>GET /api/v1/employees</li>
                  <li>POST /api/v1/employees</li>
                  <li>DELETE /api/v1/employees/{'{id}'}</li>
                </ul>
              </div>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
