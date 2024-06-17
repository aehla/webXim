import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  Snackbar,
  Alert,
  Box,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AddStaffForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    sex: '',
    address: '',
    phoneNumber: '',
    dateOfBirth: '',
    nationalInsuranceNumber: '',
    positionHeld: '',
    currentSalary: '',
    salaryScale: '',
  });

  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Implement form submission logic here
    // You can make an API call to submit the data to a server
    // or perform any other necessary actions
    console.log('Form submitted:', formData);

    // Example API call (replace with your actual API endpoint)
    fetch('https://your-api-endpoint.com/staff', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setSnackbarSeverity('success');
          setSnackbarMessage('Staff member added successfully!');
          setOpenSnackbar(true);
          setOpen(false);
          // Clear the form after successful submission
          setFormData({
            firstName: '',
            lastName: '',
            sex: '',
            address: '',
            phoneNumber: '',
            dateOfBirth: '',
            nationalInsuranceNumber: '',
            positionHeld: '',
            currentSalary: '',
            salaryScale: '',
          });
        } else {
          setSnackbarSeverity('error');
          setSnackbarMessage('Error adding staff member!');
          setOpenSnackbar(true);
        }
      })
      .catch((error) => {
        setSnackbarSeverity('error');
        setSnackbarMessage('An unexpected error occurred!');
        setOpenSnackbar(true);
        console.error('Error submitting form:', error);
      });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleBackClick = () => {
    navigate('/staff-details'); // Adjust the path to your staff details page
  };

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Staff Member</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="sex-select-label">Sex</InputLabel>
                  <Select
                    labelId="sex-select-label"
                    id="sex-select"
                    name="sex"
                    value={formData.sex}
                    label="Sex"
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="National Insurance Number"
                  name="nationalInsuranceNumber"
                  value={formData.nationalInsuranceNumber}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Position Held"
                  name="positionHeld"
                  value={formData.positionHeld}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Current Salary"
                  name="currentSalary"
                  value={formData.currentSalary}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Salary Scale"
                  name="salaryScale"
                  value={formData.salaryScale}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add Staff
          </Button>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <Paper sx={{ p: 3, width: '100%', maxWidth: 800, backgroundColor: '#fff' }}>
          <Typography variant="h6" gutterBottom>
            Add Staff Member
          </Typography>
          <Button variant="outlined" color="secondary" onClick={() => setOpen(true)}>
            Open Add Staff Dialog
          </Button>

          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <Alert severity={snackbarSeverity} onClose={handleSnackbarClose}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Paper>
      </Box>
    </>
  );
}

export default AddStaffForm;
