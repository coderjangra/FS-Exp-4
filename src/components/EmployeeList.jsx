import React, { useState, useEffect } from 'react';
import { 
  Box, Card, Typography, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Button, IconButton, Chip, CircularProgress, 
  Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Grid, Select, MenuItem, InputLabel, FormControl, Tooltip, DialogContentText
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { fetchEmployees, createEmployee, updateEmployee, deleteEmployee } from '../api';

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiVersion, setApiVersion] = useState('v1'); 
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  
  // DTO Form State
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [dto, setDto] = useState({ firstName: '', lastName: '', email: '', department: 'Engineering' });
  const [validationErrors, setValidationErrors] = useState([]);

  // Delete Confirmation State
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetchEmployees(apiVersion);
      setEmployees(res.data);
    } catch (err) {
      setError("Failed to fetch data from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [apiVersion]);

  // Handle Edit Action
  const handleEdit = (emp) => {
    // If in v2, we have to split fullName back to first/last for the DTO form
    let fName = emp.firstName;
    let lName = emp.lastName;
    
    if (apiVersion === 'v2') {
      const parts = emp.fullName.split(' ');
      fName = parts[0] || '';
      lName = parts.slice(1).join(' ') || '';
    }

    setEditingId(emp.id || emp.empId);
    setDto({
      firstName: fName || '',
      lastName: lName || '',
      email: emp.email || emp.contact || '',
      department: emp.department || emp.dept || 'Engineering'
    });
    setValidationErrors([]);
    setDialogOpen(true);
  };

  const handleAddClick = () => {
    setEditingId(null);
    setDto({ firstName: '', lastName: '', email: '', department: 'Engineering' });
    setValidationErrors([]);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setValidationErrors([]);
      
      if (editingId) {
        await updateEmployee(editingId, dto);
        setSuccessMsg(`PUT /api/${apiVersion}/employees/${editingId} successful`);
      } else {
        await createEmployee(dto);
        setSuccessMsg(`POST /api/${apiVersion}/employees successful`);
      }
      
      setDialogOpen(false);
      loadData();
    } catch (err) {
      if (err.response?.status === 400) {
        setValidationErrors(err.response.data.details);
      } else {
        setError(err.response?.data?.message || "An unexpected error occurred.");
      }
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (emp) => {
    setEmployeeToDelete(emp);
    setDeleteConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!employeeToDelete) return;
    try {
      const id = employeeToDelete.id || employeeToDelete.empId;
      await deleteEmployee(id);
      setEmployees(employees.filter(e => e.id !== id && e.empId !== id));
      setSuccessMsg(`DELETE /api/${apiVersion}/employees/${id} successful`);
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    } finally {
      setDeleteConfirmOpen(false);
      setEmployeeToDelete(null);
    }
  };

  return (
    <Box sx={{ mt: 2, mb: 6 }}>
      <Box 
        display="flex" 
        flexDirection={{ xs: 'column', md: 'row' }} 
        justifyContent="space-between" 
        alignItems={{ xs: 'flex-start', md: 'center' }} 
        mb={6} 
        gap={4}
      >
        <Box>
          <Typography variant="h3" color="text.primary" fontWeight="800" gutterBottom sx={{ letterSpacing: '-0.02em' }}>
            Employee Directory
          </Typography>
          <Typography variant="h6" color="text.secondary" fontWeight="400">
            Manage personnel records using RESTful operations.
          </Typography>
        </Box>
        <Box display="flex" gap={3} alignItems="center">
          <FormControl size="medium" sx={{ minWidth: 180 }}>
            <InputLabel>API Version</InputLabel>
            <Select
              value={apiVersion}
              label="API Version"
              onChange={(e) => setApiVersion(e.target.value)}
            >
              <MenuItem value="v1">v1 (Standard)</MenuItem>
              <MenuItem value="v2">v2 (DTO Mapped)</MenuItem>
            </Select>
          </FormControl>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            startIcon={<AddIcon />}
            onClick={handleAddClick}
          >
            Add Employee
          </Button>
        </Box>
      </Box>

      <Card sx={{ borderRadius: 4, overflow: 'hidden', mb: 8, mt: 4 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" p={10} minHeight={300}>
            <CircularProgress size={60} />
          </Box>
        ) : (
          <TableContainer>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Contact Email</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((emp) => (
                  <TableRow 
                    key={emp.id || emp.empId} 
                    hover
                    sx={{ transition: 'background 0.2s', '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' } }}
                  >
                    <TableCell sx={{ color: 'text.secondary' }}>#{emp.id || emp.empId}</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>
                      {apiVersion === 'v1' ? `${emp.firstName} ${emp.lastName}` : emp.fullName}
                    </TableCell>
                    <TableCell>{emp.email || emp.contact}</TableCell>
                    <TableCell>
                      <Chip 
                        label={emp.department || emp.dept} 
                        sx={{ 
                          bgcolor: 'rgba(59, 130, 246, 0.1)', 
                          color: 'primary.light', 
                          border: '1px solid rgba(59, 130, 246, 0.2)',
                          px: 1, py: 1.5, borderRadius: 2
                        }} 
                      />
                    </TableCell>
                    <TableCell>
                      {apiVersion === 'v1' ? (
                        <Chip 
                          label={emp.status} 
                          color={emp.status === 'ACTIVE' ? 'success' : 'warning'} 
                          variant="outlined"
                          sx={{ px: 1, py: 1.5, borderRadius: 2, borderWidth: 1, fontWeight: 600 }}
                        />
                      ) : (
                        <Chip 
                          label={emp.active ? 'YES (Active)' : 'NO (Inactive)'} 
                          color={emp.active ? 'success' : 'error'} 
                          variant="outlined"
                          sx={{ px: 1, py: 1.5, borderRadius: 2, borderWidth: 1, fontWeight: 600 }}
                        />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <Box display="flex" justifyContent="flex-end" gap={1.5}>
                        <Tooltip title="Edit Record">
                          <IconButton 
                            color="info" 
                            onClick={() => handleEdit(emp)} 
                            sx={{ bgcolor: 'rgba(14, 165, 233, 0.1)', p: 1, '&:hover': { bgcolor: 'rgba(14, 165, 233, 0.2)' } }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Record">
                          <IconButton 
                            color="error" 
                            onClick={() => confirmDelete(emp)} 
                            sx={{ bgcolor: 'rgba(239, 68, 68, 0.1)', p: 1, '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.2)' } }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                {employees.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 8, color: 'text.secondary' }}>
                      No employees found in the database.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>

      {/* DTO Form Dialog for Create/Update */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4, p: 1 } }}>
        <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider', pb: 3, pt: 4, px: 5, color: 'text.primary', fontWeight: 800, fontSize: '1.6rem' }}>
          {editingId ? 'Edit Employee (PUT DTO)' : 'Create Employee (POST DTO)'}
        </DialogTitle>
        <DialogContent sx={{ mt: 4, px: 5, py: 2 }}>
          {validationErrors.length > 0 && (
            <Alert severity="error" sx={{ mb: 4, borderRadius: 2, p: 2 }}>
              <Typography variant="subtitle1" fontWeight="800" gutterBottom>MethodArgumentNotValidException caught:</Typography>
              <ul style={{ margin: 0, paddingLeft: 24, marginTop: 8, lineHeight: 1.6, fontSize: '1.05rem' }}>
                {validationErrors.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </Alert>
          )}
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField 
                label="First Name" fullWidth 
                value={dto.firstName} onChange={(e) => setDto({...dto, firstName: e.target.value})}
                placeholder="e.g. John"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                label="Last Name" fullWidth 
                value={dto.lastName} onChange={(e) => setDto({...dto, lastName: e.target.value})}
                placeholder="e.g. Doe"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label="Email (@Email validation)" fullWidth 
                value={dto.email} onChange={(e) => setDto({...dto, email: e.target.value})}
                placeholder="john.doe@example.com"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  value={dto.department}
                  label="Department"
                  onChange={(e) => setDto({...dto, department: e.target.value})}
                >
                  <MenuItem value="Engineering">Engineering</MenuItem>
                  <MenuItem value="Security">Security</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="Operations">Operations</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 4, px: 5, borderTop: 1, borderColor: 'divider' }}>
          <Button onClick={() => setDialogOpen(false)} color="inherit" size="large" sx={{ mr: 2, px: 3 }}>Cancel</Button>
          <Button 
            onClick={handleSave} 
            variant="contained" 
            color="primary"
            disabled={saving}
            size="large"
            sx={{ px: 5, py: 1.5, fontSize: '1.05rem' }}
          >
            {saving ? 'Transmitting...' : editingId ? 'Save Changes' : 'Submit DTO'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)} PaperProps={{ sx: { borderRadius: 4, p: 2 } }}>
        <DialogTitle sx={{ color: 'error.main', fontWeight: 800, fontSize: '1.5rem', pb: 2 }}>
          Confirm Delete Operation
        </DialogTitle>
        <DialogContent>
          <DialogContentText color="text.primary" sx={{ fontSize: '1.15rem', lineHeight: 1.6 }}>
            Are you sure you want to execute <strong style={{color: '#ef4444'}}>DELETE /api/{apiVersion}/employees/{employeeToDelete?.id || employeeToDelete?.empId}</strong>?
            <br/><br/>
            This action simulates executing a JPA <code style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px' }}>deleteById()</code> repository method.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button onClick={() => setDeleteConfirmOpen(false)} color="inherit" size="large" sx={{ mr: 2 }}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained" size="large" sx={{ px: 4, py: 1.5 }}>
            Execute Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error / Success Notifications */}
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="error" variant="filled" onClose={() => setError(null)} sx={{ width: '100%', borderRadius: 2 }}>
          {error}
        </Alert>
      </Snackbar>
      
      <Snackbar open={!!successMsg} autoHideDuration={4000} onClose={() => setSuccessMsg(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" onClose={() => setSuccessMsg(null)} sx={{ width: '100%', borderRadius: 2 }}>
          {successMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
